import { Blueprint } from "@ucsjs/blueprint";
export declare class MongoInsertBlueprint extends Blueprint {
    private __namespace;
    private __group;
    private __headerColor;
    private __headerIcon;
    private __TypeMongoDBSchema;
    private state;
    constructor(metadata?: any);
    run(scope: any): Promise<void>;
}