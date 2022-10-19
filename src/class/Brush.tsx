import React from "react";
import Field from "./Field";

class Brush {
    private context: CanvasRenderingContext2D;
    public static readonly BOARD_SIZE = 400
    public static readonly FIELD_COUNT = 10
    public static readonly FIELD_SIZE = Brush.BOARD_SIZE/Brush.FIELD_COUNT

    constructor(context: CanvasRenderingContext2D){
        this.context = context
    }
    public static fromEvent(e: React.MouseEvent<HTMLCanvasElement>){
        let context = e.currentTarget.getContext('2d')
        if(context != null){
            return new Brush(context)
        }
        throw new Error("contex dosent exist");
        
        
    }

    convertField(field: Field): Position{

        return {x: field.x*Brush.FIELD_SIZE, y: field.y*Brush.FIELD_SIZE}
    }

    drawX(field: Field){
        
        this.context.beginPath();

        const {x, y} = this.convertField(field);
        this.context.moveTo(x, y);
        this.context.lineTo(x + Brush.FIELD_SIZE, y + Brush.FIELD_SIZE);
        this.context.moveTo(x + Brush.FIELD_SIZE, y);
        this.context.lineTo(x, y + Brush.FIELD_SIZE);
        this.context.stroke();

        return this;
    }

    
}

interface Position {
    x: number,
    y: number
}

export default Brush