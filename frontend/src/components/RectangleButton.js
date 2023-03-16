import "./RectangleButton.css";

function RectangleButton(props) {

    return(
        <button className="rectangle-button" type="submit">{props.text}</button>
    )
    
}

export default RectangleButton;