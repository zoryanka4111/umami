const fs = require('fs');
const password = fs.readFileSync(__dirname + '/password', "utf8");

const Deployer = require('ssh-deploy-release');

const options = {
    localPath: 'src',
    host: 'htz-vps4.digitalspace.top',
    username: 'redlab',
    password: password,
    deployPath: 'web/opticore-umami.redlab.site/public_html/src',
    currentReleaseLink: 'www',
    allowRemove: false
};

const deployer = new Deployer(options);
try {
    deployer.removeRelease(() => {
        console.log('removeRelease !')
        deployer.deployRelease(() => {
            console.log('deployRelease !')
        });
    })
} catch (error) {
    deployer.deployRelease(() => {
        console.log('ok!')
    });
}