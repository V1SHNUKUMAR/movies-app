import React from "react";
import "./App.css";

import Homepage from "./components/Homepage";

function App() {
  let bearer_token = process.env.REACT_APP_BEARER_TOKEN;
  return (
    <div className="App bg-zinc-950 text-white font-openSans min-h-screen box-border">
      <div
        id="overlay"
        className="absolute top-0 left-0 h-full w-screen bg-black/60 z-10 hidden"
      ></div>
      <Homepage bearer_token={bearer_token} />
    </div>
  );
}

export default App;
