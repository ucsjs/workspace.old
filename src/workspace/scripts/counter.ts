/*import { UCS } from "@ucsjs/engine";
import { Content } from "../../visualobjects/Core/Content.component";

class Counter extends UCS {
    public state = 0;
    public contentComponent: Content;

    Start(){
        this.state = 0;
        this.contentComponent = this.GetComponent("Content") as Content;
        setInterval(() => { this.state++ }, 1000);
    }

    Update(){
        this.contentComponent?._content.content = this.state.toString();
    }
}  */