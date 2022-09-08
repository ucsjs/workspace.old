import { Counter } from "../../../blueprints/counter.blueprint";
import { Hash } from "../../../blueprints/hash.blueprint";
import { Console } from "../../../blueprints/console.blueprint";

const counter = new Counter();
const hash = new Hash({ algorithm: "sha256", encoding: "hex" });
const console = new Console();

counter.subscribe("counter", hash.assign("state"));
hash.subscribe("result", console.assign("message"));
counter.start();