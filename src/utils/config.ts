declare global {
    interface BigInt {
      toJSON(): number | string;
    }
}
export const defaultConfig = () =>{
    BigInt.prototype.toJSON = function (): number | string {
        const int = Number.parseInt(this.toString());
        return Number.isNaN(int) ? this.toString() : int;
    };
}