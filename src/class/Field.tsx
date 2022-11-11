import Position from "../entities/Position";
import Brush from "./Brush";

class Field {
    public x: number;
    public y: number;

    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public equals(field: Field): boolean {
        return (this.x === field.x) && (this.y === field.y);
    }

    public static fromEvent(e: React.MouseEvent<HTMLCanvasElement>) {
        const rect = e.currentTarget.getBoundingClientRect();
        const mouseX = Math.floor((e.clientX - rect.left) / Brush.FIELD_SIZE);
        const mouseY = Math.floor((e.clientY - rect.top) / Brush.FIELD_SIZE);
        
        return new Field(mouseX, mouseY);
    }

    public wasHit(hits: any[]): boolean {
        return hits.some(hit => hit.field.equals(this));
    }

    public toPosition(fn: (actual: number) => number = actual => actual): Position {
        return ({
            x: fn(this.x * Brush.FIELD_SIZE),
            y: fn(this.y * Brush.FIELD_SIZE)
        });
    }
}

export default Field;