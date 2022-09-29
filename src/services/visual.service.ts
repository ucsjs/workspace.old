import * as path from "path";
import * as fs from "fs";
import * as fg from "fast-glob";
import * as ejs from "ejs";
import * as tsc from 'node-typescript-compiler';
import { jsmin } from "jsmin"; 
import { Injectable } from '@nestjs/common';

import { ParserService } from "./parser.service";
import { RegexService } from "./regex.services";

@Injectable()
export class VisualService extends ParserService {
    private pixelAttr = [
        "width", "height", "top", "left", "right", "bottom", 
        "margin-top", "margin-left", "margin-right", "margin-bottom", 
        "padding-top", "padding-left", "padding-right", "padding-bottom", 
        "border-top-width", "border-left-width", "border-right-width", "border-bottom-width", 
        "border-top-left-radius", "border-top-right-radius", "border-bottom-right-radius", "border-bottom-left-radius",
        "font-size"
    ];
    
    constructor(
        public regexService: RegexService
    ){
        super(regexService);
    }

    async getComponents(paths: Array<string> = [], typesPaths: Array<string> = []) {
        let components = [];
        let dependenciesIndex = {};
        let types = await this.loadTypes(typesPaths);

        const files = await fg(paths, { 
            dot: true, 
            onlyFiles: false, 
            deep: 5, 
            caseSensitiveMatch: false,
            followSymbolicLinks: true,
            absolute: true 
        }); 
        
        for(let file of files){
            const component = this.getData(file, "Component", true);

            if(component){
                components.push(component);
                dependenciesIndex[component.namespace] = component;
            }
        }

        for(let key in components)
            components[key] = this.injectDependencies(components[key], dependenciesIndex, types);        
        
        let exportedComponents = [];

        for(let key in components){
            if(components[key].metadata.importable || components[key].extends == "VisualObject" || await this.rootIsVisualObject(components[key].extends, dependenciesIndex)){
                const importModule = components[key].filename.replace(`${process.cwd()}/`, "").replace(".ts", "");
                const builderModule = importModule.replace(".component", ".template");
                const medatadaModule = importModule.replace(".component", ".metadata");
                const editorModule = importModule.replace(".component", ".editor");
                let metadataJson = null;
                
                if(fs.existsSync(path.resolve(`${builderModule}.ejs`)))
                    components[key].template = path.resolve(`${builderModule}.ejs`);

                if(fs.existsSync(path.resolve(`${editorModule}.ejs`)))
                    components[key].editor = path.resolve(`${editorModule}.ejs`);

                if(fs.existsSync(path.resolve(`${medatadaModule}.json`))){
                    try{
                        metadataJson = JSON.parse(fs.readFileSync(path.resolve(`${builderModule}.json`), "utf-8"));
                    }
                    catch(e){}
                }

                if(components[key].extends)
                    components[key] = await this.injectRootDependencies(components[key], dependenciesIndex);
                
                exportedComponents.push({
                    namespace: components[key].namespace,
                    extends: components[key].extends,
                    sign: components[key].sign,
                    metadata: (metadataJson) ? { ...metadataJson, ...components[key].metadata } : components[key].metadata,
                    components: components[key].components,
                    template: components[key].template,
                    editor: components[key].editor,
                    content: components[key].content,
                    componentsDefaults: components[key]?.componentsDefaults,
                });
            } 
        }

        return exportedComponents;
    }

    async rootIsVisualObject(extendsType: string, dependenciesIndex){
        let result = false;

        if(extendsType == "VisualObject")
            return true;
        
        const dependencyExtends = (dependenciesIndex[extendsType]?.extends) ? await this.rootIsVisualObject(dependenciesIndex[extendsType].extends, dependenciesIndex) : false;

        if(dependencyExtends)
            return true;

        return false;
    }

    async injectRootDependencies(component, dependenciesIndex){
        if(component?.extends){
            const rootDepentencies = await this.injectRootDependencies(dependenciesIndex[component.extends], dependenciesIndex);
            let newComponent = { ...component };

            if(rootDepentencies){
                if(rootDepentencies?.editor)
                    newComponent.editor = { ...rootDepentencies?.editor, ...component?.editor };

                if(rootDepentencies?.components){
                    newComponent.components = [ ...rootDepentencies?.components, ...component?.components];
                    newComponent.components = [...new Map(newComponent.components.map(item => [item["component"], item])).values()];
                }
                    
                if(rootDepentencies?.componentsDefaults){
                    newComponent.componentsDefaults = [ ...rootDepentencies?.componentsDefaults, ...component?.componentsDefaults ];
                    newComponent.componentsDefaults = [...new Map(newComponent.componentsDefaults.map(item => [`${item["component"]}-${item["property"]}`, item])).values()];
                }    
            }

            return newComponent;
        }
        else {
            return component;
        }
    }

