import React from "react";
import Orientation from "../entities/Orientation";
import Position from "../entities/Position";
import Field from "./Field";
import Warship from "./Warship";

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

    public static fromEvent(e: React.MouseEvent<HTMLCanvasElement>): Brush {
        const context: CanvasRenderingContext2D | null = e.currentTarget.getContext('2d');
        return new Brush(context);
    }

    public drawX(field: Field): Brush {
        const { x, y }: Position = field.toPosition();
        this.context.strokeStyle = "rgb(2, 53, 72)";
        this.context.lineWidth = 5;
        this.context.beginPath();
        this.context.moveTo(x, y);
        this.context.lineTo(x + Brush.FIELD_SIZE, y + Brush.FIELD_SIZE);
        this.context.moveTo(x + Brush.FIELD_SIZE, y);
        this.context.lineTo(x, y + Brush.FIELD_SIZE);
        this.context.stroke();
        
        this.restore();
        return this;
    }

    public drawGrid = () => {
        for (let i = 0; i < Brush.FIELD_COUNT; i++) {
            for (let j = 0; j < Brush.FIELD_COUNT; j++) {
                const { x, y }: Position = new Field(i, j).toPosition();
                this.context.strokeRect(x, y, Brush.FIELD_SIZE, Brush.FIELD_SIZE);
            }
        }
        return this;
    }

    public markHits = (hits: any[])=>{
        hits.forEach(hit=>{
            if(hit.hit){
                this.drawX(hit.field);
                return this;
            }else{
                this.drawCircle(hit.field);
                this.restore();
            }
            
            return this;
        })
    }

    public drawCircle = (field: Field): Brush => {
        const { x, y }: Position = field.toPosition((actual: number) => {
            return actual += Brush.FIELD_SIZE / 2;
        });
        this.context.beginPath();
        this.context.arc(x, y, 3, 0, 2 * Math.PI);
        this.context.fill();
        return this;
    }

    private restore = ()=>{
        this.context.lineWidth = 1;
        this.context.strokeStyle = "black";
        this.context.fillStyle = "black";
        this.context.globalAlpha = 1;
    }

    public clearElement = (field: Field): Brush => {
        const { x, y }: Position = field.toPosition((actual: number) => {
            return actual += Brush.FIELD_SIZE / 4;
        });

        this.context.clearRect(x, y, Brush.FIELD_SIZE / 2, Brush.FIELD_SIZE / 2);

        return this;
    }

    public drawShip = (warship: Warship) => {
        for (let i = 0; i < warship.length; i++) {
            let { position: { x, y } } = warship;
            if (warship.orientation === Orientation.HORIZONTAL) {
                x += i;
            } else {
                y += i;
            }

            this.fillShip(new Field(x, y), null);
        }
    }

    public fillShip = (field: Field, move: boolean | null)=>{
        const { x, y }: Position = field.toPosition();
        if(move){
            this.context.fillStyle = "rgb(191, 118, 40)";
            this.context.globalAlpha = 0.5;
        }
        this.context.fillRect(x, y, Brush.FIELD_SIZE, Brush.FIELD_SIZE);
        this.restore();
        return this;
    }

    public clearBoard = () => {
        this.context.clearRect(0, 0, Brush.BOARD_SIZE, Brush.BOARD_SIZE);
        this.drawGrid();
        
        return this;
    }

    public drawWarships = (warships: Warship[], ship: Warship | null)=>{
        warships.forEach(warship => {  
            if(warship !== ship)
            this.drawShip(warship);
        });

        return this;
    }

    public drawMoveShip = (x: number, y: number, warship: Warship) => {
        this.context.strokeStyle = "rgb(2, 53, 72)";
        this.context.lineWidth = 5;
        let x1 = 0, y1 = x1

        switch (warship.orientation) {
            case Orientation.HORIZONTAL:
                x1 += (warship.length*Brush.FIELD_SIZE);
                y1 = Brush.FIELD_SIZE;
                break;

            case Orientation.VERTICAL:
                y1 += (warship.length*Brush.FIELD_SIZE);
                x1 = Brush.FIELD_SIZE;
                break;
        }

        this.context.strokeRect(x, y, x1, y1);
        this.context.strokeStyle = "black";
        this.context.lineWidth = 1;

        return this;
    }
}

export default Brush;