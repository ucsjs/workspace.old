import { Module } from '@nestjs/common';

import { IndexController } from 'src/controllers/index.controller';

@Module({
	controllers: [IndexController]
})
export class IndexModule {}
