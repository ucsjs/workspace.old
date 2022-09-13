import { Flow } from "../../../services/flow.service";
import { CounterBlueprint } from "../../../blueprints/counter.blueprint";
import { ConsoleBlueprint } from "../../../blueprints/console.blueprint";

new Flow({
    counter: new CounterBlueprint(),
    console: new ConsoleBlueprint()
})
.subscribe("counter", "counter", "console", "message")
.start();