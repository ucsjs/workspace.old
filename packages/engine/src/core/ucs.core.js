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
exports.UCS = void 0;
const rxjs_1 = require("rxjs");
class UCS {
    constructor() {
        this.__scope = {};
        this.__fixedFramerate = 60;
        this.__framerate = 0;
        this.__calls = 0;
        this.__epoch = 0;
        this.__editor = false;
        this.__pause = false;
        this.__exit = false;
        this.timeLifeCycle = 0;
        this.lifeCycleStep = 0;
        this.__events = {
            Awake: [],
            OnEnable: [],
            Reset: [],
            Start: [],
            Update: [],
            LateUpdate: [],
            OnApplicationPause: [],
            OnApplicationQuit: [],
            OnDisable: [],
            OnDestroy: [],
            OnException: []
        };
    }
    OnApplicationStart() { }
    static OnUpdateProfile(c) {
        if (c)
            this.__updateProfile.subscribe(c);
    }
    Profile(profile) {
        UCS.__updateProfile.next(profile);
    }
    IsPromise(p) {
        return (typeof p === 'object' && typeof p.then === 'function');
    }
    Promisify(f, component) {
        return (!this.IsPromise(f)) ? new Promise((resolve) => { f.bind(component).call(); resolve(null); }) : null;
    }
    AddComponent(namespace, component) {
        this.__scope[namespace] = component;
        for (let key in this.__events) {
            if (typeof component[key] === "function") {
                this.__events[key].push(component[key]);
            }
        }
    }
    GetComponent(namespace) {
        return (this.__scope[namespace]) ? this.__scope[namespace] : null;
    }
    Call(eventName, debug = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (debug)
                console.log("Call", eventName, this.__events[eventName].length);
            if (this.__events[eventName] && this.__events[eventName].length > 0) {
                let events = [];
                this.__calls += this.__events[eventName].length;
                for (let event of this.__events[eventName])
                    events.push((this.IsPromise(event)) ? new event : this.Promisify(event, this));
                yield Promise.all(events);
            }
            return true;
        });
    }
    Pause() {
        return __awaiter(this, void 0, void 0, function* () {
            this.__pause = true;
            this.__frameRateReset.Pause();
            yield this.Call("OnApplicationPause");
        });
    }
    Exit() {
        return __awaiter(this, void 0, void 0, function* () {
            this.__exit = true;
            clearInterval(this.__frameRateReset);
            yield this.Call("OnApplicationQuit", true);
            yield this.Call("OnDisable", true);
            yield this.Call("OnDestroy", true);
        });
    }
    Exception() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.Call("OnException", true);
            this.Exit();
        });
    }
    StopLifeCycle() {
        this.Exit();
    }
    StartLifeCycle() {
        return __awaiter(this, void 0, void 0, function* () {
            if (process && process.on) {
                process.on('exit', this.Exit);
                process.on('SIGINT', this.Exit);
                process.on('SIGUSR1', this.Exit);
                process.on('SIGUSR2', this.Exit);
                process.on('uncaughtException', this.Exception);
            }
            this.OnApplicationStart();
            yield this.Call("Awake", true);
            yield this.Call("OnEnable", true);
            yield this.Call("Reset", true);
            yield this.Call("Start", true);
            this.timeLifeCycle = new Date().getTime();
            this.__frameRateReset = setInterval(() => __awaiter(this, void 0, void 0, function* () {
                if ((!this.__pause && !this.__exit)) {
                    this.lifeCycleStep = new Date().getTime();
                    if (this.__framerate <= this.__fixedFramerate) {
                        yield this.Call("Update");
                        yield this.Call("LateUpdate");
                        this.__framerate++;
                    }
                    if (this.lifeCycleStep - this.timeLifeCycle >= 1000) {
                        this.Profile({
                            "Calls": this.__calls,
                            "Frames": this.__framerate,
                            "Epoch": this.__epoch,
                            "EpochTime": this.lifeCycleStep
                        });
                        this.timeLifeCycle = new Date().getTime();
                        this.__framerate = 0;
                        this.__calls = 0;
                        this.__epoch++;
                    }
                }
            }));
        });
    }
}
exports.UCS = UCS;
UCS.__updateProfile = new rxjs_1.Subject();
