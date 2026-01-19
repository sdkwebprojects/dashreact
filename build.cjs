var fs = require("fs");
var browserify = require("browserify");
browserify(["./src/pages/_app.js"], {paths:['./src'], extensions: [".js",".ts",".tsx"]})
  .transform("browserify-css")
  .transform("babelify", {presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript", "@babel/preset-modules"], plugins: ["babel-plugin-syntax-hermes-parser"], extensions: [".js",".tsx", ".ts"], global: true})
  .bundle()
  .pipe(fs.createWriteStream("build/bundle.js"));
