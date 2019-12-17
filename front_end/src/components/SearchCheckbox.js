import React from "react";

const SearchCheckbox = ({ label, isSelected, onCheckboxChange }) => (
    createCheckbox = option => (
        <SearchCheckbox
          label={option}
          checked={this.state.checkboxes[option]}
          onChange={this.handleCheckboxChange}
          key={option}
        />
      );
  
  
  <div className="checkbox-group">
    <label>
      <input
        type="checkbox"
        name={label}
        checked={isSelected}
        onChange={onCheckboxChange}
        className="form-check-input"
      />
      {label}
    </label>
  </div>
);

export default SearchCheckbox;
