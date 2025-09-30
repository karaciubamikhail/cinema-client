import React from 'react';
/**
 * Компонент списка фильмов
 */
export default function FilmList({ className, items, ...props }) {
  return <main className={className}>{props.children(items)}</main>;
}
