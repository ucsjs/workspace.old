($inputs) => {    
    return typeof $inputs["value"] === "number" ? $inputs["value"].toExponential($inputs["fractionDigits"]) : "";
};