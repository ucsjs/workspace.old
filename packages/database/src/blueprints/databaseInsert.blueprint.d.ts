import { Blueprint } from "@ucsjs/blueprint";
export declare class DatabaseInsertBlueprint extends Blueprint {
    private __namespace;
    private __group;
    private __headerColor;
    private __headerIcon;
    private __TypeDatabase_Table;
    private state;
    constructor(metadata?: any);
    run(scope: any): Promise<void>;
}
