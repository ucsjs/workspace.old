/**
 * @see https://github.com/nestjs/nest/blob/master/tools/gulp/tasks/move.ts
 */

import { dest, src, task } from 'gulp';
import { join } from 'path';

function move() {
  const distFiles = src(['node_modules/@ucsjs/**/*']);

  const flattenedSampleDirs: string[] = [];

  return flattenedSampleDirs.reduce(
    (distFile, dir) => distFile.pipe(dest(join(dir, '/node_modules/@ucsjs'))),
    distFiles,
  );
}

task('move', move);
