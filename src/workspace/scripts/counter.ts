import { UCS } from "@ucsjs/engine";
import { Content } from "../../visualobjects/Core/Content.component";

class Counter extends UCS {
    private state = 0;
    public _timeout: number = 1000;
    public _increment: number = 1;
    public contentComponent: Content;

    Start(){
        this.state = 0;
        this.contentComponent = this.GetComponent("Content") as Content;
        setInterval(() => { this.state += this._increment }, this._timeout);
    }

    Update(){
        //this.contentComponent?._content.content = this.state.toString();
    }
}  