    async getSubcomponents(paths: Array<string> = [], typesPaths: Array<string> = []){
        const components = [];
        const exportedComponents = [];
        let dependenciesIndex = {};
        let types = await this.loadTypes(typesPaths);

        const files = await fg(paths, { 
            dot: true, 
            onlyFiles: false, 
            deep: 5, 
            caseSensitiveMatch: false,
            followSymbolicLinks: true,
            absolute: true 
        });

        for(let file of files){
            const component = this.getData(file, "UCS", true);

            if(component && (component.extends == "UCS" || component.extends == "Component")){
                components.push(component);
                dependenciesIndex[component.namespace] = component;
            }   
        }

        for(let key in components)
            components[key] = this.injectDependencies(components[key], dependenciesIndex, types);

        for(let key in components){
            const importModule = components[key].filename.replace(`${process.cwd()}/`, "").replace(".ts", "");
            const builderModule = importModule.replace(".component", ".template");
            const medatadaModule = importModule.replace(".component", ".metadata");
            const editorModule = importModule.replace(".component", ".editor");
            let metadataJson = null;

            if(fs.existsSync(path.resolve(`${builderModule}.ejs`)))
                components[key].template = path.resolve(`${builderModule}.ejs`);

            if(fs.existsSync(path.resolve(`${editorModule}.ejs`)))
                components[key].editor = path.resolve(`${editorModule}.ejs`);

            if(fs.existsSync(path.resolve(`${medatadaModule}.json`))){
                try{
                    metadataJson = JSON.parse(fs.readFileSync(path.resolve(`${builderModule}.json`), "utf-8"));
                }
                catch(e){}
            }

            let metadata = (metadataJson) ? { ...metadataJson, ...components[key].metadata } : components[key].metadata;

            if(components[key].extends == "UCS"){
                metadata.namespace = components[key].namespace;
                metadata.group = "Scripts";
                metadata.icon = "fa-solid fa-code";
            }

            if((!metadata.importable && typeof metadata.importable !== "boolean") || metadata.importable === true) {
                exportedComponents.push({
                    filename: components[key].filename,
                    namespace: components[key].namespace,
                    extends: components[key].extends,
                    sign: components[key].sign,
                    metadata: metadata,
                    components: components[key].components,
                    template: components[key].template,
                    editor: components[key].editor,
                    content: components[key].content,
                    componentsDefaults: components[key]?.componentsDefaults,
                    properties: components[key]?.publicVars,
                    default: this.generateDefault(components[key]?.publicVars, types)
                }); 
            }
        }

        return exportedComponents;
    }

