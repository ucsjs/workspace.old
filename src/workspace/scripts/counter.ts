import { UCS } from "@ucsjs/engine/engine.min";
import { Content } from "../../visualobjects/Components/Content.component";

export class Counter extends UCS {    
    private state = 0;
    public _timeout: number = 1000;
    public _increment: number = 1;
    public _content: Content = new Content();

    Start(){
        this.state = 0;

        setInterval(() => { 
            this.state += this._increment;
            this._content._text.content = this.state.toString();
        }, this._timeout);
    }
}  