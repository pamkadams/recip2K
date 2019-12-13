import React from "react";
const TextArea = props => (
  <div className="form-group">
    <label className="form-label">{props.title}</label>
    <textarea
      id="form-control"
      name={props.name}
      type={props.inputType}
      rows={props.rows}
      cols={props.cols}
      value={props.value}
      onChange={props.handlechange}
      placeholder={props.placeholder}
      {...props}
    />
  </div>
);

export default TextArea;
