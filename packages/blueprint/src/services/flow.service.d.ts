import { Subject } from 'rxjs';
export declare class Flow {
    private _scope;
    private _subject;
    _root: any;
    constructor(scope: any, subject?: Subject<any>, root?: any);
    subscribe(from: any, output: any, to: any, input: any): this;
    unsubscribe(component: any, input: any): void;
    output(component: string, output: string): this;
    get(component: string): any;
    next(component: string, value: any): this;
    start(): void;
}
