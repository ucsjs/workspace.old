import { BehaviorSubject } from 'rxjs';
import { Blueprint, Type } from "@ucsjs/blueprint";

export class SchedulingBlueprint extends Blueprint {
    //Metadata
    private __namespace = "Scheduling";
    private __group = "Common";
    private __headerIcon = "fa-solid fa-clock-rotate-left";

    public _time: string = "EVERY_SECOND";
}