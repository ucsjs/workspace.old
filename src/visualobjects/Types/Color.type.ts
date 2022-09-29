export class Color {
    public r: number = 0;
    public g: number = 0;
    public b: number = 0;
    public a: number = 1;
    public hex: string = "";

    constructor($argv) {
        this.r = $argv?.r;
        this.g = $argv?.g;
        this.b = $argv?.b;
        this.a = $argv?.a;
        this.hex = $argv.hex;
    }
}