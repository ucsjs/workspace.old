import { Blueprint } from "@ucsjs/blueprint";
export declare class MongoDeleteBlueprint extends Blueprint {
    private __namespace;
    private __group;
    private __headerColor;
    private __headerIcon;
    private __TypeMongoDB_Schema;
    _multi: boolean;
    private state;
    constructor(metadata?: any);
    run(scope: any): Promise<void>;
}
