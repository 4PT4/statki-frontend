import Brush from "./Brush"

class Field {
    public x: number
    public y: number

    constructor(x: number, y:number){
        this.x = x
        this.y = y
    }

    equals(field: Field): boolean{
        return (this.x === field.x && this.y === field.y)
    }

    public static fromEvent(e: React.MouseEvent<HTMLCanvasElement>){
        let offsetX = e.currentTarget.offsetLeft
        let offsetY = e.currentTarget.offsetTop
        let mouseX = Math.floor((e.clientX - offsetX)/Brush.FIELD_SIZE)
        let mouseY = Math.floor((e.clientY - offsetY)/Brush.FIELD_SIZE)
        return new Field(mouseX, mouseY)
    }

    public wasHit(hits: Field[]): boolean{
        return hits.some(hit =>hit.equals(this))
    }
    
}

export default Field
