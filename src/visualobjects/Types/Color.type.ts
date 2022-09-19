export class Color {
    public r: number = 255;
    public g: number = 255;
    public b: number = 255;
    public a: number = 1;
    public hex: string = "#FFFFFF";

    constructor($argv) {
        this.r = $argv.red;
        this.g = $argv.green;
        this.b = $argv.blue;
        this.a = $argv.a;
        this.hex = $argv.hex;
    }
}