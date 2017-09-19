const gulp = require('gulp');
gulp.task('heroku:prodution', herokuProduction);

function herokuProduction() {
  console.log('HEROKU ENV: production');
}
