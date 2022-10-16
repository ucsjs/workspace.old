($inputs) => {
    return typeof $inputs["value"] === "number" ? $inputs["value"].toString() : "";
};