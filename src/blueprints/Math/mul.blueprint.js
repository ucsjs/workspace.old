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
exports.MulBlueprint = void 0;
var blueprint_1 = require("@ucsjs/blueprint");
var MulBlueprint = /** @class */ (function (_super) {
    __extends(MulBlueprint, _super);
    function MulBlueprint() {
        var _this = _super.call(this) || this;
        //Metadata
        _this.__namespace = "Mul";
        _this.__type = "Math";
        _this.nums = {};
        _this.input("num1", blueprint_1.Type.Float, null, function (v) { return _this.parse(v, "num1", _this); });
        _this.input("num2", blueprint_1.Type.Float, null, function (v) { return _this.parse(v, "num2", _this); });
        _this.output("result", blueprint_1.Type.Float, null);
        return _this;
    }
    MulBlueprint.prototype.parse = function (v, name, scope) {
        scope[name] = v;
        if (scope.nums.num1 && scope.nums.num2) {
            var result = scope.nums.num1 * scope.nums.num2;
            scope.next("result", result);
        }
    };
    return MulBlueprint;
}(blueprint_1.Blueprint));
exports.MulBlueprint = MulBlueprint;
