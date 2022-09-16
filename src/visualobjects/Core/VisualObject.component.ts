import { Component } from "./Component";
import { Transform } from "./Transform.component";

export class VisualObject extends Component{
    //Matadata
    protected override __namespace = "VisualObject";

    //Private scope
    protected scope = {
        components: []
    };
    
    public _position: Transform;

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