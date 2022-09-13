"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashBlueprint = void 0;
const crypto = require("crypto");
const types_enum_1 = require("../enums/types.enum");
const services_1 = require("../services");
class HashBlueprint extends services_1.Blueprint {
    constructor(metadata) {
        super();
        this.__namespace = "Hash";
        this.__type = "Common";
        this._algorithm = "sha256";
        this._encoding = "hex";
        this.setup(metadata);
        this.input("state", types_enum_1.Type.String, null, (v) => this.transform(v, this));
        this.output("result", types_enum_1.Type.String, null);
    }
    async transform(v, scope) {
        switch (typeof v) {
            case "number":
                v = v.toString();
                break;
            case "object":
                v = JSON.stringify(v);
                break;
        }
        const hash = (v) ? crypto.createHash(this._algorithm).update(Buffer.from(v)).digest(this._encoding) : null;
        scope.next("result", hash);
    }
}
exports.HashBlueprint = HashBlueprint;
services_1.Global.register(HashBlueprint);
