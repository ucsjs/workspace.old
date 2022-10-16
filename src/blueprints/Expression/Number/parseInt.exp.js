($inputs) => {
    return typeof $inputs["value"] === "string" ? parseInt($inputs["value"]) : 0;
};