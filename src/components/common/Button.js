import React from "react";

const Button = (props) => {
  let wrapperClass = props.wrapperClass + " parentdiv";
  let buttonClass = "btn btn-primary " + props.buttonClass;
  return (
    <div className={wrapperClass}>
      <button
        type="button"
        name={props.name}
        className={buttonClass}
        onClick={props.buttonClicked}
      >
        {props.value}
      </button>
    </div>
  );
};
export default Button;
