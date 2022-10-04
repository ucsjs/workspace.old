($inputs) => {
    if(typeof $inputs["num1"] === "number" && typeof $inputs["num2"] === "number") 
        return $inputs["num1"] % $inputs["num2"];
    else
        return undefined;
};