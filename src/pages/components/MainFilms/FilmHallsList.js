import React from 'react';
/**
 * Компонент информации о сеансах элемента списка фильмов
 */
export default function FilmHallsList({ className, halls, ...props }) {
  return <>{props.children(halls)}</>;
}
