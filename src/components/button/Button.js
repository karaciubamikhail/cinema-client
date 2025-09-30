import React from 'react';
/**
 * Компонент кнопка
 */
export default function Button({ className, name, disabled, handler }) {
  const onButtonClick = (evt) => {
    evt.preventDefault();
    if (disabled) return;
    if (handler) handler();
  };
  return (
    <button disabled={disabled} className={className} onClick={onButtonClick}>
      {name}
    </button>
  );
}
