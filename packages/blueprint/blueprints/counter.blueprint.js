"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Counter = void 0;
const rxjs_1 = require("rxjs");
const types_enum_1 = require("../enums/types.enum");
const services_1 = require("../services");
class Counter extends services_1.Blueprint {
    constructor(metadata) {
        super();
        this._start = 0;
        this._max = 100;
        this._increment = 1;
        this._timeout = 1000;
        this.setup(metadata);
        this._count = new rxjs_1.BehaviorSubject(this._start);
        this._count.subscribe((v) => this.next("counter", v));
        this.output("counter", types_enum_1.Type.Int, this._start);
    }
    start() {
        this._interval = setInterval(() => {
            if (this._count.value + this._increment < this._max)
                this._count.next(this._count.value + this._increment);
            else
                this.stop();
        }, this._timeout);
    }
    stop() {
        clearInterval(this._interval);
    }
    reset() {
        this._count.next(this._start);
        this.start();
    }
}
exports.Counter = Counter;
