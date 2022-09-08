/// <reference types="node" />
import * as crypto from "crypto";
import { Blueprint } from "../services";
export declare class Hash extends Blueprint {
    _algorithm: string;
    _encoding: crypto.BinaryToTextEncoding;
    constructor(metadata?: any);
    transform(v: any, scope: any): Promise<void>;
}
