"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
const fs = require("fs");
const path = require("path");
const fg = require("fast-glob");
class Parser {
    constructor(namespace, metadata, resolve, cwd) {
        this._namespace = namespace;
        this._metadata = metadata;
        this._resolve = resolve;
        this._cwd = cwd;
    }
    async export() {
        let scriptText = `// Auto-generated by Blueprint \n
import { Subject } from 'rxjs';
import { Blueprint, Flow } from "@ucsjs/blueprint";\n`;
        let imports = [];
        for (let item of this._metadata.items) {
            if (!imports.includes(item.namespace) && item.namespace != "OutputBlueprint") {
                scriptText += `import { ${item.namespace} } from "${(await this.resolve(item.namespace)).replace(".ts", "")}";\n`;
                imports.push(item.namespace);
            }
        }
        scriptText += `\nexport class ${this._namespace} extends Blueprint {\n`;
        if (this._metadata.items) {
            scriptText += `\texec(args?: any){\n`;
            scriptText += `\t\tconst subject = new Subject<any>();\n\n`;
            scriptText += `\t\tconst flow = new Flow({\n`;
            for (let key in this._metadata.items) {
                const newDefaults = {
                    stateId: new Date().getTime(),
                    itemKey: key,
                };
                let hasInputs = false;
                for (let keyPublicVars in this._metadata.items[key].publicVars) {
                    if (this._metadata.items[key].publicVars[keyPublicVars].value) {
                        newDefaults[this._metadata.items[key].publicVars[keyPublicVars].name] = this._metadata.items[key].publicVars[keyPublicVars].value;
                        hasInputs = true;
                    }
                }
                for (let keyInput in this._metadata.items[key].inputs) {
                    if (this._metadata.items[key].inputs[keyInput].value) {
                        newDefaults[this._metadata.items[key].inputs[keyInput].name] = this._metadata.items[key].inputs[keyInput].value;
                        hasInputs = true;
                    }
                }
                if (this._metadata.items[key].namespace != "OutputBlueprint") {
                    const componentKey = (this._metadata.items[key].componentKey) ? this._metadata.items[key].componentKey : `${this._metadata.items[key].namespace.toLowerCase()}${key}`;
                    scriptText += `\t\t\t"${componentKey}": new ${this._metadata.items[key].namespace}(${(hasInputs) ? JSON.stringify(newDefaults) : ''}),\n`;
                }
            }
            scriptText += `\t\t}, subject, args);\n\n`;
            if (this._metadata.connections) {
                for (let connection of this._metadata.connections) {
                    const input = this.getInput(connection.from.component, connection.from.input);
                    const output = this.getInput(connection.to.component, connection.to.input);
                    if (connection.to.component == "OutputBlueprint")
                        scriptText += `\t\tflow.output("${connection.from.component.toLowerCase()}${connection.from.input.split("-")[1]}", "${input}")\n`;
                    else if (input && output) {
                        const componentFrom = (connection.from.componentKey) ? connection.from.componentKey : `${connection.from.component.toLowerCase()}${connection.from.input.split("-")[1]}`;
                        const componentTo = (connection.to.componentKey) ? connection.to.componentKey : `${connection.to.component.toLowerCase()}${connection.to.input.split("-")[1]}`;
                        scriptText += `\t\tflow.subscribe("${componentFrom}", "${input}", "${componentTo}", "${output}")\n`;
                    }
                }
            }
            scriptText += `\t\tflow.start();\n\n`;
            scriptText += `\t\treturn { flow, subject };\n`;
            scriptText += `\t}\n`;
        }
        scriptText += `}

export default ${this._namespace};\n\n`;
        return scriptText;
    }
    getInput(component, inputId) {
        for (let key in this._metadata.items) {
            const item = this._metadata.items[key];
            if (item.namespace == component) {
                for (let input of item.inputs) {
                    if (`${input.id}-${key}` == inputId) {
                        return input.name;
                    }
                }
                for (let input of item.outputs) {
                    if (`${input.id}-${key}` == inputId) {
                        return input.name;
                    }
                }
            }
            else if (inputId.split("-").length == 3) {
                return inputId;
            }
        }
    }
    async resolve(namespace) {
        for (let key in this._resolve)
            this._resolve[key] = path.resolve(this._resolve[key]);
        const files = await fg(this._resolve, { dot: true, onlyFiles: true });
        for (let file of files) {
            const content = fs.readFileSync(file, "utf-8");
            if (content.indexOf(namespace) > -1) {
                return file.replace(`${this._cwd}/`, "");
            }
        }
        return "";
    }
}
exports.Parser = Parser;
