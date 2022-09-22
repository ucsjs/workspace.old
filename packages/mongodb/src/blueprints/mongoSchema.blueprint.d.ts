import { Blueprint } from "@ucsjs/blueprint";
export declare class MongoSchemaBlueprint extends Blueprint {
    private __namespace;
    private __group;
    private __headerColor;
    private __headerIcon;
    private __TypeMongoDBConnection;
    private __TypeMongoDBSchema;
    private __type;
    _collection: string;
    _timestamps: boolean;
    _fields: object;
    constructor(metadata?: any);
}
