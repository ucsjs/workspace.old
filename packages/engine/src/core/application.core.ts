import { UCS } from "./ucs.core";

export class Application extends UCS {
    private static __instance: Application;
    private static __binded = [];

    public override OnApplicationStart(): void | Promise<void> {}

    async Quit(){
        await this.StopLifeCycle();

        if(process && process.exit)
            process.exit(1);
    }

    public static Bind(namespace, component){
        this.__binded.push({ namespace, component });
    }

    public static Start(){
        if(!this.__instance){
            this.__instance = new Application();

            for(let bind of Application.__binded)
                this.__instance.AddComponent(bind.namespace, bind.component);
            
            this.__instance.StartLifeCycle();
        }
    }
}