import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import logo from "../assets/logo.png";
import devPic from "../assets/devPic.jpg";

const MovieDetailsPage = () => {
  // const { movie } = props;
  const movie = JSON.parse(localStorage.getItem("movie"));

  const countriesList = [
    "India",
    "France",
    "Mexico",
    "US",
    "Italy",
    "Spain",
    "Hungary",
    "China",
    "Croatia",
    "Turkey",
    "Denmark",
  ];

  // const fetchMovieFromLocalStorage = () => {
  //   setMovie(JSON.parse(localStorage.getItem("movie")));
  // };

  useEffect(() => {
    // fetchMovieFromLocalStorage();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-[1400px] mx-auto">
      <TopHeader />
      <div
        id="moviePoster"
        className="min-h-[700px] sm:min-h-[550px] max-h-screen overflow-hidden relative"
      >
        {/* desktop view */}
        <img
          className="w-full h-full object-bottom object-cover hidden sm:block"
          src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
          alt=""
        />

        {/* mobile view */}
        <img
          className="w-full h-full object-bottom object-cover sm:hidden"
          src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`}
          alt=""
        />
        {/* Linear black gradient from bottom to top */}
        <div
          id="gradient-layer"
          className="absolute h-1/2 w-full bottom-0 bg-gradient-to-t from-zinc-950 via-zinc-950/75 to-transparent"
        ></div>
      </div>
      {/* Movie Details section */}
      <section
        id="movieDetails"
        className="p-6 mx-auto max-w-[1200px] rounded-2xl flex justify-evenly gap-10 bg-zinc-950 relative -mt-40"
      >
        <div
          id="moviePic"
          className="w-1/3 rounded-lg overflow-hidden hidden sm:block"
        >
          <img
            src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`}
            alt=""
          />
        </div>
        <article id="movieInfo" className="flex-1 space-y-4">
          <div
            id="heading"
            className="flex justify-between items-center gap-10"
          >
            <h1 className="text-2xl font-semibold">
              {movie.title}{" "}
              <span className="text-base text-white/60 font-normal">
                ({movie.release_date.substring(0, 4) ?? ""})
              </span>
            </h1>
            <div id="Share" className="text-center text-2xl text-white/50">
              <i className="fa-solid fa-share-nodes block"></i>
              <p className="text-xs">Share</p>
            </div>
          </div>
          <p className="text-lg text-white/50 m">Watch Now</p>
          {/* filters */}
          <div
            id="filters"
            className="bg-zinc-900 px-3 py-3 text-sm flex justify-between gap-2 flex-wrap items-center"
          >
            <div className=" flex gap-2 items-center">
              <div className="text-white/50">
                <i className="fa-solid fa-filter"></i> FILTERS
              </div>
              <div className="flex gap-4 items-center flex-wrap">
                <div className="bg-white/20 p-2 rounded-md">Best Price</div>
                <div>Free</div>
                <div>SD</div>
                <div>HD</div>
                <div>4K</div>
              </div>
            </div>
            <div className="flex gap-2 items-center ">
              <p className="text-white/50">Streaming in:</p>
              <select
                className="bg-white/20 p-2 rounded-md"
                name="country"
                id="country"
              >
                {countriesList.map((country, index) => (
                  <option className="bg-zinc-950" key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <div
              id="streaming-platforms-STREAM"
              className="text-sm flex items-center gap-4"
            >
              <div className="px-0.5 font-semibold h-24 text-center bg-zinc-300 text-zinc-600 [writing-mode:vertical-rl] rotate-180 uppercase">
                Stream
              </div>
              <div
                id="platforms"
                className="flex-wrap flex items-center gap-2 sm:gap-4"
              >
                <div
                  id="platform"
                  className="text-[12px] xs: text-sm space-y-1"
                >
                  <div className="h-8 xs:h-12 w-fit rounded-lg mx-auto overflow-hidden">
                    <img
                      className="h-full "
                      src="https://images.justwatch.com/icon/207360008/s100/netflix.webp"
                      alt=""
                    />
                  </div>
                  <div>
                    Subs{" "}
                    <span className=" text-[8px] xs:text-xs text-amber-500">
                      HD
                    </span>
                  </div>
                </div>
                <div
                  id="platform"
                  className="text-[12px] xs: text-sm space-y-1"
                >
                  <div className="h-8 xs:h-12 w-fit mx-auto rounded-lg overflow-hidden">
                    <img
                      className="h-full "
                      src="https://images.justwatch.com/icon/52449861/s100/amazonprimevideo.webp"
                      alt=""
                    />
                  </div>
                  <div>
                    Subs{" "}
                    <span className=" text-[8px] xs:text-xs text-amber-500">
                      HD
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              id="streaming-platforms-RENT"
              className="text-sm flex items-center gap-4"
            >
              <div className="px-0.5 font-semibold h-24 text-center bg-zinc-500 text-zinc-100 [writing-mode:vertical-rl] rotate-180 uppercase">
                Rent
              </div>
              <div
                id="platforms"
                className="flex-wrap flex items-center gap-2 sm:gap-4"
              >
                <div
                  id="platform"
                  className="text-[12px] xs: text-sm space-y-1"
                >
                  <div className="h-8 xs:h-12 w-fit mx-auto rounded-lg overflow-hidden">
                    <img
                      className="h-full"
                      src="https://images.justwatch.com/icon/430993/s100/amazon.webp"
                      alt=""
                    />
                  </div>
                  <div>
                    &#8377; 75.00{" "}
                    <span className=" text-[8px] xs:text-xs text-amber-500">
                      HD
                    </span>
                  </div>
                </div>
                <div
                  id="platform"
                  className="text-[12px] xs: text-sm space-y-1"
                >
                  <div className="h-8 xs:h-12 w-fit mx-auto rounded-lg overflow-hidden  ">
                    <img
                      className="h-full"
                      src="https://images.justwatch.com/icon/169478387/s100/play.webp"
                      alt=""
                    />
                  </div>
                  <div>&#8377; 80.00 </div>
                </div>
                <div
                  id="platform"
                  className="text-[12px] xs: text-sm space-y-1"
                >
                  <div className="h-8 xs:h-12 w-fit mx-auto rounded-lg overflow-hidden  ">
                    <img
                      className="h-full"
                      src="https://images.justwatch.com/icon/59562423/s100/youtube.webp"
                      alt=""
                    />
                  </div>
                  <div>&#8377; 80.00 </div>
                </div>
                <div
                  id="platform"
                  className="text-[12px] xs: text-sm space-y-1"
                >
                  <div className="h-8 xs:h-12 w-fit mx-auto rounded-lg overflow-hidden  ">
                    <img
                      className="h-full"
                      src="https://images.justwatch.com/icon/190848813/s100/itunes.webp"
                      alt=""
                    />
                  </div>
                  <div>
                    &#8377; 120.00{" "}
                    <span className=" text-[8px] xs:text-xs text-amber-500">
                      HD
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              id="streaming-platforms-RENT"
              className="text-sm flex items-center gap-4"
            >
              <div className="px-0.5 font-semibold h-24 text-center bg-zinc-800 text-zinc-100 [writing-mode:vertical-rl] rotate-180 uppercase">
                Buy
              </div>
              <div
                id="platforms"
                className="flex-wrap flex items-center gap-2 sm:gap-4"
              >
                <div
                  id="platform"
                  className="text-[12px] xs: text-sm space-y-1"
                >
                  <div className="h-8 xs:h-12 w-fit mx-auto rounded-lg overflow-hidden  ">
                    <img
                      className="h-full"
                      src="https://images.justwatch.com/icon/169478387/s100/play.webp"
                      alt=""
                    />
                  </div>
                  <div>
                    &#8377; 460.00{" "}
                    <span className=" text-[8px] xs:text-xs text-amber-500">
                      HD
                    </span>
                  </div>
                </div>
                <div
                  id="platform"
                  className="text-[12px] xs: text-sm space-y-1"
                >
                  <div className="h-8 xs:h-12 w-fit mx-auto rounded-lg overflow-hidden  ">
                    <img
                      className="h-full"
                      src="https://images.justwatch.com/icon/59562423/s100/youtube.webp"
                      alt=""
                    />
                  </div>
                  <div>
                    &#8377; 460.00{" "}
                    <span className=" text-[8px] xs:text-xs text-amber-500">
                      HD
                    </span>
                  </div>
                </div>
                <div
                  id="platform"
                  className="text-[12px] xs: text-sm space-y-1"
                >
                  <div className="h-8 xs:h-12 w-fit mx-auto rounded-lg overflow-hidden  ">
                    <img
                      className="h-full"
                      src="https://images.justwatch.com/icon/190848813/s100/itunes.webp"
                      alt=""
                    />
                  </div>
                  <div>
                    &#8377; 120.00{" "}
                    <span className=" text-[8px] xs:text-xs text-amber-500">
                      HD
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <article id="overview" className="space-y-2">
            <h2 className="text-xl">Overview</h2>
            <p className="text-sm">{movie.overview}m</p>
          </article>
        </article>
      </section>
    </div>
  );
};

export default MovieDetailsPage;

const TopHeader = () => {
  return (
    <header className="p-3 max-w-[1400px] fixed w-full top-0 z-50 bg-gradient-to-b from-black/70 via-black/30 to-transparent flex justify-between items-center gap-4 md:gap-12">
      {/* gradient layer */}
      {/* <div className="absolute hidden top-0 left-0 -z-10 h-[120%] bg-gradient-to-b from-black/75 via-black/10 to-transparent w-full md:block"></div> */}
      {/* content */}
      <div className="flex items-center gap-3">
        <Link to={"/"}>
          {" "}
          <div id="logo" className="flex gap-2 items-center">
            <img src={logo} alt="logo" className="max-h-10 md:max-h-7" />
            <h1 className="hidden sm:block text-2xl sm:text-xl xl:text-2xl font-bold text-violet-500">
              Cinemix
            </h1>
          </div>
        </Link>
        <input
          className="px-4 py-2.5 bg-zinc-950/50 outline-none border border-zinc-500 rounded-2xl w-full md:w-80 md:py-2"
          type="search"
          name="search"
          id="search"
          placeholder="Search"
        />
      </div>

      <div className="flex items-center gap-3 sm:gap-8">
        <div id="notifications" className="cursor-pointer text-2xl">
          <i className="fa-regular fa-bell"></i>
        </div>

        <Link to="/dev-info-page">
          {" "}
          <div className="cursor-pointer h-10 sm:h-9 aspect-square rounded-full overflow-hidden">
            <img className="h-full" src={devPic} alt="user" />
          </div>
        </Link>
      </div>
    </header>
  );
};
