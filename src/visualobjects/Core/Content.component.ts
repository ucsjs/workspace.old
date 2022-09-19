import { Component } from "../Types/Component.type";
import { BigText } from "../Interfaces/BigText.interface";

export class Content extends Component{
    protected override __namespace = "Content";
    protected override __icon = "fa-solid fa-align-justify";
    
    public _content: BigText;
}