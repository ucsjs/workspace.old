import { Module } from '@nestjs/common';
import { FileController } from 'src/controllers/file.controller';
import { FileService } from 'src/services/file.service';

@Module({
	imports: [],
	controllers: [FileController],
	providers: [FileService]
})
export class FileModule {}
