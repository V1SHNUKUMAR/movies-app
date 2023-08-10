import React, { useEffect, useState } from "react";
import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "../swiperStyles.css";

// assets and files
import logo from "../assets/logo.png";
import LoadingComponent from "./LoadingComponent";

const Homepage = (props) => {
  const { bearer_token } = props;

  const userImgUrl =
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80";

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    // document.getElementById("homepage").style.backdropFilter = isMenuOpen
    //   ? "brightness(.1)"
    //   : "brightness(1)";
    document.getElementById("overlay").style.display = isMenuOpen
      ? "block"
      : "none";
    // fetch movies data
  }, []);

  return (
    <div id="homepage" className="flex relative">
      <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <section
        id="main-content"
        className="w-screen max-w-6xl p-4 space-y-6 mx-auto md:flex-1 lg:w-4/5 md:px-5 md:space-y-4"
      >
        {/* HEADER */}
        <header className="md:sticky md:top-0 md:pt-2 md:z-50 bg-gradient-to-b flex justify-between items-center gap-4 md:gap-12">
          {/* gradient layer */}
          <div className="absolute hidden top-0 left-0 -z-10 h-[160%] bg-gradient-to-b from-zinc-950 via-zinc-950/70 to-transparent w-full md:block"></div>
          {/* content */}
          <div className="flex items-center gap-3">
            <div
              id="hamburgerButton"
              className="cursor-pointer md:hidden text-3xl"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <i className="fa-solid fa-bars"></i>
            </div>
            <input
              className="px-4 py-2.5 bg-zinc-950/50 outline-none border border-zinc-500 rounded-2xl w-full md:w-80 md:py-2"
              type="search"
              name="search"
              id="search"
              placeholder="Search"
            />
          </div>

          <div className="flex items-center gap-3 sm:gap-8">
            <div id="notifications" className="text-2xl">
              <i className="fa-regular fa-bell"></i>
            </div>

            <div className="h-10 sm:h-9 aspect-square rounded-full overflow-hidden">
              <img className="h-full" src={userImgUrl} alt="user" />
            </div>
          </div>
        </header>

        {/* image slider for movies */}
        <ImageSlider bearer_token={bearer_token} />
        {/* Movie grid */}
        <MoviesGrid bearer_token={bearer_token} />
      </section>
    </div>
  );
};

export default Homepage;

// SIDEBAR COMPONENT
const Sidebar = (props) => {
  const { isMenuOpen, setIsMenuOpen } = props;

  return (
    <>
      <div
        id="sidebar"
        className={
          isMenuOpen
            ? "min-h-screen min-w-[220px] xs:min-w-[250px] md:min-w-[200px] max-w-sm w-1/6 border-r border-zinc-700 bg-zinc-950/50 overflow-y-auto backdrop-blur-sm fixed z-50 top-0 left-0 py-9 space-y-10 md:sticky md:block duration-300 -translate-x-0 opacity-100"
            : "min-h-screen min-w-[220px] xs:min-w-[250px] md:min-w-[200px] max-w-sm w-1/6 border-r border-zinc-700 bg-zinc-950/50 overflow-y-auto backdrop-blur-sm fixed z-50 top-0 left-0 py-9 space-y-10  md:sticky md:block -translate-x-full md:-translate-x-0 duration-300 opacity-0 md:opacity-100"
        }
      >
        <div id="heading" className="flex gap-2 items-center px-10">
          <img src={logo} alt="logo" className="max-h-10 md:max-h-7" />
          <h1 className="text-2xl sm:text-xl xl:text-2xl font-bold text-violet-500">
            Cinemix
          </h1>
        </div>
        {/* <hr className="w-1/2 ml-12 border-zinc-700" /> */}
        <ul className="space-y-10 text-lg md:space-y-8 text-zinc-400 md:text-base">
          <li className="px-12 border-l-4 border-l-violet-500 text-white hover:text-white transition-colors duration-300 cursor-pointer ">
            Explore
          </li>
          <li className="px-12 hover:text-white duration-200 cursor-pointer hover:border-l-4 hover:border-l-violet-500">
            Movies
          </li>
          <li className="px-12 hover:text-white duration-200 cursor-pointer hover:border-l-4 hover:border-l-violet-500">
            Series
          </li>
          <li className="px-12 hover:text-white duration-200 cursor-pointer hover:border-l-4 hover:border-l-violet-500">
            Anime
          </li>
          <li className="px-12 hover:text-white duration-200 cursor-pointer hover:border-l-4 hover:border-l-violet-500">
            Genres
          </li>
          <li className="px-12 hover:text-white duration-200 cursor-pointer hover:border-l-4 hover:border-l-violet-500">
            Favorites
          </li>
        </ul>
      </div>
      {/* close menu button */}
      <button
        id="close-menu-button"
        className={
          isMenuOpen
            ? "text-4xl fixed top-7 z-20 left-[80%] xs:left-[70%] sm:left-[40%]"
            : "hidden"
        }
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <i className="fa-solid fa-xmark"></i>
      </button>
    </>
  );
};

