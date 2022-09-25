/**
 * @see https://github.com/nestjs/nest/blob/master/tools/gulp/tasks/packages.ts
 */

import { source } from '../config';
import { task, watch, series, dest } from 'gulp';
import * as ts from 'gulp-typescript';
import * as sourcemaps from 'gulp-sourcemaps';
import * as uglify from 'gulp-uglify';
import * as log from 'fancy-log';
import * as merge from 'merge-stream';
import * as browserify from "browserify";
import * as sourceVinyl from "vinyl-source-stream";
import * as buffer from 'vinyl-buffer';

const packages = {
	blueprint: ts.createProject('packages/blueprint/tsconfig.json'),
	mongodb: ts.createProject('packages/mongodb/tsconfig.json'),
	engine: ts.createProject('packages/engine/tsconfig.json'),
	database: ts.createProject('packages/database/tsconfig.json')
};

const packagesBrowserify = {
	engine: ts.createProject('packages/engine/tsconfig.json')
};

const modules = Object.keys(packages);
const modulesBrowserify = Object.keys(packagesBrowserify);

const distId = process.argv.indexOf('--dist');
const dist = distId < 0 ? source : process.argv[distId + 1];

function defaultTask() {
	log.info('Watching files..');

	modules.forEach(packageName => {
		watch([`${source}/${packageName}/**/*.ts`, `${source}/${packageName}/*.ts`],
			series(packageName),
		);
	});
}

function buildPackage(packageName: string) {		
	var build = packages[packageName]
		.src()
		.pipe(packages[packageName]())
		.pipe(dest(`${dist}/${packageName}`));

	var copy = packages[packageName]
		.src()
		.pipe(dest(`${dist}/${packageName}`));

	return merge(build, copy)
}

function buildBrowserify(packageName: string){
	return browserify(`${dist}/${packageName}/index.client.js`)
		.bundle()
		.pipe(sourceVinyl(`${packageName}.min.js`))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(dest(`${dist}/${packageName}`))
}

function buildPackageDev(packageName: string) {
	return packages[packageName]
		.src()
		.pipe(sourcemaps.init())
		.pipe(packages[packageName]())
		.pipe(
		sourcemaps.mapSources(
			(sourcePath: string) => './' + sourcePath.split('/').pop(),
		),
		)
		.pipe(sourcemaps.write('.', { includeContent: false }))
		.pipe(dest(`${dist}/${packageName}`));
}

modules.forEach(packageName => {
	task(packageName, () => buildPackage(packageName));
	task(`${packageName}:dev`, () => buildPackageDev(packageName));
});

modulesBrowserify.forEach(packageName => {
	task(`${packageName}:browserify`, () => buildBrowserify(packageName));
});

task('common:dev', series(modules.map(packageName => `${packageName}:dev`)));
task('build', series(modules));
task('browserify', series(modulesBrowserify.map(packageName => `${packageName}:browserify`)));
task('build:dev', series('common:dev'));
task('default', defaultTask);