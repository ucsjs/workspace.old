import { Module } from '@nestjs/common';
import { FileController } from 'src/controllers/file.controller';
import { FileService } from 'src/services/file.service';
import { BlueprintsService } from "src/services/blueprints.service";
import { RegexService } from "src/services/regex.services";

@Module({
	imports: [],
	controllers: [FileController],
	providers: [FileService, BlueprintsService, RegexService]
})
export class FileModule {}
