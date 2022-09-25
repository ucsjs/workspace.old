import { Blueprint } from "@ucsjs/blueprint";
export declare class MongoSchemaBlueprint extends Blueprint {
    private __namespace;
    private __group;
    private __headerColor;
    private __headerIcon;
    private __TypeMongoDB_Connection;
    private __TypeMongoDB_Schema;
    private __type;
    _collection: string;
    _timestamps: boolean;
    _fields: object;
    constructor(metadata?: any);
}
