import React from "react";
import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import Homepage from "./components/Homepage";
import MovieDetailsPage from "./components/MovieDetailsPage";
import GlobalState from "./context/GlobalState";

function App() {
  let bearer_token = process.env.REACT_APP_BEARER_TOKEN;
  return (
    <GlobalState>
      <BrowserRouter>
        <div className="App bg-zinc-950 text-white font-openSans min-h-screen box-border">
          <div
            id="overlay"
            className="fixed top-0 left-0 h-screen w-screen bg-zinc-950/25 z-20 hidden"
          ></div>
          <Routes>
            <Route
              path="/"
              element={<Homepage bearer_token={bearer_token} />}
            />
            <Route path="/movie-details-page" element={<MovieDetailsPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </GlobalState>
  );
}

export default App;
