import { Server } from "ws";
import { Logger } from '@nestjs/common';
import * as rpc from 'vscode-ws-jsonrpc';
import * as server from 'vscode-ws-jsonrpc/server';
import * as lsp from 'vscode-languageserver';
import { Message } from 'vscode-languageserver';

export class VSCodeLS {
    constructor(opts){
        const wss = Server({
            port: opts.port || 5003,
            clientTracking: true,
        })
        
        wss.on('connection', (socket) => {
            Logger.log("Connection established", "VSCodeLS");

            socket.write("Hello");
        
            if (socket.readyState === socket.OPEN) 
                this.launch(socket);
            else 
                socket.on('open', () => this.launch(socket));
        });
    }

    launch (socket: rpc.IWebSocket) {
        const reader = new rpc.WebSocketMessageReader(socket);
        const writer = new rpc.WebSocketMessageWriter(socket);
        const socketConnection = server.createConnection(reader, writer, () => socket.dispose())
        const serverConnection = server.createServerProcess('JSON', 'node');
      
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
}
