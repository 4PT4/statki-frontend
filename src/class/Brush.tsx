import React from "react";
import Field from "./Field";

class Brush {
    private context: CanvasRenderingContext2D;
    public static readonly BOARD_SIZE = 400
    public static readonly FIELD_COUNT = 10
    public static readonly FIELD_SIZE = Brush.BOARD_SIZE / Brush.FIELD_COUNT

    public constructor(context: CanvasRenderingContext2D | null) {

        if (context) {
            this.context = context
        } else {
            throw new Error("contex dosent exist");
        }

    }
    public static fromEvent(e: React.MouseEvent<HTMLCanvasElement>) {
        let context = e.currentTarget.getContext('2d')

        return new Brush(context)

    }

    private convertField(field: Field): Position {

        return { x: field.x * Brush.FIELD_SIZE, y: field.y * Brush.FIELD_SIZE }
    }

    public drawX(field: Field, hit: boolean) {
        if(hit){
            this.context.strokeStyle = "red"
        }
        this.context.beginPath();

        const { x, y } = this.convertField(field);
        this.context.moveTo(x, y);
        this.context.lineTo(x + Brush.FIELD_SIZE, y + Brush.FIELD_SIZE);
        this.context.moveTo(x + Brush.FIELD_SIZE, y);
        this.context.lineTo(x, y + Brush.FIELD_SIZE);
        this.context.stroke();
        this.context.strokeStyle = "black"
        return this;
    }
    public drawGrid = () => {
        for (let i = 0; i < Brush.FIELD_COUNT; i++) {
            for (let j = 0; j < Brush.FIELD_COUNT; j++) {
                const field = new Field(i, j)
                const { x, y } = this.convertField(field)
                this.context.strokeRect(x, y, Brush.FIELD_SIZE, Brush.FIELD_SIZE)
            }
        }
    }

    public drawCircle = (field: Field): Brush => {
        const { x, y } = this.convertField(field)
        this.context.beginPath()
        this.context.arc(x + (Brush.FIELD_SIZE / 2), y + (Brush.FIELD_SIZE / 2), 3, 0, 2 * Math.PI);
        this.context.arc(x + (Brush.FIELD_SIZE / 2), y + (Brush.FIELD_SIZE / 2), 3, 0, 2 * Math.PI);
        this.context.fill()
        this.context.stroke()
        return this
    }

    public clearElement = (field: Field) : Brush => {
        const { x, y } = this.convertField(field)
        this.context.clearRect(x+(Brush.FIELD_SIZE/4), y+(Brush.FIELD_SIZE/4), Brush.FIELD_SIZE/2, Brush.FIELD_SIZE/2)
        return this
    }



}

interface Position {
    x: number,
    y: number
}

export default Brush