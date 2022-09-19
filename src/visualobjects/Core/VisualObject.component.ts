import { Component } from "../Types/Component.type";
import { Transform } from "./Transform.component";
import { Dimensions } from "./Dimensions.component";

export class VisualObject extends Component{
    //Matadata
    protected override __namespace = "VisualObject";
    protected override __importable = false;
    protected __resizable = false;
    protected __moveble = false;

    //Private scope
    protected scope = {
        components: []
    };
    
    public _position: Transform;
    public _dimensions: Dimensions;

    constructor($argv){
        super();

        if($argv){
            for(const key in $argv){
                if(this.hasOwnProperty(`_${key}`))
                    this[`_${key}`] = $argv[key];
            }
        }
    }

    getComponent<T>(componentName: string): T|null{
        return this.scope.components.find(component => component.__namespace === componentName) as T;
    }
}