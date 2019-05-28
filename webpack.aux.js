const isDirectory = source => lstatSync(source).isDirectory();
const { lstatSync, readdirSync, existsSync } = require('fs');
const { join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const camelCase = require('camelcase');

const getDirectories = source => readdirSync(source).map(name => join(source, name)).filter(isDirectory);

const getEntries = () => {
    let entries = {
        'rcWidgets': './index.js',
        //'rcWidgetsDependencies': './main-dependencies.js'
    };
    let componentsDirs = getDirectories('./components');
    if (componentsDirs.length) {
        componentsDirs.forEach((c) => {
            let name = `rcWidget${camelCase(c.substring(c.indexOf('/') + 1), {pascalCase: true})}`;
            entries[name] = `./${c}/index.js`;
        });
    }

    //console.log(entries);
    return entries;
};

const getDebugPagesList = () => {
    return Object.keys(getEntries()).map(k => `${k}.html`);

};

const getHtmlPlugins = (isCdn) => {
    let result = [];
    let entries = getEntries();
    for (key of Object.keys(entries)) {
        let templatePath = entries[key].replace('/index.js', '/debug.hbs');
        result.push(new HtmlWebpackPlugin({
            title: key,
            template: existsSync(templatePath) ? templatePath : './dev.hbs',
            filename: `${key}.html`,
            cdnScript: isCdn ? `${key}-cdn.js` : null,
            requireScript: !isCdn ? `${key}.js` : null,
            chunks: []
        }));
    }
    return result;
};

module.exports = {
    getEntries, getHtmlPlugins, getDebugPagesList
};