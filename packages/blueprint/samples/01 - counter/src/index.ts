import { Counter } from "../../../blueprints/counter.blueprint";
import { Console } from "../../../blueprints/console.blueprint";

const counter = new Counter();
const console = new Console();

counter.subscribe("counter", console.assign("message"));
counter.start();