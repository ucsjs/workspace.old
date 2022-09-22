import { Logger } from "@nestjs/common";
import * as Pty from "node-pty";
import { Server } from "ws";

export class Terminal {
    private Pty;
    private Websocket;
    private tty;
    private wss;

    public onclosed: (code: number, signal: string) => void;
    public onopened: () => void;
    public onresized: (cols: number, rows: number) => void;
    public ondisconnected: () => void;

    constructor(opts) {
        this.Pty = Pty;
        this.Websocket = Server;

        this.tty = this.Pty.spawn(opts.shell || "bash", [], {
            name: 'xterm-color',
            cols: 80,
            rows: 24,
            cwd: process.env.PWD,
            env: process.env
        });

        this.tty.on('exit', (code, signal) => {
            this.onclosed(code, signal);
        });

        this.wss = new this.Websocket({
            port: opts.port || 3000,
            clientTracking: true,
            verifyClient: (info) => {
                if (this.wss.clients.length >= 1) {
                    return false;
                } else {
                    return true;
                }
            }
        });

        this.wss.on('connection', (ws) => {
            Logger.log("Connection established", "Terminal");

            //this.onopened();

            this.tty.write('\r');

            ws.on('message', (msg) => {
                if (msg.includes("ESCAPED|-- ")) {
                    if (msg.includes("ESCAPED|-- RESIZE:")) {
                        msg = msg.substr(18);
                        let cols = msg.slice(0, -4);
                        let rows = msg.substr(4);
                        this.tty.resize(Number(cols), Number(rows));
                        this.onresized(cols, rows);
                    }
                } else {
                    this.tty.write(msg);
                }
            });
            
            this.tty.on('data', (data) => {
                try {
                    ws.send(data);
                } 
                catch (e) {}
            });
        });

        this.wss.on('close', () => {
            this.ondisconnected();
        });
    }
}