import { Module } from '@nestjs/common';
import { VisualController } from 'src/controllers/visual.controller';
import { VisualService } from 'src/services/visual.service';
import { RegexService } from 'src/services/regex.services';

@Module({
	controllers: [VisualController],
	providers: [VisualService, RegexService]
})
export class VisualModule {}
