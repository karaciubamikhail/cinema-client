import React from 'react';
import { useSelector } from 'react-redux';
import LoaderWithBg from '../../../components/loader/LoaderWithBg';
import FilmList from '../../../components/film-list/FilmList';
import FilmItem from '../../../components/film-item/FilmItem';
import FilmInfo from './FilmInfo';
import FilmHallsList from './FilmHallsList';
import FilmSeances from './FilmSeances';
import TextParagraph from '../../../components/text/TextParagraph';
import styles from './MainFilms.module.css';
/**
 * Список фильмов
 */
export default function MainFilms() {
  const { movies, loading, error } = useSelector((state) => state.movies);
  return (
    <>
      {!loading ? (
        <>
          {!error ? (
            <>
              {movies.length ? (
                <FilmList className={''} items={movies}>
                  {(items) =>
                    items.map((movie, index) => (
                      <FilmItem key={index} className={styles.movie}>
                        <FilmInfo item={movie} />
                        <FilmHallsList className={''} halls={movie.movieHalls}>
                          {(halls) =>
                            halls.map((hall, index) => (
                              <FilmSeances
                                key={index}
                                hall={hall}
                                className={''}
                              />
                            ))
                          }
                        </FilmHallsList>
                      </FilmItem>
                    ))
                  }
                </FilmList>
              ) : (
                <TextParagraph
                  className={`${styles.paragraph} ${styles.error}`}
                  text={
                    'Сегодня нет доступных киносеансов, пожалуйста, выберите другую дату'
                  }
                />
              )}
            </>
          ) : (
            <TextParagraph
              className={`${styles.paragraph} ${styles.error}`}
              text={error}
            />
          )}
        </>
      ) : (
        <>{<LoaderWithBg size={'b'} />}</>
      )}
    </>
  );
}
