import * as compression from 'compression';
import * as express from "express";
import * as cookieParser from 'cookie-parser';

import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/modules/app.module';

import { WsAdapter } from "./adapters/ws-adapter";
import { Terminal } from "./adapters/terminal";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useWebSocketAdapter(new WsAdapter(app));

	app.enableCors();
	app.use(compression());
	app.use(cookieParser());
	app.use(express.json({ limit: '50mb' }));
  	app.use(express.urlencoded({ extended: true, limit: '50mb' }));

	await app.listen(process.env.PORT || 5001);

	//Terminal
	let terminalServer = new Terminal({
		role: "server",
		shell: (process.platform === "win32") ? "cmd.exe" : "bash",
		port: parseInt(process.env.PORT) + 1 || 5002
	});
	
	terminalServer.onclosed = (code, signal) => {
		console.log("Terminal closed - "+code+", "+signal);
	};

	terminalServer.onopened = () => {
		console.log("Connected to remote");
	};

	terminalServer.onresized = (cols, rows) => {
		console.log("Resized terminal to "+cols+"x"+rows);
	};

	terminalServer.ondisconnected = () => {
		console.log("Remote disconnected");
	};
}

bootstrap();
