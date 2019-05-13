import { src, dest, series, watch } from 'gulp';
import browserSync from 'browser-sync';
import del from 'del';
import gulpIf from 'gulp-if';
import sass from 'gulp-sass';
import sourceMaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import yargs from 'yargs';

// Production environment
const PRODUCTION = yargs.argv.prod;

// Project dependences
const dependences = [];

// Project dirs
const dirs = {
    dev: '.',
    prod: './prod'
}

// del paths
const delPath = {
    toDel: `${dirs.prod}/**`,
    skieDel: `!${dirs.prod}`
}

// clear production folder
export const clearProduction = (done) => {
    return del.sync([delPath.toDel, delPath.skieDel], done());
}

// Browsersync
const server = browserSync.create();
export const serve = (done) => {
    server.init({
        server: {
            baseDir: dirs.prod
        }
    })
    done();
}

// Browsersync reload
export const reload = (done) => {
    server.reload();
    done();
}

// HTML files
const htmlFiles = {
    dev: `${dirs.dev}/*.html`,
    prod: `${dirs.prod}`
}

// Copy html files to PROD folder
export const htmlCopy = () => {
    return src(htmlFiles.dev)
        .pipe(dest(htmlFiles.prod));
}

// SASS files
const sassFiles = {
    dev: `${dirs.dev}/sass/**/*.scss`,
    prod: `${dirs.prod}/assets/css`
}

// SASS to Css
export const sassConvert = () => {
    return src(sassFiles.dev)
        .pipe(gulpIf(!PRODUCTION, sourceMaps.init()))
        .pipe(gulpIf(!PRODUCTION, sass().on('error', sass.logError)))
        .pipe(gulpIf(!PRODUCTION, sourceMaps.write()))
        .pipe(gulpIf(PRODUCTION, sass({
            outputStyle: 'compressed'
        })))
        .pipe(autoprefixer({browsers: ['last 2 versions']}))
        .pipe(gulpIf(!PRODUCTION, sourceMaps.write()))
        .pipe(dest(sassFiles.prod))
        .pipe(server.stream());
}

// js files
const jsFiles = {
    dev: `${dirs.dev}/js/*.js`,
    prod: `${dirs.prod}/assets/js`
}

// js uglify
export const jsUglify = () => {
    return src(jsFiles.dev)
        .pipe(babel())
        .pipe(gulpIf(PRODUCTION, uglify()))
        .pipe(dest(jsFiles.prod))
        .pipe(server.stream());
}


// Gulp watch task
export const watchForChanges = () => {
    watch(htmlFiles.dev, series(htmlCopy, reload));
    watch(sassFiles.dev, sassConvert);
    watch(jsFiles.dev, jsUglify);
}

// Gulp develop task
export const develop = series(clearProduction, htmlCopy, sassConvert, jsUglify, serve, watchForChanges);

// Gulp production task
export const buildForProd = series(clearProduction, htmlCopy, sassConvert, jsUglify);

// Gulp default task
export default develop;
