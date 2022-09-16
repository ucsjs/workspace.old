import { Component } from "./Component";

export class Transform extends Component{
    protected override __namespace = "Transform";
    protected override __fixed = true;

    public _top: number = 0;
    public _left: number = 0;
}