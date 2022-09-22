import { Module } from '@nestjs/common';
import { BlueprintsController } from 'src/controllers/blueprints.controller';
import { BlueprintsService } from 'src/services/blueprints.service';
import { RegexService } from 'src/services/regex.services';

@Module({
	controllers: [BlueprintsController],
	providers: [BlueprintsService, RegexService]
})
export class BlueprintsModule {}
