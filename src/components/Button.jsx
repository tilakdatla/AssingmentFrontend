import React from "react";

function Button(props) {
  const handleClick = () => {
    if (props.check) {
      props.handleChange();
    }
    
    if (props.delete) {
      props.deleteItem(props.index);
    }
    
    if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <button onClick={handleClick} className={props.className}>
      {props.name}
    </button>
  );
}

export default Button;