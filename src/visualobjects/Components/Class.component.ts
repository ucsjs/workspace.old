import { Component } from "../Types/Component.type";
import { BigText } from "../Interfaces/BigText.interface";

export class Class extends Component {
    protected override __namespace = "Class";
    protected override __icon = "fa-solid fa-paintbrush";
    protected override __fixed = true;
    protected override __importable = false;
    
    public _content: BigText;

    constructor(){
        super();
        this._content = { content: '' };
    }
}