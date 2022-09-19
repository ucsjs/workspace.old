"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const ucs_core_1 = require("./ucs.core");
class Application extends ucs_core_1.UCS {
    OnApplicationStart() { }
    Quit() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.StopLifeCycle();
            if (process && process.exit)
                process.exit(1);
        });
    }
    static Bind(component) {
        this.__binded.push(component);
    }
    static Start() {
        if (!this.__instance) {
            this.__instance = new Application();
            for (let component of Application.__binded) {
                this.__instance.AddComponent(component);
            }
            this.__instance.StartLifeCycle();
        }
    }
}
exports.Application = Application;
Application.__binded = [];
