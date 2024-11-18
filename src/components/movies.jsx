import React, { useEffect, useState } from 'react';
import MoviesCard from './moviesCard';
import Pagination from './pagination';

function Movies({ watchList, setWatchList }) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const handleWatchList = (movieObj) => {
    const newWatchList = [...watchList, movieObj];
    setWatchList(newWatchList);
    console.log('Added to watchlist:', newWatchList);
  };

  const removeWatchList = (movieObj) => {
    const newWatchList = watchList.filter((movie) => movie.id !== movieObj.id);
    setWatchList(newWatchList);
    console.log('Removed from watchlist:', newWatchList);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=9633327e7d6c6c3bccdb34a476c06f92&language=en-US&page=${page}`
      );
      const data = await response.json();
      setMovies(data.results);
      console.log('Fetched movies:', data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [page]); // Only trigger when page changes

  return (
    <div>
      <div className="text-2xl text-gray-900 font-serif font-bold text-center my-10 w-full rounded-full">
        Trending Movies
      </div>

      <div className="flex flex-row flex-wrap justify-center">
        {movies.length > 0 ? (
          movies.map((movieObj) => (
            <MoviesCard
              watchList={watchList}
              removeWatchList={removeWatchList}
              movieObj={movieObj}
              handleWatchList={handleWatchList}
              key={movieObj.id}
              poster_path={movieObj.poster_path}
              name={movieObj.original_title}
            />
          ))
        ) : (
          <p className="text-center text-lg">Loading movies...</p>
        )}
      </div>

      <div>
        <Pagination prevPage={prevPage} nextPage={nextPage} page={page} />
      </div>
    </div>
  );
}

export default Movies;
