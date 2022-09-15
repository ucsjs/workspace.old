import express from 'express';
import * as http from 'http';
import * as net from 'net';
import * as rpc from 'vscode-ws-jsonrpc';
import * as server from 'vscode-ws-jsonrpc/server';
import * as lsp from 'vscode-languageserver';
import { Message } from 'vscode-languageserver';
import { Server } from "ws";

export function launch (socket: rpc.IWebSocket) {
  const reader = new rpc.WebSocketMessageReader(socket);
  const writer = new rpc.WebSocketMessageWriter(socket);
  const socketConnection = server.createConnection(reader, writer, () => socket.dispose())
  const serverConnection = server.createServerProcess('JSON', 'node', ['example.js']);

  server.forward(socketConnection, serverConnection, message => {
      if (Message.isRequest(message)) {
          if (message.method === lsp.InitializeRequest.type.method) {
              const initializeParams = message.params as lsp.InitializeParams;
              initializeParams.processId = process.pid;
          }
      }
      return message;
  });
}

const wss = Server({
	port: parseInt(process.env.PORT) + 2 || 5003,
	clientTracking: true
})

wss.on('connection', (socket) => {
	console.log(socket);
	socket.write("Hello");

	if (socket.readyState === socket.OPEN) 
		launch(socket);
	else 
		socket.on('open', () => launch(socket));
});
