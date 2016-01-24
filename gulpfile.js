var gulp = require('gulp')
var sass = require('gulp-ruby-sass')
var connect = require('gulp-connect')
// requires browserify and vinyl-source-stream
var browserify = require('browserify')
var source = require('vinyl-source-stream')

// Connect task
gulp.task('connect', function () {
    connect.server({
        root: 'public',
        port: 4000
    })
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
})

gulp.task('default', ['connect', 'watch'])
