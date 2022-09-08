import { Type } from "../enums/types.enum";
import { Blueprint } from "../services";

export class Console extends Blueprint{
    constructor(){
        super();
        this.input("message", Type.String, null, (v) => (v) ? console.log(v) : null);
    }
}