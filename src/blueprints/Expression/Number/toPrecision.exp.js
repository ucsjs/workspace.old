($inputs) => {    
    return typeof $inputs["value"] === "number" ? $inputs["value"].toPrecision($inputs["precision"]) : "";
};