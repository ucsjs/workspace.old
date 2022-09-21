import { Component } from "../Types/Component.type";
import { BigText } from "../Interfaces/BigText.interface";
import { Color } from "../Types/Color.type";

export class Input extends Component {
    protected override __namespace = "Input";
    protected override __icon = "fa-solid fa-i-cursor";
    protected override __fixed = true;
    protected override __importable = false;
     
    public _type: string = "text";
    public _checked: boolean = false;
    public _disabled: boolean = false;
    public _maxLength: number = 0;
    public _minLength: number = 0;
    public _multiple: boolean = false;
    public _name: string = "";
    public _placeholder: string = "Text...";
    public _readonly: boolean = false;
    public _required: boolean = false;
    public _value: string = "";
}