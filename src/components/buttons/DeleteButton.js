import React from "react";

export function DeleteButton({ onClickHandler }) {
  return (
    <button type="button" className="btn btn-danger" onClick={onClickHandler}>
      Delete
    </button>
  );
}
