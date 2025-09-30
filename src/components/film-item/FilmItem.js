import React from 'react';
/**
 * Компонент элемента списка фильмов
 */
export default function FilmItem({ className, ...props }) {
  return <section className={className}>{props.children}</section>;
}
