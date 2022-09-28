export class Range {
    public min?: number = -10;
    public max?: number = 10;
    public step?: number = 0.1;
    public default?: number = 1;

    constructor($argv) {
        this.min = $argv?.min;
        this.max = $argv?.max;
        this.step = $argv?.step;
        this.default = $argv?.default;
    }
}