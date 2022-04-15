import { useContext } from "react";
import Context from "../../store/Context";
import Header from "../Basic Ui Components/Header";
import Loading from "../Basic Ui Components/Loading";
import next from "../../Assests/next.svg";
import classes from "./CategoryPage.module.css";
import { Link } from "react-router-dom";
import back from "../../Assests/prev.svg";
import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

const CategoryPage = () => {
  const ctx = useContext(Context);
  const moviesList = ctx.MoviesArray.results;

  if (!ctx.isLoading) {
    return (
      <section className={classes["Homepage"]}>
        <Header></Header>
        <h1 className={classes["Homepage-heading"]}>{ctx.MoviesArray.type}</h1>
        <ul className={classes["movies-list"]}>
          {moviesList.map((movie) => {
            let storedMovie = ctx.favourites.find((o) => o.id === movie.id);
            let watchedDisabled = storedMovie ? true : false;

            return (
              <li className={classes["movies-item"]} key={movie.id}>
                <button
                  className={classes["add_to_favourites"]}
                  disabled={watchedDisabled}
                  onClick={(e) => {
                    e.preventDefault();
                    ctx.addMoviesToFavourites(movie);
                  }}
                >
                  <i className="bi bi-plus-lg"></i>
                </button>
                <Link to={`/detailsPage/${movie.id}`}>
                  <div id={movie.id} className={classes["movies-link"]}>
                    <img
                      src={`https://image.tmdb.org/t/p/original/${movie["poster_path"]}`}
                      alt="Movie Poster"
                    ></img>
                    <h2 className={classes["movie-name"]}>
                      {movie.title
                        ? movie.title.slice(0, 40)
                        : movie.original_name.slice(0, 40)}
                    </h2>
                    {/* <span className={classes["movie-genre">Action</span>
                  <span className={classes["release-year">
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
        <div className={classes["movie-next-btn"]}>
          {ctx.MoviesArray.results.length > 0 ? (
            <button
              className={classes["nextBtn"]}
              onClick={() => {
                ctx.setPages((prev) => prev + 1);
              }}
            >
              <img
                src={next}
                alt="next icon"
                className={classes["button-icon"]}
              ></img>
            </button>
          ) : (
            <h3 style={{ color: "white", fontWeight: "300" }}>
              Sorry no more results...
            </h3>
          )}
          {ctx.pages > 1 && (
            <button
              className={classes["backBtn"]}
              onClick={() => {
                ctx.setPages((prev) => prev - 1);
              }}
            >
              <img
                src={back}
                alt="back icon"
                className={classes["button-icon"]}
              ></img>
            </button>
          )}
        </div>
      </section>
    );
  } else {
    return <Loading></Loading>;
  }
};
export default CategoryPage;
