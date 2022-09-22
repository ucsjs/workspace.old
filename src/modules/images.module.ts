import { Module } from '@nestjs/common';
import { ImagesController } from 'src/controllers/images.controller';
import { ImagesService } from 'src/services/images.service';

@Module({
	controllers: [ImagesController],
	providers: [ImagesService]
})
export class ImagesModule {}
