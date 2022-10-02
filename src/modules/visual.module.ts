import { Module } from '@nestjs/common';
import { VisualController } from 'src/controllers/visual.controller';
import { DefaultVisualParser } from 'src/parsers/default.visual.parser';
import { RegexService } from 'src/services/regex.services';

@Module({
	controllers: [VisualController],
	providers: [DefaultVisualParser, RegexService]
})
export class VisualModule {}
