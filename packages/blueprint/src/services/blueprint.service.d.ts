import { BehaviorSubject } from 'rxjs';
import { Input } from "../interfaces/input.interface";
import { Output } from "../interfaces/output.interface";
export declare class Blueprint {
    protected root: {};
    protected _stateId: string;
    protected _itemKey: string;
    protected _inputs: Input<any>[];
    protected _output: Output<any>[];
    constructor();
    setup(metadata: any): void;
    input(key: string, type: any, startValue: any, next?: any): BehaviorSubject<any>;
    output(key: string, type: any, startValue: any, next?: any): void;
    subscribe(key: string, callback: (value: any) => void): void;
    unsubscribe(key: string): void;
    assign(key: string): (value: any) => void;
    next(key: string, value: any): void;
    get(key: string): any;
    error(context: any, message: any): void;
}
export declare class Global {
    static blueprints: any[];
    static indexBlueprints: any;
    static register(blueprint: any): void;
    static getBlueprint(name: string): any;
}
