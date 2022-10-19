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

    public static fromEvent(e: React.MouseEvent<HTMLCanvasElement>, tileSize: number){
        let offsetX = e.currentTarget.offsetLeft
        let offsetY = e.currentTarget.offsetTop
        let mouseX = Math.floor((e.clientX - offsetX)/tileSize)
        let mouseY = Math.floor((e.clientY - offsetY)/tileSize)
        return new Field(mouseX, mouseY)
    }
    
}

export default Field
