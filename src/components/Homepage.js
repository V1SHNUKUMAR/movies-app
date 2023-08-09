import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "../swiperStyles.css";

// assets and files
import logo from "../assets/logo.png";

const Homepage = () => {
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
  }, [isMenuOpen]);

  return (
    <div id="homepage" className="flex relative">
      <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <section
        id="main-content"
        className="w-screen max-w-6xl p-4 space-y-6 mx-auto md:flex-1 lg:w-4/5 md:px-5 md:space-y-4"
      >
        {/* HEADER */}
        <header className="flex justify-between items-center gap-4 md:gap-12">
          <div className="flex items-center gap-3">
            <div
              id="hamburgerButton"
              className="cursor-pointer md:hidden text-3xl"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <i className="fa-solid fa-bars"></i>
            </div>
            <input
              className="px-4 py-2.5 bg-transparent outline-none border border-zinc-500 rounded-2xl w-full md:w-80 md:py-2"
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

            <div className="h-10 aspect-square rounded-full overflow-hidden">
              <img className="h-full" src={userImgUrl} alt="user" />
            </div>
          </div>
        </header>
        {/* image slider for movies */}
        <ImageSlider />
        {/* Movie grid */}
        <MoviesGrid />
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
            ? "min-h-screen w-1/6 border-r border-zinc-700 bg-zinc-950/50 overflow-y-auto backdrop-blur-sm min-w-[250px] md:min-w-[200px] max-w-sm fixed z-50 top-0 left-0 py-9 space-y-10 md:sticky md:block duration-300 -translate-x-0 opacity-100"
            : "min-h-screen w-1/6 border-r border-zinc-700 bg-zinc-950/50 overflow-y-auto backdrop-blur-sm min-w-[250px] md:min-w-[200px] max-w-sm fixed z-50 top-0 left-0 py-9 space-y-10  md:sticky md:block -translate-x-full md:-translate-x-0 duration-300 opacity-0 md:opacity-100"
        }
      >
        <div id="heading" className="flex gap-2 items-center px-10">
          <img src={logo} alt="logo" className="max-h-10 md:max-h-7" />
          <h1 className="text-2xl sm:text-xl xl:text-2xl font-bold text-violet-500">
            Cinemix
          </h1>
        </div>
        <hr className="w-1/2 ml-12 border-zinc-700" />
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
            ? "text-3xl absolute top-7 right-7 z-20"
            : "hidden text-3xl absolute top-7 right-7 z-20"
        }
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <i className="fa-solid fa-xmark"></i>
      </button>
    </>
  );
};

// IMAGE SLIDER
const ImageSlider = () => {
  let moviesList = [
    "https://images.justwatch.com/backdrop/305709131/s1440/asur.webp",
    "https://images.justwatch.com/backdrop/305388106/s1440/guardians-of-the-galaxy-vol-3.webp",
    "https://images.justwatch.com/backdrop/302908004/s1440/farzi.webp",
    "https://images.justwatch.com/backdrop/306773553/s1440/rocky-aur-rani-ki-prem-kahani.webp",
    "https://images.justwatch.com/backdrop/150397072/s1440/gadar-ek-prem-katha.webp",
    "https://images.justwatch.com/backdrop/301877765/s1440/pathaan.webp",
  ];

  return (
    // <div className="w-[85vw] sm:w-[90vw] lg:max-w-3xl xl:max-w-5xl mx-auto">
    <div className="w-auto md:w-[68vw] lg:w-auto mx-auto">
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
        {moviesList.map((movie, index) => (
          <SwiperSlide key={index}>
            <SliderItem imgUrl={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

// IMAGE SLIDE ITEM
const SliderItem = (props) => {
  const { imgUrl } = props;
  return (
    <div
      style={{ background: `url(${imgUrl}) no-repeat top center/cover` }}
      className="h-48 md:h-72 rounded-3xl overflow-hidden relative"
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

      <div className="flex justify-between items-end absolute bottom-0 w-full px-4 pb-8 md:px-8">
        <div>
          <h2 className="text-xl font-bold md:text-3xl md:font-semibold">
            Army of the head
          </h2>
          <p className="text-base">2021</p>
          <p className="text-sm">7.9 rating</p>
        </div>
        <button className="bg-violet-500 px-6 py-2 h-fit rounded-full text-sm mb-0.5 hover:bg-violet-700 duration-300">
          Watch Now
        </button>
      </div>
    </div>
  );
};

const MoviesGrid = () => {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 border ">
      <MovieGridItem />
      <MovieGridItem />
      <MovieGridItem />
      <MovieGridItem />
      <MovieGridItem />
      <MovieGridItem />
      <MovieGridItem />
      <MovieGridItem />
      <MovieGridItem />
    </div>
  );
};

const MovieGridItem = () => {
  return <div className="h-52 border rounded-2xl">Hey</div>;
};
