import React from 'react';
import { getMinutesWords } from '../../../api/helpers';
import styles from './FilmInfo.module.css';
/**
 * Компонент информации о фильме элемента списка фильмов
 */
export default function FilmInfo({ item }) {
  const {
    movieId,
    movieTitle,
    movieDescription,
    movieDuration,
    moviePoster,
    movieOrigin,
  } = item;
  const minuteString = movieDuration
    ? `${movieDuration} минут${getMinutesWords(movieDuration)}`
    : '';

  return (
    <div className={styles.info}>
      <div className={styles.poster}>
        <img
          className={styles.poster_image}
          alt={movieTitle + ' постер'}
          src={moviePoster}
        />
      </div>
      <div className={styles.text}>
        <h2 className={styles.title}>{movieTitle}</h2>
        <p className={styles.description}>{movieDescription}</p>
        <p className={styles.data}>
          <span>{minuteString}</span>
          <span> </span>
          <span>{movieOrigin}</span>
        </p>
      </div>
    </div>
  );
}
