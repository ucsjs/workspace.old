import { BoxVisual } from "./Box.component";

export class ContainerVisual extends BoxVisual {
    //Matadata
    protected override __namespace = "Container";
    protected override __resizable = true;
    protected override __moveble = false;
    protected override __group = "Core";
    protected override __icon = "fa-regular fa-square-full";

    private __transform_widthSufix = "%";
   
    constructor($argv){
        super($argv);

        this._transform._position = "";
        this._transform._width = 100;
        this._transform._height = 200;
        this._transform._left = 0;
        this._transform._top = 0;
        this._transform._display = "flex";
        this._background._color = { a: 1, b: 229, g: 70, r: 79, hex: "#424242" };
    }

    public content(){
        return `<div><slot /></div>`;
    }
}