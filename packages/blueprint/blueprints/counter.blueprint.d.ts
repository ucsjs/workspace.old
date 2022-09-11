import { Blueprint } from "../services";
export declare class CounterBlueprint extends Blueprint {
    private __namespace;
    private __type;
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
