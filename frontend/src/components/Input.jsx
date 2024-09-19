import React from "react";

const Input = ({ label, id, error, ...props }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} />
      <div className="control-error">{error && <p>{error}</p>}</div>
    </div>
  );
};

export default Input;
