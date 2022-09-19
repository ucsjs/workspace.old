import { Flow } from "../../../src/services/flow.service";
import { CounterBlueprint } from "../../../src/blueprints/counter.blueprint";
import { ConsoleBlueprint } from "../../../src/blueprints/console.blueprint";

new Flow({
    counter: new CounterBlueprint(),
    console: new ConsoleBlueprint()
})
.subscribe("counter", "counter", "console", "message")
.start();