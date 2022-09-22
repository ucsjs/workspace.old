import * as gis from "g-i-s";
import { Injectable } from '@nestjs/common';

@Injectable()
export class ImagesService {
	constructor(){}

    public async getGoogleImages(s: string) {
        return new Promise((resolve, reject) => {
            gis(s, (error, results) => {
                if(error) reject(error);
                else resolve(results)
            });
        })
    }
}
