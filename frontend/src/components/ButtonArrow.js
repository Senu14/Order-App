import { BiChevronRight } from "react-icons/bi";
import "./ButtonArrow.css";

function ButtonArrow(props) {

    return(
        <div>
    <button className="button-create">{props.text}
        <div className="icon">
            <BiChevronRight />
        </div>
    </button>
    </div>
    )
    
}

export default ButtonArrow;