'use strict';

module.exports = {
    entry: __dirname + "/src/js/index",
    output: {
        path: __dirname + "/dist/js",
        filename: "bundle.js"
    },

    watch: true,

    //devtool: "source-map"

    module: {
        loaders: [{
            test: /\.js$/,
            //include: [
            //    path.resolve(__dirname, "src/js")
            //],
            loader: "babel?presets[]=es2015"
        }]
    }
};