import React, { useContext } from "react";
import classes from "./CategoryPage.module.css";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import Context from "../../store/Context";

export default function CategoryCard(props) {
  const movie = props.movie;
  const ctx = useContext(Context);
  return (
    <li className={classes["movies-item"]} key={movie.id}>
      <button
        className={classes["add_to_favourites"]}
        disabled={props.watchedDisabled}
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
}
