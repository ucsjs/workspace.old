export class Flow {
    private _scope: any;

    constructor(scope){
        this._scope = scope;
    }

    subscribe(from, output, to, input){
        if(!this._scope[from])
            throw new Error(`Flow: ${from} is already subscribed.`);

        if(!this._scope[to])
            throw new Error(`Flow: ${from} is already subscribed.`);

        console.log(`Flow: ${from} -> ${output} is subscribed to ${to} -> ${input}.`);

        this._scope[from].subscribe(output, this._scope[to].assign(input));
        return this;
    }

    start(){
        for(const key in this._scope){
            if(this._scope[key].start){
                console.log(`Flow: ${key} is started.`);
                this._scope[key].start();
            }                
        }
    }
}