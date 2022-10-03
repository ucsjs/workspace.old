import * as firebase from 'firebase-admin';
import { Blueprint, Type } from "@ucsjs/blueprint";
import { FirebaseTypes } from "./firebaseTypes.enum";

export class FirebaseInitBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Firebase Init";
    private __group = "Google";
    private __headerIcon = "./public/icons/firebase.png";
    private __headerColor = "#b28910";    
    private __help = "https://firebase.google.com/docs/web/setup";

    private _settings;

    constructor(metadata?: any){
        super();

        this.setup(metadata);
        this.input("settings", Type.JSON, null, (v) => this.run(v, this));
        this.output("state", FirebaseTypes.FirebaseState, null);
    }

    start(){
        if(typeof this._settings == "object")
            this.run(this._settings, this);            
    }

    run(settings, scope){        
        if(settings){
            firebase.initializeApp({ credential: firebase.credential.cert(settings) });
            scope.next("state", firebase);
        }
    }
}