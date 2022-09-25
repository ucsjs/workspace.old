import { Blueprint } from "@ucsjs/blueprint";
export declare class DatabaseTableBlueprint extends Blueprint {
    private __namespace;
    private __group;
    private __headerColor;
    private __headerIcon;
    private __TypeDatabase_Connection;
    private __TypeDatabase_Table;
    private __type;
    _table: string;
    _columns: object;
    _indices: object;
    _uniques: object;
    constructor(metadata?: any);
}
