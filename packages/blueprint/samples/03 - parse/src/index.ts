import * as fs from "fs";
import * as path from "path";
import { Parser } from "../../../src/services/parser.service";

(async () => {
    let metadata = fs.readFileSync("src/.helloworld.blueprint.meta", "utf-8");
    metadata = JSON.parse(metadata);

    const parser = new Parser("HelloworldBlueprint", metadata, [
        "../../../../src/blueprints/**/*.blueprint.ts"
    ], path.resolve("../../../../"));

    fs.writeFileSync("src/helloworld.blueprint.ts", await parser.export());
})();