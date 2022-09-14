import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FileModule } from 'src/modules/file.module';
import { BlueprintsModule } from 'src/modules/blueprints.module';

@Module({
	imports: [
		FileModule,
		BlueprintsModule
	]
})
export class AppModule {}
