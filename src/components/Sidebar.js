import React, { useContext, useEffect } from "react";

import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import MyContext from "../context/MyContext";

const Sidebar = (props) => {
  const myContext = useContext(MyContext);
  const { fetchMoviesForGrid } = myContext;
  const { isMenuOpen, setIsMenuOpen } = props;
  const categories = [
    {
      name: "Explore",
      id: "all",
    },
    {
      name: "Action",
      id: "28",
    },
    {
      name: "Comedy",
      id: "35",
    },
    {
      name: "Horror",
      id: "27",
    },
    {
      name: "History",
      id: "36",
    },
  ];
  // const [activeTab, setActiveTab] = useState(categories[0]);

  const highlightTab = (tabId = "tab0") => {
    document.getElementById(tabId).style =
      "border-left: 5px solid rgb(168, 130, 238); color:rgb(168, 130, 238)";
    let tabs = document.getElementsByClassName("tab");
    let i = 0;
    while (i < tabs.length) {
      // console.log(tabs[i].id);
      if (tabs[i].id !== tabId) {
        tabs[i].style = "border-left: none;color:white";
      }
      i++;
    }
  };

  useEffect(() => {
    highlightTab();
  }, []);

  return (
    <>
      <div
        id="sidebar"
        className={
          isMenuOpen
            ? "h-screen min-w-[220px] xs:min-w-[250px] md:min-w-[200px] max-w-sm w-1/6 border-r border-white/10 overflow-y-auto backdrop-blur-md fixed z-50 top-0 left-0 py-9 space-y-16 md:sticky md:block duration-300 -translate-x-0 opacity-100"
            : "h-screen min-w-[220px] xs:min-w-[250px] md:min-w-[200px] max-w-sm w-1/6 border-r border-white/10 overflow-y-auto backdrop-blur-md fixed z-50 top-0 left-0 py-9 space-y-16 md:sticky md:block -translate-x-full md:-translate-x-0 duration-300 opacity-0 md:opacity-100"
        }
      >
        <Link to={"/"}>
          {" "}
          <div id="logo" className="flex gap-2 items-center px-10">
            <img src={logo} alt="logo" className="max-h-10 md:max-h-7" />
            <h1 className="text-2xl sm:text-xl xl:text-2xl font-bold text-violet-500">
              Cinemix
            </h1>
          </div>
        </Link>
        {/* <hr className="w-1/2 ml-12 border-zinc-700" /> */}
        <ul
          id="tabs"
          className="space-y-10 text-lg md:space-y-8 text-zinc-400 font-semibold md:text-base"
        >
          {categories.map((category, index) => (
            <li
              id={"tab" + index}
              key={index}
              className="tab px-12 text-white transition-colors duration-300 cursor-pointer hover:text-violet-500 hover:border-l-2 hover:border-violet-500"
              onClick={() => {
                setIsMenuOpen(false);
                fetchMoviesForGrid(category.id);
                highlightTab("tab" + index);
              }}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>
      {/* close menu button */}
      <button
        id="close-menu-button"
        className={
          isMenuOpen
            ? "text-xl opacity-100 backdrop-blur-sm bg-white/25 scale-100 delay-300 duration-300 h-12 w-12 rounded-full fixed top-7 z-20 left-[80%] xs:left-[70%] sm:left-[40%] "
            : "opacity-0 h-12 w-12 scale-0 duration-300 rounded-full fixed top-7 z-20 left-[80%] xs:left-[70%] sm:left-[40%]"
        }
        onClick={() => setIsMenuOpen(false)}
      >
        <i className="fa-solid fa-xmark"></i>
      </button>
    </>
  );
};

export default Sidebar;
