import GameHitmark from "./GameHitmark";
import Orientation from "../Orientation";
import Position from "./Position";
import GameField from "./GameField";
import GameWarship from "./GameWarship";
import { GameState } from "../../propTypes";

class Brush {
    private context: CanvasRenderingContext2D;
    public static readonly BOARD_SIZE: number = 400;
    public static readonly FIELD_COUNT: number = 10;
    public static readonly FIELD_SIZE: number = Brush.BOARD_SIZE / Brush.FIELD_COUNT;

    public constructor(context?: CanvasRenderingContext2D | null) {
        if (!context)
            throw new Error("Context doesn't exist");

        this.context = context;
    }

    public drawX(field: GameField): Brush {
        const { x, y }: Position = field.toPosition();
        this.context.strokeStyle = "orange";
        this.context.lineWidth = 4;
        this.context.beginPath();
        this.context.moveTo(x, y);
        this.context.lineTo(x + Brush.FIELD_SIZE, y + Brush.FIELD_SIZE);
        this.context.moveTo(x + Brush.FIELD_SIZE, y);
        this.context.lineTo(x, y + Brush.FIELD_SIZE);
        this.context.stroke();

        return this;
    }

    public drawGrid = () => {
        for (let i = 0; i < Brush.FIELD_COUNT; i++) {
            for (let j = 0; j < Brush.FIELD_COUNT; j++) {
                const { x, y }: Position = new GameField(i, j).toPosition();
                this.context.strokeRect(x, y, Brush.FIELD_SIZE, Brush.FIELD_SIZE);
            }
        }
        return this;
    }

    public markHits(hitmarks: GameHitmark[]) {
        hitmarks.forEach(h => {
            if (h.wasHit)
                this.drawX(h.field);
            else
                this.drawCircle(h.field);

            this.resetBrush();
        });

        return this;
    }

    public drawCircle = (field: GameField): Brush => {
        const { x, y }: Position = field.toPosition((actual: number) => {
            return actual += Brush.FIELD_SIZE / 2;
        });
        this.context.beginPath();
        this.context.arc(x, y, 3, 0, 2 * Math.PI);
        this.context.fill();
        return this;
    }

    private resetBrush = () => {
        this.context.lineWidth = 1;
        this.context.strokeStyle = "black";
        this.context.fillStyle = "black";
        this.context.globalAlpha = 1;
    }

    public drawShip = (warship?: GameWarship | null, highlight: boolean = false): Brush => {
        if (!warship)
            return this;

        for (let i = 0; i < warship.length; i++) {
            let { position: { x, y } } = warship;
            if (warship.orientation === Orientation.HORIZONTAL) {
                x += i;
            } else {
                y += i;
            }

            this.fillField(new GameField(x, y), highlight);
        }

        return this;
    }

    public fillField(field: GameField, highlight: boolean = false) {
        if (!field)
            return this;

        const { x, y }: Position = field.toPosition();
        if (highlight) {
            this.context.fillStyle = "rgb(191, 118, 40)";
            this.context.globalAlpha = 0.5;
        }
        this.context.fillRect(x, y, Brush.FIELD_SIZE, Brush.FIELD_SIZE);
        this.resetBrush();

        return this;
    }

    public clearBoard = () => {
        this.context.clearRect(0, 0, Brush.BOARD_SIZE, Brush.BOARD_SIZE);
        this.drawGrid();

        return this;
    }

    public drawWarships = (warships: GameWarship[]) => {
        warships.forEach(warship => {
            this.drawShip(warship);
        });

        return this;
    }

    public drawMoveShip = (x: number, y: number, warship: GameWarship) => {
        this.context.strokeStyle = "rgb(2, 53, 72)";
        this.context.lineWidth = 5;
        let x1 = 0, y1 = x1

        switch (warship.orientation) {
            case Orientation.HORIZONTAL:
                x1 += (warship.length * Brush.FIELD_SIZE);
                y1 = Brush.FIELD_SIZE;
                break;

            case Orientation.VERTICAL:
                y1 += (warship.length * Brush.FIELD_SIZE);
                x1 = Brush.FIELD_SIZE;
                break;
        }

        this.context.strokeRect(x, y, x1, y1);
        this.context.strokeStyle = "black";
        this.context.lineWidth = 1;

        return this;
    }

    public drawHitmarks = (hitmarks: GameHitmark[]) =>{
        hitmarks.forEach(element => {
            if(element.wasHit){
                this.drawX(element.field);
            }else{
                this.drawCircle(element.field);
            }
        });
        this.resetBrush();
    } 
}

export default Brush;