// default
const fs = require('fs');
const getFilesFunc = require('./getFilesNode.js');
const config = require('./config.js');
const defaultData = require('./defaultData.json');
const posthtml = require('posthtml');
const beautify = require('posthtml-beautify');
var jsonFormat = require('json-format');
const hljs = require('highlightjs');
const bodyParser = require('body-parser');
// express
const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
app.use(bodyParser.json())
const hbs = exphbs.create({
    layoutsDir: 'views/layouts',
    partialsDir: 'views/teamplates',
    defaultLayout: 'default',
    helpers: {
        echo: function (a, b, options) {
            if (typeof a == 'undefined') return 'undefined';
            return `<code class="Code Code--lang-json"><pre>${hljs.highlight('json', jsonFormat(a)).value}</pre></code>`;
        },
        defaultData: function (a, b) {
            const defaultData = JSON.parse(fs.readFileSync(__dirname + '/defaultData.json'));
            const val = b.split('.').reduce((sum, key) => sum[key], defaultData);
            return (typeof a != 'undefined') ? a : val;
        },
        ifEquals: function (a, b, options) {
            if (a === b) {
                return options.fn(this);
            }
            return options.inverse(this);
        },
        ifEqualsList: function (a, b, options) {
            const list = b.replace(/\, /gim, ',').split(",");
            try {
                if (list.find(item => item == a).length) return options.fn(this);
            } catch (error) { }
            return options.inverse(this);
        },
        math: function (lvalue, operator, rvalue) {
            lvalue = parseFloat(lvalue);
            rvalue = parseFloat(rvalue);
            return {
                "+": lvalue + rvalue,
                "-": lvalue - rvalue,
                "*": lvalue * rvalue,
                "/": lvalue / rvalue,
                "%": lvalue % rvalue
            }[operator];
        }
    },
});

app.post('/blog', function (req, res) {
    const json = JSON.parse(fs.readFileSync(__dirname + '/../views/pages/blogTestJson.json'));
    res.json(json);
    fs.writeFile(__dirname + '/sendBlogJSON.json', JSON.stringify(req.body), function (err) {
        if (err) return console.log(err);
    });
});

var Handlebars = require('handlebars');
Handlebars.registerHelper('echo', function (a, b, options) {
    if (typeof a == 'undefined') return 'undefined';
    return `<code class="Code Code--lang-json"><pre>${hljs.highlight('json', jsonFormat(a)).value}</pre></code>`;
});

Handlebars.registerHelper('ifEquals', function (a, b, options) {
    if (a === b) {
        return options.fn(this);
    }
    return options.inverse(this);
});

Handlebars.registerHelper('ifEqualsList', function (a, b, options) {
    const list = b.replace(/\, /gim, ',').split(",");
    try {
        if (list.find(item => item == a).length) return options.fn(this);
    } catch (error) { }
    return options.inverse(this);
});

Handlebars.registerHelper('defaultData', function (a, b) {
    return (typeof a != 'undefined') ? a : defaultData[b];
});

Handlebars.registerHelper('defaultData', function (lvalue, operator, rvalue) {
    lvalue = parseFloat(lvalue);
    rvalue = parseFloat(rvalue);
    return {
        "+": lvalue + rvalue,
        "-": lvalue - rvalue,
        "*": lvalue * rvalue,
        "/": lvalue / rvalue,
        "%": lvalue % rvalue
    }[operator];

});


const fileNames = [];
const { serverUrl } = config.settings;

app.use(express.static('src'));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

function correctPageURL(name, action = 'build', live = false) {
    if (name == 'index' && action == 'server' && live) { name = ''; return name; }
    if (name == 'index' && action == 'server' && !live) { name = 'index_'; return name; }
    return name;
};

renderStaticHBS = function (file, render, renderData) {
    hbs.renderView(file, renderData, (req, res, next) => {
        posthtml()
            .use(beautify({
                rules: { indent: 'tab', blankLines: '' }
            })).process(res).then(result => {
                fs.writeFile(render, result.html, function (err) {
                    if (err) return console.log(err);
                });
            });
    });
};

function createLinksList(links = []) {
    fs.writeFile(__dirname + '/../src/links.txt', links.join('\n'), function (err) {
        if (err) return console.log(err);
    });
};

getFilesFunc.removeFiles(__dirname + '/../src/*.html');

// exports
exports.app = app;
exports.eachPages = function (renderData, action = 'build') {
    getFilesFunc.getFiles(__dirname + '/../views/pages/**/*.handlebars', function (err, res) {
        res.forEach(element => {
            const { name } = getFilesFunc.getFileData(element); // { extension, name, dir }
            const dir = __dirname + '/../src/';
            if (action == 'server') {
                app.get('/' + correctPageURL(name, 'server', true), function (req, res, next) {
                    const defaultData = JSON.parse(fs.readFileSync(__dirname + '/defaultData.json'));
                    const newRenderData = { ...renderData, ...defaultData, ...getJson(name) };
                    res.render(element, newRenderData);
                    // renderStaticHBS(element, dir + correctPageURL(name, 'server', false) + '.html', renderData);
                });
            } else {
                fileNames.push(serverUrl + name + '.html');
                const newRenderData = { ...renderData, ...defaultData, ...getJson(name) };
                renderStaticHBS(element, dir + correctPageURL(name, action) + '.html', newRenderData);
            }
        });
        createLinksList(fileNames);
    });
};

function getJson(name) {
    let data = {};
    getFilesFunc.getFiles(__dirname + `/../views/pages/${name}.json`, function (err, res) {
        res.forEach(element => {
            const json = JSON.parse(fs.readFileSync(element));
            data = { ...data, ...json };
        });
    });
    return data;
};