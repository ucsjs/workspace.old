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
exports.ConsoleBlueprint = void 0;
var blueprint_1 = require("@ucsjs/blueprint");
var ConsoleBlueprint = /** @class */ (function (_super) {
    __extends(ConsoleBlueprint, _super);
    function ConsoleBlueprint() {
        var _this = _super.call(this) || this;
        //Metadata
        _this.__namespace = "Console";
        _this.__type = "Debug";
        _this.input("message", blueprint_1.Type.String, null, function (v) { return (v) ? console.log(v) : null; });
        return _this;
    }
    return ConsoleBlueprint;
}(blueprint_1.Blueprint));
exports.ConsoleBlueprint = ConsoleBlueprint;
