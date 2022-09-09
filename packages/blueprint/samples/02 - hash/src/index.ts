import { Flow } from "../../../services/flow.services";
import { CounterBlueprint } from "../../../blueprints/counter.blueprint";
import { HashBlueprint } from "../../../blueprints/hash.blueprint";
import { ConsoleBlueprint } from "../../../blueprints/console.blueprint";

new Flow({
    counter: new CounterBlueprint(),
    hash: new HashBlueprint({ algorithm: "sha256", encoding: "hex" }),
    console: new ConsoleBlueprint()
})
.subscribe("counter", "counter", "hash", "state")
.subscribe("hash", "result", "console", "message")
.start();