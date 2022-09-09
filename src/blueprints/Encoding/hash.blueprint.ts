import * as crypto from "crypto";
import { Blueprint, Type } from "@ucsjs/blueprint";

export class HashBlueprint extends Blueprint {
    //Metadata
    private __namespace = "Hash";
    private __type = "Encoding";

    public _algorithm: string = "sha256";
    public _encoding: crypto.BinaryToTextEncoding = "hex";

    constructor(metadata?: any){
        super();
        this.setup(metadata);
        this.input("state", Type.Any, null, (v) => this.transform(v, this));
        this.output("result", Type.String, null);
    }

    async transform(v, scope){
        switch(typeof v){
            case "number": v = v.toString(); break;
            case "object": v = JSON.stringify(v); break;
        }

        const hash = (v) ? crypto.createHash(this._algorithm).update(Buffer.from(v)).digest(this._encoding) : null;
        scope.next("result", hash);
    }
}