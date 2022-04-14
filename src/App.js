import Context, { ContextProvider } from "./store/Context";
import SideBar from "./components/SIdeBar/SideBar";
import HomePage from "./components/HomePage/HomePage";
import DetailsPage from "./components/DetailsPage/DetailsPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Favourite from "./components/Favourite/Favourite";
import React, { useContext } from "react";
import CategoryPage from "./components/CategoryPage/CategoryPage";

function App() {
  return (
    <ContextProvider>
      <Router>
        <SideBar />
        <Routes>
          <Route exact path="/" element={<HomePage />}></Route>
          <Route
            exact
            path={`/category/:id`}
            element={<CategoryPage />}
          ></Route>
          <Route exact path={`/search`} element={<CategoryPage />}></Route>
          <Route path={`/detailsPage/:id`} element={<DetailsPage />}></Route>
          <Route path="/favourites" element={<Favourite />}></Route>
        </Routes>
      </Router>
    </ContextProvider>
  );
}

export default App;
