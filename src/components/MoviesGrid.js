import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import MyContext from "../context/MyContext";
// infinite scroll
import InfiniteScroll from "react-infinite-scroll-component";

import LoadingComponent from "./LoadingComponent";

const MoviesGrid = () => {
  const myContext = useContext(MyContext);
  const {
    isLoadingForMoviesGrid,
    moviesForGrid,
    fetchMoreMoviesForGrid,
    totalMoviesForGrid,
    fetchMoviesForGrid,
  } = myContext;

  useEffect(() => {
    fetchMoviesForGrid("all");
  }, []);

  return (
    <>
      {isLoadingForMoviesGrid ? (
        <LoadingComponent />
      ) : (
        <InfiniteScroll
          dataLength={moviesForGrid.length}
          next={fetchMoreMoviesForGrid}
          hasMore={moviesForGrid.length !== totalMoviesForGrid}
          loader={<LoadingComponent />}
        >
          <div className="grid grid-cols-2 gap-3 sm::gap-4 sm:grid-cols-3 lg:grid-cols-4 md:pt-2 lg:place-items-center">
            {moviesForGrid.map((movie, index) => (
              <MovieGridItem key={index} movie={movie} />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </>
  );
};

export default MoviesGrid;

// Grid item
const MovieGridItem = (props) => {
  const { movie } = props;

  const handleClick = (movie) => {
    localStorage.setItem("movie", JSON.stringify(movie));
  };

  return (
    <Link to="/movie-details-page" onClick={() => handleClick(movie)}>
      <div
        style={{
          background: `url(https://image.tmdb.org/t/p/w500${movie.poster_path}) no-repeat center center/cover`,
        }}
        className=" min-h-[180px] xs:min-h-[280px] h-full sm:h-80 rounded-2xl relative p-2 md:p-3 flex justify-between flex-col gap-10 xs:gap-20 md:gap-32 lg:w-[200px] xl:w-[260px]"
      >
        {/* Linear black gradient from bottom to top */}
        <div
          id="gradient-layer"
          className="absolute top-0 left-0 z-0 h-full w-full bg-gradient-to-t from-black/90 to-transparent md:from-black/90"
        ></div>
        <div className="bg-black/50 w-fit rounded-full px-2 py-1 text-[10px] z-10">
          <i className="fa-solid fa-star text-yellow-500"></i>{" "}
          {movie.vote_average.toString().substring(0, 3)}
        </div>
        <div className="z-10 space-y-2">
          <h2 className="font-semibold text-sm xs:text-lg md:text-xl line-clamp-2 text-ellipsis">
            {movie.title}
          </h2>
          <p className="font-light text-xs xs:text-base">
            {movie.release_date.substring(0, 4)}
          </p>
          <button className="bg-violet-500/75 px-2 py-1 xs:px-3 xs:py-2 h-fit rounded-full text-[10px] xs:text-xs mb-0.5 hover:bg-violet-700 duration-300 md:px-4">
            Watch Now
          </button>
        </div>
      </div>
    </Link>
  );
};
