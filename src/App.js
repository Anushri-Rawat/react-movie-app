import { ContextProvider } from "./store/Context";
import SideBar from "./components/SIdeBar/SideBar";
import HomePage from "./components/HomePage/HomePage";
import DetailsPage from "./components/DetailsPage/DetailsPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Favourite from "./components/Favourite/Favourite";
import React from "react";

function App() {
  return (
    <ContextProvider>
      <SideBar />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/detailsPage" element={<DetailsPage />}></Route>
          <Route path="/favourites" element={<Favourite />}></Route>
        </Routes>
      </Router>
    </ContextProvider>
  );
}

export default App;
