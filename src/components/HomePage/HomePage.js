import { Fragment, useContext, useEffect, useState } from "react";
import Context from "../../store/Context";
import Header from "../Basic Ui Components/Header";
import Loading from "../Basic Ui Components/Loading";
import "./HomePage.css";
import { Link } from "react-router-dom";
import uuid from "react-uuid";
import Carousel from "./Carousel";

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

  async function openDetailsPage(e) {
    ctx.setDetailsPage([]);
    const movieDetail = await fetch(
      `https://api.themoviedb.org/3/movie/${e.target.parentElement.id}?api_key=9d72a0c28c0f596ef447765eb5e600a2&language=en-US`
    );

    const data = await movieDetail.json();
    const castDetails = await fetch(
      `https://api.themoviedb.org/3/movie/${e.target.parentElement.id}/credits?api_key=9d72a0c28c0f596ef447765eb5e600a2&language=en-US`
    );
    const castDetailsData = await castDetails.json();
    ctx.setDetailsPage((prev) => (prev = [{ ...data, ...castDetailsData }]));
  }

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
                      <Link to="/detailsPage">
                        <div
                          id={movie.id}
                          className="movies-link"
                          onClick={openDetailsPage}
                        >
                          <img
                            src={`https://image.tmdb.org/t/p/original/${movie["poster_path"]}`}
                            alt="Movie Poster Image"
                          ></img>
                          <h2 className="movie-name">
                            {movie.title || movie.original_name}
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
