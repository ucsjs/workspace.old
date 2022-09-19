"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleBlueprint = void 0;
const types_enum_1 = require("../enums/types.enum");
const services_1 = require("../services");
class ConsoleBlueprint extends services_1.Blueprint {
    constructor() {
        super();
        this.__namespace = "Console";
        this.__group = "Common";
        this.__private = true;
        this.input("message", types_enum_1.Type.String, null, (v) => (v) ? console.log(v) : null);
    }
}
exports.ConsoleBlueprint = ConsoleBlueprint;
services_1.Global.register(ConsoleBlueprint);
