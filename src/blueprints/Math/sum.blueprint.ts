import { BehaviorSubject } from 'rxjs';
import { Blueprint, Type } from "@ucsjs/blueprint";

export class SumBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Sum";
    private __type = "Math";

    private nums: any = {};

    constructor(){
        super();
        this.input("num1", Type.Float, null, (v) => this.parse(v, "num1", this));
        this.input("num2", Type.Float, null, (v) => this.parse(v, "num2", this));
        this.output("result", Type.Float, null);
    }

    parse(v, name, scope){
        scope.nums[name] = v;
        
        if(scope.nums.num1 && scope.nums.num2){
            const result = scope.nums.num1 + scope.nums.num2;
            scope.next("result", result);
        }
    }
}