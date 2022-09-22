import { Module } from '@nestjs/common';

import { FileModule } from 'src/modules/file.module';
import { BlueprintsModule } from 'src/modules/blueprints.module';
import { VisualModule } from 'src/modules/visual.module';
import { ImagesModule } from 'src/modules/images.module';

@Module({
	imports: [FileModule, BlueprintsModule, VisualModule,ImagesModule]
})
export class AppModule {}
