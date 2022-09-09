"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.CounterBlueprint = void 0;
var rxjs_1 = require("rxjs");
var blueprint_1 = require("@ucsjs/blueprint");
var CounterBlueprint = /** @class */ (function (_super) {
    __extends(CounterBlueprint, _super);
    function CounterBlueprint(metadata) {
        var _this = _super.call(this) || this;
        //Metadata
        _this.__namespace = "Counter";
        _this.__type = "Common";
        _this._start = 0;
        _this._max = 100;
        _this._increment = 1;
        _this._timeout = 1000;
        _this.setup(metadata);
        _this._count = new rxjs_1.BehaviorSubject(_this._start);
        _this._count.subscribe(function (v) { return _this.next("counter", v); });
        _this.output("counter", blueprint_1.Type.Int, _this._start);
        return _this;
    }
    CounterBlueprint.prototype.start = function () {
        var _this = this;
        this._interval = setInterval(function () {
            if (_this._count.value + _this._increment < _this._max)
                _this._count.next(_this._count.value + _this._increment);
            else
                _this.stop();
        }, this._timeout);
    };
    CounterBlueprint.prototype.stop = function () {
        clearInterval(this._interval);
    };
    CounterBlueprint.prototype.reset = function () {
        this._count.next(this._start);
        this.start();
    };
    return CounterBlueprint;
}(blueprint_1.Blueprint));
exports.CounterBlueprint = CounterBlueprint;
