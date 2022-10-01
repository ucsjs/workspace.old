import { Component } from "../../Types/Component.type";
import { Transform } from "../Style/Transform.component";
import { Class } from "../Style/Class.component";
import { Margin } from "../Style/Margin.component";

export class CoreObject extends Component {
    //Matadata
    protected override __namespace = "CoreObject";
    protected override __importable = false;
    protected __static = false;
    protected __resizable = false;
    protected __moveble = false;
    protected __opened = false;
    protected __removeClass = false;
    protected __removeTransform = false;
    protected __sufixs = {};

    //Private scope
    protected scope = {
        components: []
    };
        
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