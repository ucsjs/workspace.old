exports.default = async ($metadata, $blueprint, $itemKey, $moduleInjection, $stateId, $context, $connections) => {
    let $name = "";
    
    for(let publicVar of $metadata.publicVars){
        try{
            switch(publicVar.name){
                case "name":
                    $name = publicVar.value || publicVar.default;
                break;                
            }
        }
        catch(e){}
    }

    if($name){
        const componentKey = ($metadata.componentKey) ? $metadata.componentKey : `${$metadata.namespace.toLowerCase()}${$itemKey}`;

        return {
            flows: [`\t\tflow.get("${componentKey}").subscribe("input", (v) => {
            Logger.log("Ouput ${componentKey} to ${$name}", "${$metadata.namespace}")
            this.next("${$name}", v); 
        });\n\n`]
        };
    }   
    else{
        return null;
    }
};