import { Component } from "../Types/Component.type";
import { Color } from "../Types/Color.type";

export class Background extends Component{
    //Matadata
    protected override __namespace = "Background";
    protected override __group = "Core";
    protected override __icon = "fa-solid fa-paint-roller";

    public _color: Color;
}