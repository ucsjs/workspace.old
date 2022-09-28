/*
 * UCS @ucsjs/engine
 * Copyright(c) 2022 Andre Ferreira
 * https://ucsjs.io
 * MIT Licensed
 * 
 * @see https://docs.unity3d.com/Manual/ExecutionOrder.html
 */

import { UcsInterface } from "../interfaces/ucs.interface";
import { Subject } from "rxjs"; 

export class UCS implements UcsInterface{
    private static __updateProfile: Subject<any> = new Subject();

    protected __scope = {};
    protected __fixedFramerate: number = 60
    protected __framerate: number = 0;
    protected __calls: number = 0;
    protected __epoch: number = 0;
    protected __editor: boolean = false;
    protected __pause: boolean = false;
    protected __exit: boolean = false;
    protected __element;

    public timeLifeCycle: number = 0;
    public lifeCycleStep: number = 0;

    private __frameRateReset;
    private __events = { 
        Awake: [], 
        OnEnable: [], 
        Reset: [],
        Start: [], 
        Update: [], 
        LateUpdate: [], 
        OnApplicationPause: [],
        OnApplicationQuit: [],
        OnDisable: [],
        OnDestroy: [],
        OnException: []
    };

    constructor($args?: any){
        for(let key in $args){
            if(typeof $args[key] == "object" && $args[key].id)
                this.Bind(key, $args[key]);
            else
                this[`_${key}`] = $args[key]
        }  
    }

    public OnApplicationStart(): void | Promise<void> {}
    public Bind(key, specs): void {}
    
    public static OnUpdateProfile(c) {
        if(c) this.__updateProfile.subscribe(c);
    }

    public Profile(profile: any) {
        UCS.__updateProfile.next(profile);
    }

    public IsPromise(p) {
        return (typeof p === 'object' && typeof p.then === 'function');
    }

    public Promisify(f: Function, component: Object): Promise<any>{
        return (!this.IsPromise(f)) ? new Promise((resolve) => { f.bind(component).call(); resolve(null); }): null;
    }
    
    public AddComponent(namespace: string, component: UcsInterface) {
        this.__scope[namespace] = component;

        for(let key in this.__events){
            if(typeof component[key] === "function"){
                this.__events[key].push(component[key]);
            }
        }
    }

    public GetComponent(namespace: string) {
        return (this.__scope[namespace]) ? this.__scope[namespace] : null;
    }

    public async Call(eventName: string, debug: boolean = false) {
        if(debug) console.log("Call", eventName, this.__events[eventName].length);

        if(this.__events[eventName] && this.__events[eventName].length > 0){
            let events = [];
            this.__calls += this.__events[eventName].length;

            for(let event of this.__events[eventName])
                events.push((this.IsPromise(event)) ? new event : this.Promisify(event, this));

            await Promise.all(events);
        }

        return true;
    }

    protected async Pause() {
        this.__pause = true;
        this.__frameRateReset.Pause();
        await this.Call("OnApplicationPause");
    }

    private async Exit() {
        this.__exit = true;

        clearInterval(this.__frameRateReset);
        await this.Call("OnApplicationQuit", true);
        await this.Call("OnDisable", true);
        await this.Call("OnDestroy", true);
    }

    private async Exception() {
        await this.Call("OnException", true);            
        this.Exit();
    }

    public StopLifeCycle() {
        this.Exit();
    }

    public async StartLifeCycle() {
        if(process && process.on){
            process.on('exit', this.Exit);
            process.on('SIGINT', this.Exit);
            process.on('SIGUSR1', this.Exit);
            process.on('SIGUSR2', this.Exit);
            process.on('uncaughtException', this.Exception);
        }

        this.OnApplicationStart();
        await this.Call("Awake", true);  
        await this.Call("OnEnable", true); 
        await this.Call("Reset", true);  
        await this.Call("Start", true);  
        this.timeLifeCycle = new Date().getTime();

        this.__frameRateReset = setInterval(async () => {
            if((!this.__pause && !this.__exit)){
                this.lifeCycleStep = new Date().getTime();

                if(this.__framerate <= this.__fixedFramerate){
                    await this.Call("Update");
                    await this.Call("LateUpdate"); 
                    this.__framerate++;
                }

                if(this.lifeCycleStep - this.timeLifeCycle >= 1000){

                    this.Profile({
                        "Calls": this.__calls,
                        "Frames": this.__framerate,
                        "Epoch": this.__epoch,
                        "EpochTime": this.lifeCycleStep
                    });

                    this.timeLifeCycle = new Date().getTime();
                    this.__framerate = 0;
                    this.__calls = 0;
                    this.__epoch++;
                }
            }
        });
    }
}