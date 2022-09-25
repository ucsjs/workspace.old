import { Blueprint } from "@ucsjs/blueprint";
export declare class DatabaseFindBlueprint extends Blueprint {
    private __namespace;
    private __group;
    private __headerColor;
    private __headerIcon;
    private __TypeDatabase_Table;
    _limit: number;
    _offset: number;
    _groupBy: string;
    private state;
    constructor(metadata?: any);
    run(scope: any): Promise<void>;
}
