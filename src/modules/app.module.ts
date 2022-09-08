import { Module } from '@nestjs/common';
import { FileModule } from 'src/modules/file.module';

@Module({
	imports: [
		FileModule
	]
})
export class AppModule {}
