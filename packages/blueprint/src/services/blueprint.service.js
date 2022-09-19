"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Global = exports.Blueprint = void 0;
const rxjs_1 = require("rxjs");
class Blueprint {
    constructor() {
        this._stateId = "";
        this._itemKey = "";
        this._inputs = [];
        this._output = [];
    }
    setup(metadata) {
        if (metadata) {
            for (const key in metadata) {
                if (this.hasOwnProperty(`_${key}`))
                    this[`_${key}`] = metadata[key];
            }
        }
    }
    input(key, type, startValue, next) {
        if (!this._inputs.find(input => input.key === key)) {
            const subject = new rxjs_1.BehaviorSubject(startValue);
            if (next)
                subject.subscribe(next);
            this._inputs.push({ key, type, value: subject });
            return subject;
        }
        else {
            return null;
        }
    }
    output(key, type, startValue, next) {
        if (!this._output.find(output => output.key === key)) {
            const subject = new rxjs_1.BehaviorSubject(startValue);
            if (next)
                subject.subscribe(next);
            this._output.push({ key, type, value: subject });
        }
    }
    subscribe(key, callback) {
        var _a;
        const output = this._output.find(output => output.key === key);
        if (output)
            (_a = output.value) === null || _a === void 0 ? void 0 : _a.subscribe(callback);
    }
    unsubscribe(key) {
        var _a;
        const output = this._output.find(output => output.key === key);
        if (output)
            (_a = output.value) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    }
    assign(key) {
        return (value) => {
            var _a;
            const input = this._inputs.find(input => input.key === key);
            if (input)
                (_a = input.value) === null || _a === void 0 ? void 0 : _a.next(value);
        };
    }
    next(key, value) {
        var _a;
        const output = this._output.find(output => output.key === key);
        if (output)
            (_a = output.value) === null || _a === void 0 ? void 0 : _a.next(value);
    }
    error(context, message) {
    }
}
exports.Blueprint = Blueprint;
class Global {
    static register(blueprint) {
        if (!this.blueprints.find(blueprintExist => blueprintExist.constructor.name === blueprint.constructor.name)) {
            this.blueprints.push(blueprint);
            this.indexBlueprints[blueprint.constructor.name] = this.blueprints.length - 1;
        }
    }
    static getBlueprint(name) {
        return (this.indexBlueprints[name]) ? this.blueprints[this.indexBlueprints[name]] : null;
    }
}
exports.Global = Global;
Global.blueprints = [];
Global.indexBlueprints = {};
