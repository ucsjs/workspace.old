// Auto-generated by Blueprint 

import { Subject } from 'rxjs';
import { Blueprint, Flow } from "@ucsjs/blueprint";
import { CounterBlueprint } from "../../blueprints/Common/counter.blueprint";
import { ConsoleBlueprint } from "../../blueprints/Debug/console.blueprint";

export default class TodoBlueprint extends Blueprint {
	exec(args?: any){
		const subject = new Subject<any>();

		const flow = new Flow({
			counterblueprint0: new CounterBlueprint(),
			consoleblueprint1: new ConsoleBlueprint(),
		}, subject, args);

		flow.subscribe("counterblueprint0", "counter", "consoleblueprint1", "message")
		flow.start();

		return { flow, subject };
	}
}