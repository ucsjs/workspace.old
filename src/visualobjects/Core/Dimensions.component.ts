import { Component } from "../Types/Component.type";

export class Dimensions extends Component {
    protected override __namespace = "Dimensions";
    protected override __importable = false;
    protected override __icon = "fa-solid fa-up-down-left-right";
    protected override __fixed = true;
    
    public _width: number = 240;
    public _widthAuto: boolean = false;
    public _height: number = 240;
    public _heightAuto: boolean = false;
}