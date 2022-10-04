($inputs) => {
    if(typeof $inputs["num1"] === "number" && typeof $inputs["num2"] === "number") 
        return ($inputs["num2"] * 100) / $inputs["num1"];
    else
        return undefined;
};