    async loadTypes(typesPaths: Array<string> = []){
        const types = {};

        const files = await fg(typesPaths, { 
            dot: true, 
            onlyFiles: false, 
            deep: 5, 
            caseSensitiveMatch: false,
            followSymbolicLinks: true,
            absolute: true 
        });

        for(let file of files){
            const contents = fs.readFileSync(path.resolve(file), "utf-8");
            const typeName = this.regexService.getData(/class (.*?) {/gms, contents, ["name"], true)[0]?.name.trim();
            const publicVars = this.regexService.getData(/public (.*?):[\s](.*?)[\s]= (.*?);/gms, contents, ["name", "type", "value"], true);

            for(let publicVar of publicVars){
                if(!types[typeName])
                    types[typeName] = { default: {} };
            
                switch(publicVar.type){
                    case "Int":
                    case "int":
                    case "number":
                    case "Number":
                        publicVar.value = parseInt(publicVar.value);
                        break;
                    case "Float":
                    case "float":
                        publicVar.value = parseFloat(publicVar.value);
                        break;
                    case "Boolean":
                    case "boolean":
                    case "Bool":
                    case "bool":
                        publicVar.value = (publicVar.value === "true");
                        break;
                    case "object":
                        try{
                            let dataParsed = {};
                            const items = publicVar.value?.replace(/}/, "").replace(/{/, "").split(",");
                            
                            if(items){
                                for(let i of items){
                                    const [key, value] = i?.trim().split(":");
        
                                    if(value){
                                        if(value.trim() === "true" || value.trim() === "false")
                                            dataParsed[key.trim()] = (value.trim() === "true");
                                        else if(!isNaN(parseInt(value.trim())))
                                            dataParsed[key.trim()] = parseInt(value.trim());
                                        else
                                            dataParsed[key.trim()] = value.trim();
                                    }   
                                }
                            }
    
                            publicVar.value = dataParsed;
                        }
                        catch(e){}                    
                    break;
                }

                types[typeName].default[publicVar.name] = publicVar.value
            }
        }

        return types
    }

    injectDependencies(component: any, dependenciesIndex: any, types: any){
        if(component.extends != "Component"){
            const parent = dependenciesIndex[component.extends];

            if(!component.components)
                    component.components = [];

            if(parent){
                for(let key in parent.publicVars){
                    if(dependenciesIndex[parent.publicVars[key].type]){
                        const metadata = {};
                        const ignore = ["namespace", "icon", "fixed", "importable"];

                        for(let keyMetadata in dependenciesIndex[parent.publicVars[key].type].metadata){
                            if(!ignore.includes(keyMetadata))
                                metadata[keyMetadata] = dependenciesIndex[parent.publicVars[key].type].metadata[keyMetadata];
                        }

                        for(let keyPublicVar of dependenciesIndex[parent.publicVars[key].type].publicVars){
                            if(dependenciesIndex[keyPublicVar.type])
                                keyPublicVar.editor = dependenciesIndex[keyPublicVar.type].editor;
                        }

                        component.components.push({
                            component: parent.publicVars[key].type,
                            fixed: dependenciesIndex[parent.publicVars[key].type].metadata.fixed || false,
                            icon: dependenciesIndex[parent.publicVars[key].type].metadata.icon,
                            sign: dependenciesIndex[parent.publicVars[key].type].sign,
                            properties: dependenciesIndex[parent.publicVars[key].type].publicVars,
                            default: this.generateDefault(dependenciesIndex[parent.publicVars[key].type].publicVars, types),
                            metadata: metadata,                          
                        });

                        if(dependenciesIndex[parent.publicVars[key].type].editor){
                            if(!component.editor)
                                component.editor = {};
    
                            component.editor[parent.publicVars[key].type] = dependenciesIndex[parent.publicVars[key].type].editor;
                        }
                    }
                }
            }

            for(let key in component.publicVars){
                if(dependenciesIndex[component.publicVars[key].type]){
                    component.components.push({
                        component: component.publicVars[key].type,
                        fixed: dependenciesIndex[component.publicVars[key].type].metadata.fixed || false,
                        icon: dependenciesIndex[component.publicVars[key].type].metadata.icon,
                        sign: dependenciesIndex[component.publicVars[key].type].sign,
                        properties: dependenciesIndex[component.publicVars[key].type].publicVars,
                        default: this.generateDefault(dependenciesIndex[component.publicVars[key].type].publicVars, types),
                        metadata: dependenciesIndex[component.publicVars[key].type].metadata
                    })

                    if(dependenciesIndex[component.publicVars[key].type].editor){
                        if(!component.editor)
                            component.editor = {};

                        component.editor[component.publicVars[key].type] = dependenciesIndex[component.publicVars[key].type].editor;
                    }
                }
            }
        }

        return component;
    }

    generateDefault(list, types){
        let defaultObject = {};

        for(let key in list){
            if(types[list[key].type] && types[list[key].type].default && !list[key].default)
                defaultObject[list[key].name] = types[list[key].type].default;
            else
                defaultObject[list[key].name] = list[key].default;            

            if(defaultObject[list[key].name]?.default)
                defaultObject[list[key].name] = defaultObject[list[key].name].default;

            if(typeof defaultObject[list[key].name] == "object" && defaultObject[list[key].name]['default'] !== undefined)
                defaultObject[list[key].name] = defaultObject[list[key].name]['default'];
        }

        return defaultObject;
    }

    uppercaseFirstLetter(string: string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

    async parse(item, namespace): Promise<string>{
        const metadata = JSON.parse(item.content);
        let result = ""; 

        const dirname = path.dirname(item.filename);
        const basename = path.basename(item.filename, ".ts");

        //Create 
        result +=`import { Module, Controller, Get, Header, StreamableFile } from "@nestjs/common";
import { readFileSync } from 'fs';

@Controller("${namespace}-page")
class ${this.uppercaseFirstLetter(namespace)}PageController {
    @Get()
    @Header('Content-Type', 'text/html')
    async index(){
        return readFileSync('${dirname}/${basename}.html', "utf8");
    }
}

@Module({
    controllers: [${this.uppercaseFirstLetter(namespace)}PageController],
})
export class LazyModule {}`;


        return result;
    }

    async parseTemplate(item, namespace, paths: Array<string> = [], typesPaths: Array<string> = []): Promise<string>{
        let dependenciesIndex = {};
        let types = await this.loadTypes(typesPaths);

        const files = await fg(paths, { 
            dot: true, 
            onlyFiles: false, 
            deep: 5, 
            caseSensitiveMatch: false,
            followSymbolicLinks: true,
            absolute: true 
        });
        
        for(let file of files){
            const component = this.getData(file, "Component", true);

            if(component)
                dependenciesIndex[component.namespace] = component;
        }

        const metadata = JSON.parse(item.content);

        let injection = {
            meta: [],
            css: [],
            scripts: [],
            jsond: []
        };

        const bodyStyle = await this.getStyle(metadata.body, dependenciesIndex, ["width", "height", "z-index"]);

        let result = `<!-- Auto-generated by UCS.js (@see https://ucsjs.io) -->
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <title>${metadata.title}</title>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <meta http-equiv="Content-Security-Policy" content="default-src *;img-src * 'self' data: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' *; style-src  'self' 'unsafe-inline' *">
                    <script src="/@ucsjs/engine/engine.min.js"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.min.js"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/7.5.7/rxjs.umd.min.js"></script>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css">
                </head>
                <body class="Body">
                    <script>
                        define("@ucsjs/engine/engine.min", ["require", "exports"], function(require, exports) {
                            exports.UCS = UCS;
                            exports.Application = Application;
                        });
                    </script>
                    ${await this.build(metadata.hierarchy, 2, dependenciesIndex)}
                    ${bodyStyle}
                </body>
            </html>`; 

        return result;
    }

    async getStyle(component, dependenciesIndex, ignoreStyles = []){
        let result = "";
        let styles = {};

        for(let subComponent of component.components){
            const componentData: any = subComponent.value;
            
            for(let keyComponent in componentData){
                for(let property of dependenciesIndex[subComponent.component].publicVars){
                    if(componentData[property.name] && property.changeStyle){
                        if(typeof componentData[property.name] == "object" && componentData[property.name].hex){
                            styles[property.changeStyle?.style] = componentData[property.name].hex;
                        }                                       
                        else if(typeof componentData[property.name] == "object" && componentData[property.name].src !== undefined){
                            if(componentData[property.name].src)
                                styles[property.changeStyle?.style] = `url(${componentData[property.name].src})`;
                        }                                      
                        else if(
                            (this.pixelAttr.includes(property.changeStyle?.style) && typeof componentData[property.name] == "number") ||
                            (this.pixelAttr.includes(property.changeStyle?.style) && !componentData[property.name].includes("px"))
                        ) {
                            styles[property.changeStyle?.style] = this.returnValueWithSuffix(property.name, componentData[property.name]);
                        }
                        else
                            styles[property.changeStyle?.style] = componentData[property.name];
                    }
                }
            }   
        }

        let styleRemoveNulls = {};

        for(let key in styles){
            if(styles[key] && !ignoreStyles.includes(key))
                styleRemoveNulls[key] = styles[key]
        }

        const template = ejs.render(`
            <style>
            .${component.namespace} {<% if(style) { for(let keyStyle in style){ %>
                <%= keyStyle %>: <%= style[keyStyle] %>; <% } } %>
            }
            </style>`, {
            id: component.namespace,
            style: (styleRemoveNulls) ? styleRemoveNulls : {},
            styleId: component.namespace  
        });

        return template;
    }

    async build(hierarchy, tabsCount = 2, dependenciesIndex = {}, onlyStyle = false){
        let result = "";
        let tabs = "";
        
        for(let i = 0; i < tabsCount; i++)
            tabs += "\t";
        
        for(let component of hierarchy){
            const subComponents = (!onlyStyle) ? await this.build(component.hierarchy, tabsCount+1, dependenciesIndex) : "";
            const componentData: any = this.getComponentData(component);

            if(component.template || onlyStyle){
                const raw = (component.template) ? fs.readFileSync(component.template, "utf8") : "";
                let styles = {};

                for(let keyComponent in componentData){
                    if(dependenciesIndex[keyComponent]){
                        for(let property of dependenciesIndex[keyComponent].publicVars){
                            if(componentData[keyComponent][property.name] && property.changeStyle){
                                if(typeof componentData[keyComponent][property.name] == "object" && componentData[keyComponent][property.name].hex){
                                    styles[property.changeStyle?.style] = componentData[keyComponent][property.name].hex;
                                }                                       
                                else if(typeof componentData[keyComponent][property.name] == "object" && componentData[keyComponent][property.name].src !== undefined){
                                    if(componentData[keyComponent][property.name].src)
                                        styles[property.changeStyle?.style] = `url(${componentData[keyComponent][property.name].src})`;
                                }                                      
                                else if(
                                    typeof componentData[keyComponent][property.name] == "number" ||
                                    (this.pixelAttr.includes(property.changeStyle?.style) && !componentData[keyComponent][property.name].includes("px"))
                                ) {
                                    styles[property.changeStyle?.style] = this.returnValueWithSuffix(property.name, componentData[keyComponent]);
                                }
                                else
                                    styles[property.changeStyle?.style] = componentData[keyComponent][property.name];
                            }
                        }
                    }
                }   

                let styleRemoveNulls = {};

                for(let key in styles){
                    if(styles[key])
                        styleRemoveNulls[key] = styles[key]
                }
                
                const template = ejs.render(`${raw}
                    <style>
                    .${component.id} {<% if(style) { for(let keyStyle in style){ %>
                        <%= keyStyle %>: <%= style[keyStyle] %>; <% } } %>
                    }
                    </style>`, {
                    id: component.id,
                    slot: subComponents,
                    style: (styleRemoveNulls) ? styleRemoveNulls : {},
                    styleId: component.id,
                    ...componentData   
                });

                const lines = template.split("\n");

                for(let line of lines)
                    result += tabs + line + "\n";
            }
            else{
                result += `${tabs}<div ref="${component.id}">${subComponents}</div>\n`;
            }

            if(!onlyStyle && component.components.length > 0){
                for(let subComponent of component.components){
                    if(fs.existsSync(subComponent.filename)){//Script
                        const bundleFile = subComponent.filename.replace(path.basename(subComponent.filename), "bundle.js");
                        const requirePath = subComponent.filename
                            .replace(process.cwd() + "/src/", "")
                            .replace(process.cwd() + "\\src\\", "")
                            .replace(".ts", "");

                        await tsc.compile({
                            "module": "amd",
                            "moduleResolution": "Node",                                
                            "removeComments": true,
                            "preserveConstEnums": true,
                            "sourceMap": false,
                            "target": "ES6",
                            "watch": false,
                            "allowJs": false,
                            "allowUmdGlobalAccess": true,
                            "allowSyntheticDefaultImports": true,
                            outFile: bundleFile
                        }, [subComponent.filename], {
                            verbose: false
                        });

                        result += `<script>${fs.readFileSync(bundleFile, "utf8")}
        require(["${requirePath}"], ({ ${subComponent.namespace} }) => {
            const ${subComponent.namespace.toLowerCase()} = new ${subComponent.namespace}(${JSON.stringify(subComponent.value)});
            ${subComponent.namespace.toLowerCase()}.Start();
        });                            
    </script>\n`;

                        fs.unlinkSync(bundleFile);
                    }
                }
            }
        }

        return result;
    }

    getComponentData(component){
        let result = {};

        for(let key in component.components)
            result[component.components[key].component] = component.components[key].value;
        
        return result;
    }

    returnValueWithSuffix(namespace, data){
        const sufix = data[`${namespace}Sufix`] || 'px';
        const lengths = ["px", "cm", "mm", "in", "pt", "pc", "em", "ex", "ch", "rem", "vw", "vh", "vmin", "vmax", "%"]

        if(data[namespace] != undefined){
            if(lengths.includes(sufix))
                return `${data[namespace]}${sufix}`;
            else
                return sufix;
        }
        else if(lengths.includes(sufix))
            return `0${sufix}`;
        else{
            return null;
        }
    }
}
