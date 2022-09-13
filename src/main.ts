import * as compression from 'compression';
import * as express from "express";
import * as cookieParser from 'cookie-parser';
import * as path from "path";
import * as fg from "fast-glob";

import { Logger } from '@nestjs/common';
import { NestFactory, LazyModuleLoader } from '@nestjs/core';
import { AppModule } from 'src/modules/app.module';

import { WsAdapter } from "./adapters/ws-adapter";
import { Terminal } from "./adapters/terminal";

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { cors: true });
	const lazyModuleLoader = app.get(LazyModuleLoader);
	const files = await fg("./src/workspace/**/*.blueprint.ts", { dot: true, onlyFiles: true });

	for(let file of files){
		try{
			const filename = path.resolve(file.replace(".ts", "").replace("./", "").replace("src/", "dist/"));
			const { LazyModule } = await import(filename);
			await lazyModuleLoader.load(() => LazyModule);
		}
		catch(err){}
	}
	
	app.useWebSocketAdapter(new WsAdapter(app));
	app.enableCors();
	app.use(compression());
	app.use(cookieParser());
	app.use(express.json({ limit: '50mb' }));
  	app.use(express.urlencoded({ extended: true, limit: '50mb' }));

	await app.listen(process.env.PORT || 5001);

	//Terminal
	let terminalServer = new Terminal({
		shell: (process.platform === "win32") ? "cmd.exe" : "bash",
		port: parseInt(process.env.PORT) + 1 || 5002
	});
	
	terminalServer.onclosed = (code, signal) => {
		//console.log("Terminal closed - "+code+", "+signal);
	};

	terminalServer.onopened = () => {
		//console.log("Connected to remote");
	};

	terminalServer.onresized = (cols, rows) => {
		//console.log("Resized terminal to "+cols+"x"+rows);
	};

	terminalServer.ondisconnected = () => {
		//console.log("Remote disconnected");
	};
}

bootstrap();
