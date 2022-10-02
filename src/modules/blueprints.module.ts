import { Module } from '@nestjs/common';
import { BlueprintsController } from 'src/controllers/blueprints.controller';
import { DefaultBlueprintParser } from 'src/parsers/default.blueprints.parser';
import { RegexService } from 'src/services/regex.services';

@Module({
	controllers: [BlueprintsController],
	providers: [DefaultBlueprintParser, RegexService]
})
export class BlueprintsModule {}
