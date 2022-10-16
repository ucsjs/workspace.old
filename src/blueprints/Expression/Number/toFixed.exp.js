($inputs) => {    
    return typeof $inputs["value"] === "number" ? $inputs["value"].toFixed($inputs["digits"]) : "";
};