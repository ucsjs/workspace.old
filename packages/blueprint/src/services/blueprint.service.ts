import { BehaviorSubject, Subject } from 'rxjs';

import { Type } from '../enums/types.enum';
import { Input } from "../interfaces/input.interface";
import { Output } from "../interfaces/output.interface";

export class Blueprint {    
    
    protected root: {};
    protected _stateId: string = "";
    protected _itemKey: string = "";
    protected _inputs: Input<any>[] = [];
    protected _output: Output<any>[] = [];
    protected _events = [];

    constructor(){}

    setup(metadata: any){
        if(metadata){
            for(const key in metadata){
                if(this.hasOwnProperty(`_${key}`))
                    this[`_${key}`] = metadata[key];
                else if (key == "args"){
                    if(Array.isArray(metadata[key])){
                        let keys = Object.keys(metadata[key]);
                        console.log(keys);
                    }
                }
            }
        }
    }

    input(key: string, type: any, startValue: any = null, next?){
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

    output(key: string, type: any, startValue: any = null, next?){
        if(!this._output.find(output => output.key === key)){
            const subject = new BehaviorSubject(startValue);

            if(next)
                subject.subscribe(next);

            this._output.push({key, type, value: subject});
        }
    }

    event(name: string){
        if(!this._events.find(event => event.name === name)){
            this._events.push({ name, subject: new Subject() });
        }
    }
    
    subscribe(key: string, callback: (value: any) => void){
        const input = this._inputs.find(input => input.key === key);
        const output = this._output.find(output => output.key === key);
        const event = this._events.find(event => event.key === key);

        if(input)
            input.value?.subscribe(callback);

        if(output)
            output.value?.subscribe(callback);

        if(event)
            event.subject.subscribe(callback);
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

    trigger(key: string){
        const event = this._events.find(event => event.key === key);

        if(event)
            event.subject.next(true);
    }

    get(key: string){
        const input = this._inputs.find(input => input.key === key);

        if(input)
            return input.value?.value;
        else
            return null;
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