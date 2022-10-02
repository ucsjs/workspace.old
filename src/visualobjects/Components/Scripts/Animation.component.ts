import { Component } from "../../Types/Component.type";
import { BigText } from "../../Interfaces/BigText.interface";

export class Animation extends Component {
    protected override __group = "Animation";
    protected override __namespace = "Animation";
    protected override __icon = "fa-solid fa-play";
    protected override __fixed = false;
    protected override __importable = true;
    protected override __script = true;
    
    public _entrance: string;
    private __entranceHelp = "https://animate.style/";

    public _exit: string;
    private __exitHelp = "https://animate.style/";
    
    constructor(){
        super();
    }
}