exports.default = async ($metadata, $blueprint, $itemKey, $moduleInjection, $stateId, $context, $connections) => {
    let $input = "";
    
    for(let publicVar of $metadata.publicVars){
        try{
            switch(publicVar.name){
                case "input":
                    $input = publicVar.value || publicVar.default;
                break;                
            }
        }
        catch(e){}
    }

    if($input){
        const componentKey = ($metadata.metadata.componentKey) ? $metadata.metadata.componentKey : `${$metadata.metadata.namespace.toLowerCase()}${$itemKey}`;

        return {
            flows: [`this.subscribe("${$input}", (v) => { flow.get("${componentKey}").next("output", v) })`]
        };
    }   
    else{
        return null;
    }
};