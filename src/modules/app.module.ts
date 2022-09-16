import { Module } from '@nestjs/common';

import { FileModule } from 'src/modules/file.module';
import { BlueprintsModule } from 'src/modules/blueprints.module';
import { VisualModule } from 'src/modules/visual.module';

@Module({
	imports: [
		FileModule,
		BlueprintsModule,
		VisualModule
	]
})
export class AppModule {}