// IMAGE SLIDER
const ImageSlider = (props) => {
  const { bearer_token } = props;
  const [sliderMovies, setSliderMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // fetch movies for slider
  const fetchSliderMovies = async () => {
    const options = {
      method: "GET",
      // url: "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
      url: "https://api.themoviedb.org/3/trending/all/day?page=1?language=en-IN",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${bearer_token}`,
      },
    };

    try {
      setIsLoading(true);
      const response = await axios.request(options);
      const filteredSliderMovies = response.data.results.filter(
        (currMovie) =>
          currMovie.backdrop_path !== undefined &&
          currMovie.poster_path !== undefined &&
          currMovie.title !== undefined &&
          currMovie.release_date !== undefined &&
          currMovie.vote_average !== undefined
      );
      // console.log(response.data.results[3].title);
      setSliderMovies(filteredSliderMovies);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSliderMovies();
  }, []);

  return (
    // <div className="w-[85vw] sm:w-[90vw] lg:max-w-3xl xl:max-w-5xl mx-auto">
    <div className="w-auto md:w-[68vw] lg:w-auto mx-auto">
      {!isLoading ? (
        <Swiper
          spaceBetween={30}
          pagination={{ clickable: true }}
          modules={[Pagination, Autoplay]}
          autoplay={{
            delay: 2000,
            disableOnInteraction: true,
          }}
          className="mySwiper"
        >
          {sliderMovies !== []
            ? sliderMovies.map((movie, index) => (
                <SwiperSlide key={index}>
                  <SliderItem movie={movie} />
                  {/* <SliderItem
                    imgUrl={
                      "https://images.justwatch.com/backdrop/301877765/s1440/pathaan.webp"
                    }
                  /> */}
                </SwiperSlide>
              ))
            : null}
        </Swiper>
      ) : (
        <LoadingComponent />
      )}
    </div>
  );
};

// IMAGE SLIDE ITEM
const SliderItem = (props) => {
  const { movie } = props;
  // movie.primaryImage.url = image URL
  // movie.originalTitleText.text = title
  // movie.releaseYear.year = release year

  return (
    <div
      style={{
        background: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path}) no-repeat center center/cover`,
      }}
      className="h-48 bg-zinc-950 md:h-72 rounded-3xl overflow-hidden relative"
    >
      {/* Linear black gradient from bottom to top */}
      <div
        id="gradient-layer"
        className="absolute h-full w-full bg-gradient-to-t from-black to-transparent md:from-black/90"
      ></div>
      {/* background image */}
      {/* <img
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={imgUrl}
        alt=""
      /> */}

      <div className="flex justify-between items-end absolute gap-1 bottom-0 w-full px-1.5 xs:px-3 pb-8 md:px-8">
        <div className="space-y-1 sm:space-y-2 flex-1">
          <h2 className="text-base xs:text-xl font-bold md:text-3xl md:font-semibold">
            {movie.title}
          </h2>
          <p className=" text-sm xs:text-base font-light">
            {movie.release_date.substring(0, 4)}
          </p>
          <p className="text-[10px] xs:text-xs">
            <i className="fa-solid fa-star text-yellow-500"></i>{" "}
            {movie.vote_average.toString().substring(0, 3)}
          </p>
        </div>
        <button className="bg-violet-500 px-2 py-1 xs:px-6 xs:py-2 h-fit rounded-full text-[10px] xs:text-sm mb-0.5 hover:bg-violet-700 duration-300">
          Watch Now
        </button>
      </div>
    </div>
  );
};

const MoviesGrid = (props) => {
  const { bearer_token } = props;

  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTrendingMovies = async () => {
    const options = {
      method: "GET",
      // url: "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
      url: "https://api.themoviedb.org/3/trending/all/day?page=2?language=en-IN",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${bearer_token}`,
      },
    };

    try {
      setIsLoading(true);
      const response = await axios.request(options);
      const filteredSliderMovies = response.data.results.filter(
        (currMovie) =>
          currMovie.backdrop_path !== undefined &&
          currMovie.poster_path !== undefined &&
          currMovie.title !== undefined &&
          currMovie.release_date !== undefined &&
          currMovie.vote_average !== undefined
      );
      // console.log(response.data.results[3].title);
      setTrendingMovies(filteredSliderMovies);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  return !isLoading ? (
    <div className="grid grid-cols-2 gap-y-4 gap-2 sm:gap-4 sm:grid-cols-3 lg:grid-cols-4 md:pt-2 lg:place-items-center">
      {trendingMovies.map((movie, index) => (
        <MovieGridItem key={index} movie={movie} />
      ))}
    </div>
  ) : (
    <LoadingComponent />
  );
};

const MovieGridItem = (props) => {
  const { movie } = props;
  return (
    <div
      style={{
        background: `url(https://image.tmdb.org/t/p/w500${movie.poster_path}) no-repeat center center/cover`,
      }}
      className="lg:w-[195px] xl:w-[230px] h-full rounded-2xl relative p-2 md:p-3 flex justify-between flex-col gap-10 xs:gap-20 md:gap-32"
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
        <p className="font-light text-xs">
          {movie.release_date.substring(0, 4)}
        </p>
        <button className="bg-violet-500 px-2 py-1 xs:px-3 xs:py-2 h-fit rounded-full text-[10px] xs:text-xs mb-0.5 hover:bg-violet-700 duration-300 md:px-4">
          Watch Now
        </button>
      </div>
    </div>
  );
};
