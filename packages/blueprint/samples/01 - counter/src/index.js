"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const counter_blueprint_1 = require("../../../blueprints/counter.blueprint");
const console_blueprint_1 = require("../../../blueprints/console.blueprint");
const counter = new counter_blueprint_1.Counter();
const console = new console_blueprint_1.Console();
counter.subscribe("counter", console.assign("message"));
counter.start();
