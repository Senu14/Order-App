import "./Button.css";

function Button(props) {

    return(
        <div>
        <button className="generalButton">{props.text}</button>
      </div>
    )
    
}

export default Button;