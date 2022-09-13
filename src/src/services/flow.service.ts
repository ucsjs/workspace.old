import { Subject } from 'rxjs';

export class Flow {
    private _scope: any;
    private _subject: Subject<any>;

    constructor(scope, subject?: Subject<any>){
        this._scope = scope;
        this._subject = subject;
    }

    subscribe(from, output, to, input){
        if(!this._scope[from])
            throw new Error(`Flow: ${from} is already subscribed.`);

        if(!this._scope[to])
            throw new Error(`Flow: ${from} is already subscribed.`);

        if(this._scope[from])
            this._scope[from].subscribe(output, this._scope[to].assign(input));

        return this;
    }

    output(component: string, output: string){
        if(this._scope[component])
            this._scope[component].subscribe(output, (v) => this._subject.next(v));

        return this;
    }

    start(){
        for(const key in this._scope){
            if(this._scope[key].start)
                this._scope[key].start();              
        }
    }
}