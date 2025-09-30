import React from 'react';
/**
 * Компонент навигационного меню
 */
export default function NavMenu({ className, items, ...props }) {
  return <nav className={className}>{props.children(items)}</nav>;
}
