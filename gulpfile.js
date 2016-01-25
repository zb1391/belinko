var gulp = require('gulp')
var sass = require('gulp-ruby-sass')
var connect = require('gulp-connect')
// requires browserify and vinyl-source-stream
var browserify = require('browserify')
var source = require('vinyl-source-stream')
var server = require('./server.js')
var karma = require('karma').Server

// Connect task
gulp.task('connect', function () {
  server.listen(4000);
})

gulp.task('browserify', function() {
    // Grabs the app.js file
    return browserify('./app/main.js')
        // bundles it and creates a file called main.js
        .bundle()
        .pipe(source('main.js'))
        // saves it the public/js/ directory
        .pipe(gulp.dest('./public/js/'));
})


gulp.task('sass', function() {
  return sass('app/styles/main.scss',{
    loadPath: [
      'node_modules/bootstrap-sass/assets/stylesheets/',
      'app/styles/components/'
    ],
  })
  .on('error', sass.logError)
  .pipe(gulp.dest('./public/css/'))
})

gulp.task('watch', function() {
    gulp.watch('app/**/*.js', ['browserify'])
    gulp.watch('app/styles/main.scss',['sass'])
    gulp.watch('app/styles/components/*.scss',['sass'])
})

gulp.task('test', function(done){
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done)
});

gulp.task('default', ['browserify','sass','connect', 'watch'])
