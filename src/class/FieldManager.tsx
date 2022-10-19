import Brush from "./Brush"
import Field from "./Field"
class FieldManager {

    public static shoot(field: Field, brush: Brush) {
        brush.drawX(field)
    }
    
}

export default FieldManager