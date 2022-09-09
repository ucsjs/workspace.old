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
exports.NumberToStringBlueprint = void 0;
var blueprint_1 = require("@ucsjs/blueprint");
var NumberToStringBlueprint = /** @class */ (function (_super) {
    __extends(NumberToStringBlueprint, _super);
    function NumberToStringBlueprint() {
        var _this = _super.call(this) || this;
        //Metadata
        _this.__namespace = "NumberToString";
        _this.__type = "Converters";
        _this.input("number", blueprint_1.Type.Float, null, function (v) { return _this.parse(v, _this); });
        _this.output("result", blueprint_1.Type.Float, null);
        return _this;
    }
    NumberToStringBlueprint.prototype.parse = function (v, scope) {
        if (typeof v == "number")
            scope.next("result", v.toString());
        else
            scope.error("result", "Invalid number");
    };
    return NumberToStringBlueprint;
}(blueprint_1.Blueprint));
exports.NumberToStringBlueprint = NumberToStringBlueprint;
