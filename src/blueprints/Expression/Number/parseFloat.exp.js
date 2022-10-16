($inputs) => {
    return typeof $inputs["value"] === "string" ? parseFloat($inputs["value"]) : 0;
};