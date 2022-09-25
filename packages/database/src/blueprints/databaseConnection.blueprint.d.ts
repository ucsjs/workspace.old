import { Blueprint } from "@ucsjs/blueprint";
export declare class DbConnectionBlueprint extends Blueprint {
    private __namespace;
    private __group;
    private __headerColor;
    private __headerIcon;
    private __TypeDatabase_Connection;
    _type: string;
    _host: string;
    _port: number;
    _user: string;
    _pass: string;
    _db: string;
    _synchronize: boolean;
    _logging: boolean;
    constructor(metadata?: any);
    start(): void;
}
