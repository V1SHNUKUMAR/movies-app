import React from "react";
import "./App.css";

import Homepage from "./components/Homepage";

function App() {
  return (
    <div className="App bg-zinc-950 text-white font-openSans min-h-screen box-border">
      <div
        id="overlay"
        className="absolute top-0 left-0 h-screen w-screen bg-black/50 z-10 hidden"
      ></div>
      <Homepage />
    </div>
  );
}

export default App;
