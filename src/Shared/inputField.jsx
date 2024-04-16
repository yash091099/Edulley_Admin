import React from "react";

const InputField = ({ label, name, value, onChange , placeholder }) => (
    <div className="col-md-6 formField">
      <label>{label}</label>
      <input type="text" name={name} value={value} onChange={onChange} placeholder={placeholder} />
    </div>
  );

  export default InputField;