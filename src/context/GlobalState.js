import React, { useState } from "react";
import axios from "axios";

import MyContext from "./MyContext";

const GlobalState = (props) => {
  let bearer_token = process.env.REACT_APP_BEARER_TOKEN;

  const [sliderMovies, setSliderMovies] = useState([]);
  const [isLoadingForSlider, setIsLoadingForSlider] = useState(true);

  // fetch movies for slider
  const fetchSliderMovies = async () => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en&page=1&primary_release_year=2023&sort_by=popularity.desc",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${bearer_token}`,
      },
    };

    try {
      setIsLoadingForSlider(true);
      const response = await axios.request(options);
      const filteredSliderMovies = response.data.results.filter(
        (currMovie) =>
          currMovie.backdrop_path &&
          currMovie.poster_path &&
          currMovie.title &&
          currMovie.release_date &&
          currMovie.vote_average
      );
      const max10Movies = filteredSliderMovies.slice(0, 10);
      // console.log(response.data.results[3].title);
      setSliderMovies(max10Movies);
    } catch (error) {
      console.log(error);
    }
    setIsLoadingForSlider(false);
  };

  // -------------------------- Movies for grid
  const [moviesForGrid, setMoviesForGrid] = useState([]);
  const [isLoadingForMoviesGrid, setIsLoadingForMoviesGrid] = useState(false);
  const [page, setPage] = useState(2);
  let totalMoviesForGrid;

  const fetchMoviesForGrid = async (genre = "all", page = 2) => {
    let with_genres;
    if (genre === "all") {
      with_genres = "with_genres=";
    } else {
      with_genres = "with_genres=" + genre;
    }
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en&page=${page}&primary_release_year=2023&sort_by=popularity.desc&${with_genres}`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${bearer_token}`,
      },
    };

    try {
      setIsLoadingForMoviesGrid(true);
      const response = await axios.request(options);
      const filteredSliderMovies = response.data.results.filter(
        (currMovie) =>
          currMovie.backdrop_path &&
          currMovie.poster_path &&
          currMovie.title &&
          currMovie.release_date &&
          currMovie.vote_average
      );
      // console.log(response.data.results[3].title);
      setMoviesForGrid(filteredSliderMovies);
      setIsLoadingForMoviesGrid(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMoreMoviesForGrid = async (genre = "all") => {
    let with_genres;
    if (genre === "all") {
      with_genres = "with_genres=";
    } else {
      with_genres = "with_genres=" + genre;
    }
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en&page=${
        page + 1
      }&primary_release_year=2023&sort_by=popularity.desc&${with_genres}`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${bearer_token}`,
      },
    };

    try {
      setPage(page + 1);
      // setIsLoadingForMoviesGrid(true);
      const response = await axios.request(options);
      totalMoviesForGrid = response.data.total_results;
      const filteredSliderMovies = response.data.results.filter(
        (currMovie) =>
          currMovie.backdrop_path &&
          currMovie.poster_path &&
          currMovie.title &&
          currMovie.release_date &&
          currMovie.vote_average
      );
      // console.log(response.data.results[3].title);
      setMoviesForGrid(moviesForGrid.concat(filteredSliderMovies));
      // setIsLoadingForMoviesGrid(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MyContext.Provider
      value={{
        isLoadingForSlider,
        sliderMovies,
        fetchSliderMovies,
        isLoadingForMoviesGrid,
        moviesForGrid,
        fetchMoviesForGrid,
        fetchMoreMoviesForGrid,
        totalMoviesForGrid,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

export default GlobalState;
