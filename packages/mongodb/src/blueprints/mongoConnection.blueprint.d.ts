import { Blueprint } from "@ucsjs/blueprint";
export declare class MongoConnectionBlueprint extends Blueprint {
    private __namespace;
    private __group;
    private __headerColor;
    private __headerIcon;
    private __TypeMongoDBConnection;
    private __protocol;
    _protocol: string;
    _host: string;
    _port: number;
    _ignorePort: boolean;
    _user: string;
    _pass: string;
    _db: string;
    _replicaSet: string;
    _tls: boolean;
    _authSource: string;
    constructor(metadata?: any);
    start(): void;
}
