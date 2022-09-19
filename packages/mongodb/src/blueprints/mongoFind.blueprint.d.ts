import { Blueprint } from "@ucsjs/blueprint";
export declare class MongoFindBlueprint extends Blueprint {
    private __namespace;
    private __group;
    private __headerColor;
    private __headerIcon;
    private __TypeMongoDBSchema;
    _limit: number;
    _offset: number;
    private state;
    constructor(metadata?: any);
    run(scope: any): Promise<void>;
}
