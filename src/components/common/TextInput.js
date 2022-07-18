import React from "react";
import Proptype from "prop-types";

const TextInput = (props) => {
  let wrapperClass = "form-group";
  if (props.error.length > 0) {
    wrapperClass += " has-error";
  }
  return (
    <div className={wrapperClass}>
      <div className="form-outline mb-4">
        <label htmlFor={props.id} className="c-label">
          {props.label}
        </label>
        <input
          id={props.id}
          type={props.type}
          name={props.name}
          onChange={props.onChange}
          className="form-control"
          value={props.value}
          disabled={props.disable}
        />
      </div>

      {props.error && <div className="alert alert-danger">{props.error}</div>}
    </div>
  );
};

TextInput.propTypes = {
  id: Proptype.string.isRequired,
  name: Proptype.string.isRequired,
  label: Proptype.string.isRequired,
  onChange: Proptype.func.isRequired,
  value: Proptype.string,
  error: Proptype.string,
};

TextInput.defaultProps = {
  error: "",
};

export default TextInput;
