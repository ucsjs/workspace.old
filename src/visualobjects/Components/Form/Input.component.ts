import { Component } from "../../Types/Component.type";

export class Input extends Component {
    protected override __namespace = "Input";
    protected override __icon = "fa-solid fa-i-cursor";
    protected override __fixed = true;
    protected override __importable = false;
     
    public _type: string = "text";
    private __typeHelp = "https://www.w3schools.com/tags/att_input_type.asp";

    public _checked: boolean = false;
    private __checkedHelp = "https://www.w3schools.com/tags/att_input_checked.asp";

    public _disabled: boolean = false;
    private __disabledHelp = "https://www.w3schools.com/tags/att_input_disabled.asp";

    public _maxLength: number = 0;
    private __maxLengthHelp = "https://www.w3schools.com/tags/att_input_maxlength.asp";

    public _minLength: number = 0;
    private __minLengthHelp = "https://www.w3schools.com/tags/att_input_minlength.asp";

    public _multiple: boolean = false;
    private __multipleHelp = "https://www.w3schools.com/tags/att_input_multiple.asp";

    public _name: string = "";
    private __nameHelp = "https://www.w3schools.com/tags/att_input_name.asp";

    public _placeholder: string = "Text...";
    private __placeholderHelp = "https://www.w3schools.com/tags/att_input_placeholder.asp";

    public _readonly: boolean = false;
    private __readonlyHelp = "https://www.w3schools.com/tags/att_input_readonly.asp";

    public _required: boolean = false;
    private __requiredHelp = "https://www.w3schools.com/tags/att_input_required.asp";

    public _value: string = "";
    private __valueHelp = "https://www.w3schools.com/tags/att_input_value.asp";
}