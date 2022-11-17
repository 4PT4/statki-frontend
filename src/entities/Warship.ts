import Orientation from "./Orientation";

export default interface Warship {
    id: string;
    x: number;
    y: number;
    length: number;
    orientation: Orientation;
}