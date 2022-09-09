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
exports.InputBlueprint = void 0;
var rxjs_1 = require("rxjs");
var blueprint_1 = require("@ucsjs/blueprint");
var InputBlueprint = /** @class */ (function (_super) {
    __extends(InputBlueprint, _super);
    function InputBlueprint(metadata) {
        var _this = _super.call(this) || this;
        //Metadata
        _this.__namespace = "Input";
        _this.__type = "Common";
        _this._type = blueprint_1.Type.Any;
        _this._value = null;
        _this.setup(metadata);
        _this._state = new rxjs_1.BehaviorSubject(_this._value);
        _this.output("state", blueprint_1.Type.Any, _this._state);
        return _this;
    }
    return InputBlueprint;
}(blueprint_1.Blueprint));
exports.InputBlueprint = InputBlueprint;
