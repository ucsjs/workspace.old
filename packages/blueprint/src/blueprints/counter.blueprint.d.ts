import { Blueprint } from "../services";
export declare class CounterBlueprint extends Blueprint {
    private __namespace;
    private __group;
    private __export;
    private __private;
    private _count;
    private _interval;
    _start: number;
    _max: number;
    _increment: number;
    _timeout: number;
    constructor(metadata?: any);
    start(): void;
    stop(): void;
    reset(): void;
}
