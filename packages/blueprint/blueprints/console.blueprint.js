"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Console = void 0;
const types_enum_1 = require("../enums/types.enum");
const services_1 = require("../services");
class Console extends services_1.Blueprint {
    constructor() {
        super();
        this.input("message", types_enum_1.Type.String, null, (v) => (v) ? console.log(v) : null);
    }
}
exports.Console = Console;
