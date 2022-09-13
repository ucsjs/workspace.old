/**
 * @see https://github.com/nestjs/nest/blob/master/tools/gulp/tasks/packages.ts
 */

 import { source, packagePaths } from '../config';
 import { task, watch, series, dest, src } from 'gulp';
 import * as ts from 'gulp-typescript';
 import * as sourcemaps from 'gulp-sourcemaps';
 import * as log from 'fancy-log';
 import * as merge from 'merge-stream';
 
 const packages = {
   blueprint: ts.createProject('packages/blueprint/tsconfig.json'),
   mongodb: ts.createProject('packages/mongodb/tsconfig.json'),
 };
 
 const modules = Object.keys(packages);
 
 const distId = process.argv.indexOf('--dist');
 const dist = distId < 0 ? source : process.argv[distId + 1];
 
 function defaultTask() {
   log.info('Watching files..');

   modules.forEach(packageName => {
	 watch(
	   [`${source}/${packageName}/**/*.ts`, `${source}/${packageName}/*.ts`],
	   series(packageName),
	 );
   });
 }
 
 function buildPackage(packageName: string) {
	var copy = packages[packageName]
		.src(['./**/*'])
		.pipe(dest(`${dist}/${packageName}/src`));

	var build = packages[packageName]
		.src()
		.pipe(packages[packageName]())
		.pipe(dest(`${dist}/${packageName}`));
		
	return merge(copy, build);
 }
 
 function buildPackageDev(packageName: string) {
   return packages[packageName]
	 .src()
	 .pipe(sourcemaps.init())
	 .pipe(ts(packages[packageName]))
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
 
 task('common:dev', series(modules.map(packageName => `${packageName}:dev`)));
 task('build', series(modules));
 task('build:dev', series('common:dev'));
 task('default', defaultTask);