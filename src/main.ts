import * as compression from 'compression';
import * as express from "express";
import * as cookieParser from 'cookie-parser';

import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/modules/app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.enableCors();
	app.use(compression());
	app.use(cookieParser());
	app.use(express.json({ limit: '50mb' }));
  	app.use(express.urlencoded({ extended: true, limit: '50mb' }));

	await app.listen(process.env.PORT || 5001);
}

bootstrap();
