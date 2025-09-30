import React from 'react';
/**
 * Компонент элемента меню
 */
export default function MenuListItem(props) {
  return <li className={props.className}>{props.children}</li>;
}
