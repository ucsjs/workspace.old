($inputs) => {
    if(typeof $inputs["num1"] === "number" && typeof $inputs["num2"] === "number") 
        return $inputs["num1"] ** $inputs["potency"];
    else
        return undefined;
};