import { Component } from "../Types/Component.type";
import { Transform } from "./Transform.component";
import { Class } from "./Class.component";

export class VisualObject extends Component {
    //Matadata
    protected override __namespace = "VisualObject";
    protected override __importable = false;
    protected __resizable = false;
    protected __moveble = false;
    protected __opened = false;

    //Private scope
    protected scope = {
        components: []
    };
    
    public _class: Class;
    public _transform: Transform;

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