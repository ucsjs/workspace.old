import { Module } from '@nestjs/common';

import { DocsController } from 'src/controllers/docs.controler';
import { DocsService } from 'src/services/docs.service';

@Module({
	controllers: [DocsController],
    providers: [DocsService]
})
export class DocsModule {}
