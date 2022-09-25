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
                    fields += `\n\t@Column({ required: ${required}, index:${index}, unique: ${unique} })
        ${$item.name}: ${typeInterface};\n`;            
            }
        }

        return {
            imports: [
                `import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";`
            ],
            constructors: [{
                injection: `${collectionClassName}Table`
            }],
            extras: [`@Entity()
export class ${collectionClassName}Entity {${fields}};`]
        };
    }   

    return {};
};