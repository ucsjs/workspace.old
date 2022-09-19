"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const parser_service_1 = require("../../../src/services/parser.service");
(async () => {
    let metadata = fs.readFileSync("src/.helloworld.blueprint.meta", "utf-8");
    metadata = JSON.parse(metadata);
    const parser = new parser_service_1.Parser("HelloworldBlueprint", metadata, [
        "../../../../src/blueprints/**/*.blueprint.ts"
    ], path.resolve("../../../../"));
    fs.writeFileSync("src/helloworld.blueprint.ts", await parser.export());
})();
