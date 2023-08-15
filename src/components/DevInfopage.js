import React from "react";
import { Link } from "react-router-dom";

import logo from "../assets/logo.png";
import devPic from "../assets/devPic.jpg";

const DevInfopage = () => {
  const portfolioLink = "https://vishnu-kumar.netlify.app";
  const linkedinLink = "https://www.linkedin.com/in/vishnu-kumar-63a041221/";
  const githubLink = "https://github.com/V1SHNUKUMAR";

  return (
    <div className="max-w-[1400px] p-4 h-screen mx-auto flex items-center justify-center flex-col md:flex-row gap-10 md:gap-20">
      <DevInfoHeader />
      <div
        id="devPic"
        className="h-36 md:h-48 aspect-square rounded-full overflow-hidden"
      >
        <img
          className="h-full w-full object-cover object-center"
          src={devPic}
          alt="dev Pic"
        />
      </div>
      <section
        id="devInfo"
        className="text-center md:text-start max-w-md space-y-3"
      >
        {/* 
        name
        role
        description
        links

         */}
        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-white from-20% md:from-0% via-50% to-90% md:to-75% md:via-20% via-blue-500 to-red-500 text-3xl md:text-5xl">
          Vishnu kumar
        </h1>
        <h2 className="text-white/75 text-lg md:text-xl">Frontend Developer</h2>
        <p className="text-sm px-2 md:px-0">
          Hi <span className="text-xl md:text-2xl">👋🏻</span>, I'm a skilled
          Frontend Developer proficient in HTML, CSS, Javascript, Tailwind, and
          React.js. I excel in cross-platform app development using Flutter,
          Dart, and Firebase. Additionally, I have hands-on experience in Java,
          enabling versatile programming expertise.
        </p>
        <div
          id="links"
          className="text-sm flex items-center justify-center md:justify-start gap-2 sm:gap-4 py-4"
        >
          <a href={portfolioLink} rel="noreferrer" target="_blank">
            {" "}
            <div className="border-dashed min-w-[90px] px-3 py-1.5 border rounded-full  hover:border-violet-300 hover:text-violet-300 duration-200">
              Portfolio{" "}
              <i className="fa-solid fa-up-right-from-square text-xs"></i>
            </div>
          </a>
          <a href={linkedinLink} rel="noreferrer" target="_blank">
            {" "}
            <div className="border-dashed min-w-[90px] px-3 py-1.5 border rounded-full hover:border-violet-300 hover:text-violet-300 duration-200">
              <i className="fa-brands fa-linkedin"></i> LinkedIn
            </div>
          </a>
          <a href={githubLink} rel="noreferrer" target="_blank">
            <div className="border-dashed min-w-[90px] px-3 py-1.5 border rounded-full hover:border-violet-300 hover:text-violet-300 duration-200">
              <i className="fa-brands fa-github"></i> Github
            </div>
          </a>
        </div>
      </section>
    </div>
  );
};

export default DevInfopage;

const DevInfoHeader = () => {
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
        {/* <input
          className="px-4 py-2.5 bg-zinc-950/50 outline-none border border-zinc-500 rounded-2xl w-full md:w-80 md:py-2"
          type="search"
          name="search"
          id="search"
          placeholder="Search"
        /> */}
      </div>

      <div className="flex items-center gap-3 sm:gap-8">
        <div id="notifications" className="cursor-pointer text-2xl">
          <i className="fa-regular fa-bell"></i>
        </div>
      </div>
    </header>
  );
};
