import { BehaviorSubject } from 'rxjs';

import { Type } from '../enums/types.enum';
import { Input } from "../interfaces/input.interface";
import { Output } from "../interfaces/output.interface";

export class Blueprint {    
    
    protected root: {};
    protected _stateId: string = "";
    protected _itemKey: string = "";
    protected _inputs: Input<any>[] = [];
    protected _output: Output<any>[] = [];

    setup(metadata: any){
        if(metadata){
            for(const key in metadata){
                if(this.hasOwnProperty(`_${key}`))
                    this[`_${key}`] = metadata[key];
            }
        }
    }

    input(key: string, type: any, startValue: any, next?){
        if(!this._inputs.find(input => input.key === key)){
            const subject = new BehaviorSubject(startValue);

            if(next)
                subject.subscribe(next);

            this._inputs.push({key, type, value: subject});

            return subject;
        }
        else{
            return null;
        }
    }

    output(key: string, type: any, startValue: any, next?){
        if(!this._output.find(output => output.key === key)){
            const subject = new BehaviorSubject(startValue);

            if(next)
                subject.subscribe(next);

            this._output.push({key, type, value: subject});
        }
    }
    
    subscribe(key: string, callback: (value: any) => void){
        const output = this._output.find(output => output.key === key);

        if(output)
            output.value?.subscribe(callback);
    }

    unsubscribe(key: string){
        const output = this._output.find(output => output.key === key);

        if(output)
            output.value?.unsubscribe();
    }

    assign(key: string){
        return (value: any) => {
            const input = this._inputs.find(input => input.key === key);

            if(input)
                input.value?.next(value);
        }
    }

    next(key: string, value: any){
        const output = this._output.find(output => output.key === key);

        if(output)
            output.value?.next(value);
    }

    error(context, message){
        
    }
}

export class Global {
    public static blueprints: any[] = [];
    public static indexBlueprints: any = {};

    public static register(blueprint: any){
        if(!this.blueprints.find(blueprintExist => blueprintExist.constructor.name === blueprint.constructor.name)){
            this.blueprints.push(blueprint);
            this.indexBlueprints[blueprint.constructor.name] = this.blueprints.length-1;
        } 
    }

    public static getBlueprint(name: string){
        return (this.indexBlueprints[name]) ? this.blueprints[this.indexBlueprints[name]] : null;
    }
}