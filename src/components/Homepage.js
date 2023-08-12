import React, { useEffect, useState, useContext } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "../swiperStyles.css";

// assets and files
import LoadingComponent from "./LoadingComponent";
import MoviesGrid from "./MoviesGrid";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import MyContext from "../context/MyContext";

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
  }, [isMenuOpen]);

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
              onClick={() => setIsMenuOpen(true)}
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
            <div id="notifications" className="cursor-pointer text-2xl">
              <i className="fa-regular fa-bell"></i>
            </div>

            <div className="cursor-pointer h-10 sm:h-9 aspect-square rounded-full overflow-hidden">
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

// IMAGE SLIDER
const ImageSlider = (props) => {
  const myContext = useContext(MyContext);
  const { isLoadingForSlider, sliderMovies, fetchSliderMovies } = myContext;

  useEffect(() => {
    fetchSliderMovies();
  }, []);

  return (
    // <div className="w-[85vw] sm:w-[90vw] lg:max-w-3xl xl:max-w-5xl mx-auto">
    <div className="w-auto md:w-[68vw] lg:w-auto mx-auto">
      {!isLoadingForSlider ? (
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

  const handleClick = (movie) => {
    localStorage.setItem("movie", JSON.stringify(movie));
  };

  return (
    <Link to="/movie-details-page" onClick={() => handleClick(movie)}>
      <div
        style={{
          background: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path}) no-repeat center center/cover`,
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
    </Link>
  );
};
