import React from "react";

const CheckBox = props => {
  return (
    <div>
      <label htmlFor={props.name} className="form-label">
        {props.title}
      </label>
      <div className="checkbox-group">
        {props.options.map(option => {
          return (
            <label key={option}>
              <input
                id="custom-checkbox"
                id={props.name}
                name={props.name}
                onChange={props.handlechange}
                value={option}
                checked={props.selectedOptions.indexOf(option) > -1}
                type="checkbox"
              />
              {option}
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default CheckBox;
