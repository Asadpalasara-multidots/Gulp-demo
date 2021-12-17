const gulp = require('gulp');
const sass = require('gulp-sass')(require('node-sass')); 
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const minifyJS = require('gulp-minify');
const autoprefixer = require('gulp-autoprefixer');
const csslint = require('gulp-csslint');
 

const paths = {
    styles: { /* SCSS to CSS */ 
      src: ["wp-content/themes/twentytwentyone/assets/sass/*.scss"],  
      dest: "wp-content/themes/twentytwentyone/assets/css"
    },
    minstyle:{
      src: ["wp-content/themes/twentytwentyone/assets/css/*.css"],
      dest: "wp-content/themes/twentytwentyone/assets/css"
    },
    scripts: {
      src: ["wp-content/themes/twentytwentyone/assets/js/src/*.js"],
      dest: "wp-content/themes/twentytwentyone/assets/js"
    } 
  }

gulp.task('SaasToCss', function () {
  return gulp.src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(csslint())
    .pipe(csslint.formatter()) // Display errors
    .pipe(csslint.formatter('fail')) // Fail on error (or csslint.failFormatter())
    .pipe(gulp.dest(paths.styles.dest));
});
 
gulp.task('concatCss', function () {
    return gulp.src(paths.minstyle.src)
      .pipe(concat('style.min.css')) 
      .pipe(cleanCSS({ compatibility: 'ie8' }))
      .pipe(gulp.dest(paths.minstyle.dest))
});

gulp.task('minifyJS', function () {
  return gulp.src(paths.scripts.src)
  .pipe(concat('script.js')) 
  .pipe(minifyJS({ mangle: false, noSource: true }))
  .pipe(gulp.dest(paths.scripts.dest));
});

gulp.task('watch', function () {
  gulp.watch(['wp-content/themes/twentytwentyone/assets/sass/**/*.scss', 'wp-content/themes/twentytwentyone/assets/js/src/*.js'],
  gulp.series(['SaasToCss', 'concatCss' ,'minifyJS']));
});

gulp.task('default', gulp.series('watch'));