import { UCS } from "../../../src/core/ucs.core";
import { Application } from "../../../src/core/application.core";

class LifeCycle extends UCS {
    private counter: number = 0;

    Start(){
        this.counter = 0;
    }

    Update(){
        this.counter++;
    }
}

(() => {
    Application.Bind(new LifeCycle());

    Application.OnUpdateProfile((profile) => {
        console.clear();
        console.table(profile)
    })

    Application.Start();
})();