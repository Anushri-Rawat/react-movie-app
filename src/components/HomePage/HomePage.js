import { Fragment, useContext, useEffect, useState } from "react";
import Context from "../../store/Context";
import Header from "../Basic Ui Components/Header";
import Loading from "../Basic Ui Components/Loading";
import "./HomePage.css";
import { Link } from "react-router-dom";
import uuid from "react-uuid";
import Carousel from "./Carousel";
import React from "react";

const HomePage = () => {
  const ctx = useContext(Context);
  const [trendingMovie, setTrendingMovie] = useState([]);

  async function renderHomePageData() {
    const res = await fetch(
      `https://cors-anywhere-venky.herokuapp.com/https://api.themoviedb.org/3/trending/all/day?api_key=9d72a0c28c0f596ef447765eb5e600a2`
    );
    const data = await res.json();
    const res2 = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=9d72a0c28c0f596ef447765eb5e600a2`
    );
    const data2 = await res2.json();
    setTrendingMovie([
      { ...data, type: "Trending" },
      { ...data2, type: "Top Rated" },
    ]);
  }

  useEffect(() => {
    renderHomePageData();
  }, []);

  if (trendingMovie.length > 0) {
    return (
      <section className="Homepage">
        <Header></Header>
        <Carousel />
        {trendingMovie.map((obj) => {
          return (
            <Fragment key={uuid()}>
              <h1 className="Homepage-heading">{obj.type}</h1>
              <ul className="movies-list">
                {obj.results.map((movie) => {
                  return (
                    <li className="movies-item" key={movie.id}>
                      <Link to={`/detailsPage/${movie.id}`}>
                        <div id={movie.id} className="movies-link">
                          <img
                            src={`https://image.tmdb.org/t/p/original/${movie["poster_path"]}`}
                            alt="Movie Poster"
                          ></img>
                          <h2 className="movie-name">
                            {movie.title
                              ? movie.title.slice(0, 15)
                              : movie.original_name.slice(0, 15)}
                          </h2>
                          {/* <span className="movie-genre">Action</span>
                    <span className="release-year">
                      {movie.release_date
                        ? movie.release_date.slice(0, 4)
                        : `2018`}
                    </span> */}
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </Fragment>
          );
        })}
      </section>
    );
  } else {
    return <Loading></Loading>;
  }
};
export default HomePage;
