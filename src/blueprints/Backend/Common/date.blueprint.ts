import { BehaviorSubject } from 'rxjs';
import { Blueprint, Type } from "@ucsjs/blueprint";

export class DateBlueprint extends Blueprint {
    //Metadata
    private __namespace = "Date";
    private __group = "Common";
    private __headerIcon = "fa-solid fa-calendar-days";
    private __type = ["", "UTCString", "ISOString", "JSON", "LocaleString", "LocaleDateString", "LocaleTimeString"];
    private __typeHelp = "https://www.w3schools.com/jsref/jsref_obj_date.asp";

    private _input: string = "";
    public _type: string = "";

    constructor(metadata?: any) {
        super();
        this.setup(metadata);
        this.input("input", Type.String, null, (v) => this._input = v);
        this.output("output", Type.Any, null);
    }

    start() {
        const date = new Date(this._input);

        switch(this._type) {
            case "UTCString": this.next("output", date.toUTCString());
            case "ISOString": this.next("output", date.toISOString());
            case "JSON": this.next("output", date.toJSON());
            case "LocaleString": this.next("output", date.toLocaleString());
            case "LocaleDateString": this.next("output", date.toLocaleDateString());
            case "LocaleTimeString": this.next("output", date.toLocaleTimeString());
            default: this.next("output", date);
        }
    }
}