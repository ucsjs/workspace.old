import { Subject } from 'rxjs';
export declare class Flow {
    private _scope;
    private _subject;
    constructor(scope: any, subject?: Subject<any>);
    subscribe(from: any, output: any, to: any, input: any): this;
    output(component: string, output: string): this;
    start(): void;
}
