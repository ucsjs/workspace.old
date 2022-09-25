exports.default = async ($metadata) => {
    let $settings = { 
        table: "",
        columns: [],
        indices: [],
        uniques: []
    };

    for(let publicVar of $metadata.publicVars)
        $settings[publicVar.name] = publicVar.value || publicVar.default;
    
    if($settings.table){
        const collectionClassName = $settings.table.charAt(0).toUpperCase() + $settings.table.slice(1).toLowerCase();
        let fields = "";

        if(Array.isArray($settings.columns)){
            for(let $item of $settings.columns){
                const type = $item.type || "String";
                const primary = $item.primary || false;
                const index = $item.index || false;
                const required = $item.required || false;
                const unique = $item.unique || false;
                const nullable = $item.nullable || false;
                let typeInterface= "";
    
                switch(type){
                    case "String": 
                    case "Number": 
                    case "Boolean": 
                        typeInterface = type.toLocaleLowerCase();
                    break;
                    case "Mixed":
                        typeInterface = "any";
                    break;
                    default:
                        typeInterface = type;
                    break;
                }
    
                if(primary)
                    fields += `\n\t@PrimaryGeneratedColumn()
    ${$item.name}: ${typeInterface};\n`;     
                else
                    fields += `\n\t@Column({ unique: ${unique}, nullable: ${nullable} })
    ${$item.name}: ${typeInterface};\n`;            
            }
        }

        return {
            imports: [
                `import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";`
            ],
            constructors: [{
                injection: `${collectionClassName}Entity`
            }],
            extras: [`\n\n@Entity()
export class ${collectionClassName}Entity {${fields}};\n\n`]
        };
    }   

    return {};
};