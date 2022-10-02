import * as fs from "fs";
import * as jsonwebtoken from "jsonwebtoken";
import { Logger } from "@nestjs/common";
import { Blueprint, Type } from "@ucsjs/blueprint";
import { JWTTypes } from "./JWTTypes.enum";

export class JWTSignBlueprint extends Blueprint{
    //Metadata
    private __namespace = "JWT Sign";
    private __group = "JWT";
    private __headerColor = "#000000";
    private __headerIcon = "./public/icons/jwt.png";
    private __algorithm = ["HS256", "HS384", "HS512", "RS256", "RS384", "RS512", "ES256", "ES384", "ES512", "PS256", "PS384", "PS512", "none"];
    private __help = "https://www.npmjs.com/package/jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback";

    public _secret: string = "";
    public _algorithm: string = "HS256";
    public _expiresIn: number = 86000;
    private privateKey = null;

    constructor(metadata?: any){
        super();
        this.setup(metadata);

        this.event("error");

        this.input("privateKey", JWTTypes.PrivateKey, null, (privateKey) => {
            this.privateKey = privateKey;
        });

        this.input("input", Type.Any, null, (input: any) => {
            if(input){
                Logger.log(`Recive input, generating token...`, "JWTSignBlueprint");
                const secretOrPrivateKey = (this.privateKey !== null) ? fs.readFileSync('private.key') : this._secret;
                let token = null;

                if(typeof secretOrPrivateKey == "string") {
                    token = jsonwebtoken.sign(input, secretOrPrivateKey, { 
                        expiresIn: this._expiresIn
                    });
                }
                else {
                    token = jsonwebtoken.sign(input, secretOrPrivateKey, { 
                        algorithm: this._algorithm as any,
                        expiresIn: this._expiresIn
                    });
                }

                if(token){
                    Logger.log(`Send token: ${token}`, "JWTSignBlueprint");
                    this.next("token", token);
                }
                else{
                    Logger.error(`Error generating token`, "JWTSignBlueprint");
                    this.trigger("error");
                }
            }            
        });

        this.output("token", Type.String, null);       
    }
}