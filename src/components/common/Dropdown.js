import React from "react";
import Proptype from "prop-types";

const Dropdown = (props) => {
  let wrapperClass = "form-group";
  if (props.error.length > 0) {
    wrapperClass += " has-error";
  }
  let selectStyle = props.style;
  let options = props.options;
  return (
    <div className={wrapperClass}>
      <label htmlFor={props.id} className="c-label">
        {props.label}
      </label>
      <div className="field">
        <select
          id={props.id}
          name={props.name}
          value={props.value}
          className="form-control"
          style={selectStyle}
          onChange={props.onChange}
        >
          <option value=""> Select </option>
          {options.map((option) => {
            return <option value={option.id}>{option.name}</option>;
          })}
        </select>
      </div>
      {props.error && <div className="alert alert-danger">{props.error}</div>}
    </div>
  );
};

Dropdown.propTypes = {
  id: Proptype.string.isRequired,
  name: Proptype.string.isRequired,
  label: Proptype.string.isRequired,
  onChange: Proptype.func.isRequired,
  options: Proptype.object.isRequired,
  value: Proptype.string,
  error: Proptype.string,
};

Dropdown.defaultProps = {
  error: "",
};

export default Dropdown;
