import { BehaviorSubject } from 'rxjs';
import { Type } from '../enums/types.enum';
import { Input } from "../interfaces/input.interface";
import { Output } from "../interfaces/output.interface";
export declare class Blueprint {
    protected _inputs: Input<any>[];
    protected _output: Output<any>[];
    setup(metadata: any): void;
    input(key: string, type: Type, startValue: any, next?: any): BehaviorSubject<any>;
    output(key: string, type: Type, startValue: any, next?: any): void;
    subscribe(key: string, callback: (value: any) => void): void;
    assign(key: string): (value: any) => void;
    next(key: string, value: any): void;
}
