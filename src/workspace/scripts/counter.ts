import { UCS } from "@ucsjs/engine/engine.min";
import { Content } from "../../visualobjects/Components/Content.component";

export class Counter extends UCS {
    private __Help = "https://www.w3schools.com/jsref/met_win_setinterval.asp";
    
    private state = 0;
    public _timeout: number = 1000;
    public _increment: number = 1;
    public _content: Content = new Content();

    Bind(key, specs){
        if(specs.id){
            try{
                setInterval(() => {
                    if(this._content?._text.content)
                        document.querySelector(`*[ref=${specs.id}]>[ref=${specs.propertyType}_${specs.propertyName}]`).innerHTML = this._content?._text.content;
                }, this._timeout);
            }
            catch(e){}            
        }
    }

    Start(){
        this.state = 0;

        setInterval(() => { 
            this.state += this._increment;
            this._content._text.content = this.state.toString();
        }, this._timeout);
    }
}  