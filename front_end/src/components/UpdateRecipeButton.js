import React from "react";

const UpdateRecipeButton = props => {
  return <button onClick={props.updateRecipe}>Update</button>;
  return (
    <div className="form-group">
      <label htmlFor={props.name}>{props.title}</label>
      <select
        name={props.name}
        value={props.value}
        onChange={props.handlechange}
      >
        <option value=" " disabled>
          {props.placeholder}
        </option>
        {props.options.map(option => {
          return (
            <option key={option} value={option} label={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default UpdateRecipeButton;
