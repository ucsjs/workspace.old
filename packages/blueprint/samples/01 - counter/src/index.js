"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flow_service_1 = require("../../../src/services/flow.service");
const counter_blueprint_1 = require("../../../src/blueprints/counter.blueprint");
const console_blueprint_1 = require("../../../src/blueprints/console.blueprint");
new flow_service_1.Flow({
    counter: new counter_blueprint_1.CounterBlueprint(),
    console: new console_blueprint_1.ConsoleBlueprint()
})
    .subscribe("counter", "counter", "console", "message")
    .start();
