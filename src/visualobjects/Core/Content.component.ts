import { Component } from "../Types/Component.type";
import { BigText } from "../Interfaces/BigText.interface";

export class Content extends Component {
    protected override __namespace = "Content";
    protected override __icon = "fa-solid fa-align-justify";
    protected override __fixed = true;
    protected override __importable = false;
    
    public _content: BigText;
}