export declare class Parser {
    private _namespace;
    private _metadata;
    private _resolve;
    private _cwd;
    constructor(namespace: string, metadata: any, resolve: any, cwd: string);
    export(): Promise<string>;
    getInput(component: any, inputId: any): any;
    resolve(namespace: any): Promise<string>;
}
