exports.default = async ($metadata, $blueprint) => {
    let $module = "";
    let $time = "";
  
    for(let publicVar of $metadata.publicVars){
        try{
            switch(publicVar.name){
                case "time":
                    $time = publicVar.value || publicVar.default;
                break;
            }
        }
        catch(e){}
    }

    if($time){
        $module += `
@Injectable()
export class ${$blueprint}Scheduling {
    @Cron(CronExpression.${$time})
    handleCron() {
        new ${$blueprint}().exec();
    }
}\n`;

        return {
            extras: [$module],
            imports: [
                `import { Injectable } from "@nestjs/common";`,
                `import { Cron, CronExpression } from '@nestjs/schedule';`
            ],
            providers: [`${$blueprint}Scheduling`]
        };
    }   
    else{
        return null;
    }
};