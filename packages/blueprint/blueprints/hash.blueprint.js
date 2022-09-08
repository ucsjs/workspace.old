"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hash = void 0;
const tslib_1 = require("tslib");
const crypto = tslib_1.__importStar(require("crypto"));
const types_enum_1 = require("../enums/types.enum");
const services_1 = require("../services");
class Hash extends services_1.Blueprint {
    constructor(metadata) {
        super();
        this._algorithm = "sha256";
        this._encoding = "hex";
        this.setup(metadata);
        const state = this.input("state", types_enum_1.Type.String, null, (v) => this.transform(v, this));
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
exports.Hash = Hash;
