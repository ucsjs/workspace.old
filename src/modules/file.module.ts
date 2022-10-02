import { Module } from '@nestjs/common';
import { FileController } from 'src/controllers/file.controller';
import { FileService } from 'src/services/file.service';
import { DefaultBlueprintParser } from "src/parsers/default.blueprints.parser";
import { DefaultVisualParser } from "src/parsers/default.visual.parser";
import { RegexService } from "src/services/regex.services";

@Module({
	controllers: [FileController],
	providers: [FileService, DefaultBlueprintParser, DefaultVisualParser, RegexService]
})
export class FileModule {}
