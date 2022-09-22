import * as fs from "fs";
import * as fg from "fast-glob";
import * as path from "path";
export class DocsService {
    constructor(){}

    async getDocsStrutucture(){
        let strutucture = {
            index: "",
            navbar: []
        };

        const filesAndDirsIndex = await fg(path.resolve("./docs/*"), { dot: false, onlyFiles: false });

        for(let fileOrDir of filesAndDirsIndex){
            let basename = path.basename(fileOrDir);
            let [indexRaw, nameRaw] = basename.split("-");
            let index = parseInt(indexRaw.trim());
            let name = (nameRaw.includes(".")) ? nameRaw.split(".")[0].trim() : nameRaw.trim();
            const isDir = fs.lstatSync(fileOrDir).isDirectory();

            if(index == 1)
                strutucture.index = fs.readFileSync(fileOrDir, "utf8");
            
            strutucture.navbar[index-1] = {
                filename: fileOrDir,
                uri: "/docs/" + encodeURIComponent(fileOrDir.replace(process.cwd(), "").replace("/docs/", "").replace(/\\/g, "/")),
                isDir,
                index: index,
                name: name,
                children: []
            };

            if(isDir){
                const filesChildren = await fg(`${fileOrDir}/*.html`, { dot: false, onlyFiles: true });
                
                for(let children of filesChildren){
                    let basenameChildren = path.basename(children);
                    let [indexRawChildren, nameRawChildren] = basenameChildren.split("-");
                    let indexChildren = parseInt(indexRawChildren.trim());
                    let nameChildren = (nameRawChildren.includes(".")) ? nameRawChildren.split(".")[0].trim() : nameRawChildren.trim();

                    strutucture.navbar[index-1].children.push({
                        filename: children,
                        uri: "/docs/" + encodeURIComponent(children.replace(process.cwd(), "").replace("/docs/", "").replace(/\\/g, "/")),
                        name: nameChildren
                    })
                }
            }
        }

        return strutucture;
    }
   
}
