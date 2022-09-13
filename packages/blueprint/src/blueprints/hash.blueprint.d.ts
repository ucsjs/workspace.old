/// <reference types="node" />
import * as crypto from "crypto";
import { Blueprint } from "../services";
export declare class HashBlueprint extends Blueprint {
    private __namespace;
    private __type;
    _algorithm: string;
    _encoding: crypto.BinaryToTextEncoding;
    constructor(metadata?: any);
    transform(v: any, scope: any): Promise<void>;
}
