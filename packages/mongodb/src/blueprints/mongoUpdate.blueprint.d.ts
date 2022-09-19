import { Blueprint } from "@ucsjs/blueprint";
export declare class MongoUpdateBlueprint extends Blueprint {
    private __namespace;
    private __group;
    private __headerColor;
    private __headerIcon;
    private __TypeMongoDBSchema;
    _multi: boolean;
    _upsert: boolean;
    private state;
    constructor(metadata?: any);
    run(scope: any): Promise<void>;
}
