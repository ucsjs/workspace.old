(() => { 
    try {
        let valuesScope = {};
        let funcByBlueprint = {};
        let connectionValues = {};

		funcByBlueprint["IntExpBlueprint"] = ($inputs) => {
    return parseInt($inputs["value"]);
};
		valuesScope["IntExpBlueprint::1664902011113_result"] = funcByBlueprint["IntExpBlueprint"]({"value": 5});
		valuesScope["IntExpBlueprint::1664902013309_result"] = funcByBlueprint["IntExpBlueprint"]({"value": 3});
		valuesScope["IntExpBlueprint::1664902018046_result"] = funcByBlueprint["IntExpBlueprint"]({"value": 20});
		funcByBlueprint["MulExpBlueprint"] = ($inputs) => {
    return $inputs["num1"] * $inputs["num2"];
};
		funcByBlueprint["GreaterThanEqualExpBlueprint"] = ($inputs) => {
    if(typeof $inputs["elem1"] === "number" && typeof $inputs["elem2"] === "number") 
        return $inputs["elem1"] >= $inputs["elem2"];
    else 
        return undefined;
};;

		if(!connectionValues["MulExpBlueprint::1664902036294"]){
                    connectionValues["MulExpBlueprint::1664902036294"] = {};
                }


		if(!connectionValues["MulExpBlueprint::1664902036294"]){
                    connectionValues["MulExpBlueprint::1664902036294"] = {};
                }


		if(!connectionValues["GreaterThanEqualExpBlueprint::1664922114351"]){
                    connectionValues["GreaterThanEqualExpBlueprint::1664922114351"] = {};
                }


		if(!connectionValues["GreaterThanEqualExpBlueprint::1664922114351"]){
                    connectionValues["GreaterThanEqualExpBlueprint::1664922114351"] = {};
                }


		if(!connectionValues["OutputExpBlueprint::1664902141195"]){
                    connectionValues["OutputExpBlueprint::1664902141195"] = {};
                }

 
        let count = 0;
        let persist = setInterval(() => {

		if(valuesScope["IntExpBlueprint::1664902011113_result"] !== undefined){
                connectionValues["MulExpBlueprint::1664902036294"]["num1"] = valuesScope["IntExpBlueprint::1664902011113_result"];
            }

		if(valuesScope["IntExpBlueprint::1664902013309_result"] !== undefined){
                connectionValues["MulExpBlueprint::1664902036294"]["num2"] = valuesScope["IntExpBlueprint::1664902013309_result"];
            }

		if(valuesScope["MulExpBlueprint::1664902036294_result"] !== undefined){
                connectionValues["GreaterThanEqualExpBlueprint::1664922114351"]["elem2"] = valuesScope["MulExpBlueprint::1664902036294_result"];
            }

		if(valuesScope["IntExpBlueprint::1664902018046_result"] !== undefined){
                connectionValues["GreaterThanEqualExpBlueprint::1664922114351"]["elem1"] = valuesScope["IntExpBlueprint::1664902018046_result"];
            }

		if(valuesScope["GreaterThanEqualExpBlueprint::1664922114351_result"] !== undefined){
                connectionValues["OutputExpBlueprint::1664902141195"]["input"] = valuesScope["GreaterThanEqualExpBlueprint::1664922114351_result"];
            }

		if(connectionValues["MulExpBlueprint::1664902036294"] !== undefined){
                        valuesScope["MulExpBlueprint::1664902036294_result"] = funcByBlueprint["MulExpBlueprint"](connectionValues["MulExpBlueprint::1664902036294"]);
                    }

		if(connectionValues["OutputExpBlueprint::1664902141195"]["input"] || connectionValues["OutputExpBlueprint::1664902141195"]["input"] === false){
                        clearInterval(persist);
                        resolve({result: connectionValues["OutputExpBlueprint::1664902141195"]["input"], valuesScope, connectionValues});
                    }
		if(connectionValues["GreaterThanEqualExpBlueprint::1664922114351"] !== undefined){
                        valuesScope["GreaterThanEqualExpBlueprint::1664922114351_result"] = funcByBlueprint["GreaterThanEqualExpBlueprint"](connectionValues["GreaterThanEqualExpBlueprint::1664922114351"]);
                    }
		
        count++;
        if(count > 10){
            clearInterval(persist);
            reject("Timeout");
        }
    }, 100);
	} 
        catch(e){
            console.log(e);
        }
    })