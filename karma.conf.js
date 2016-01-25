module.exports = function(karma){
  karma.set({
    basePath: '',

    
    // register the framework (it needs to go before mocha / jasmine) 
    frameworks: ['angular', 'jasmine', 'browserify'],
 
 
    files: [                 // no need to enter paths for angular / angular-mocks 
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      'public/js/main.js',
      "spec/**/*.js"         // prepended to this array. 
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'spec/**/*.js': ['browserify']
    },
 
    browsers: ['PhantomJS']
  });
};
