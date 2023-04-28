import React from "react";
import "./Button.css";

function Button({ name = "Button", className = "", ...rest }) {
  return (
    <button className={`button__container ${className}`} data-testid="button" {...rest}>
      {name}
    </button>
  );
}

export default Button;
