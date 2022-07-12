import { useContext } from "react";
import Context from "../../store/Context";
import "./ResultCard.css";
import { Link } from "react-router-dom";
import React from "react";
import { AiFillStar } from "react-icons/ai";

const ResultCard = (props) => {
  const ctx = useContext(Context);
  const movie = props.movie;
  console.log(movie);

  return (
    <Link to={`/detailsPage/${movie.id}`} className="resultCard">
      <div className="poster-wrapper">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt={`${movie.title} Poster`}
          ></img>
        ) : (
          <div className="filler-poster"></div>
        )}
        <div className="movie-ratings">
          <div
            style={{
              display: "flex",
              gap: "1.5px",
              alignItems: "center",
              fontSize: "10px",
            }}
          >
            {(movie.vote_average / 2).toFixed(1)}
            <AiFillStar />
          </div>
        </div>
        <Link
          to="/favourites"
          className="control-btn"
          onClick={() => {
            ctx.removeMoviesFromFavourites(movie.id);
          }}
        >
          X
        </Link>
      </div>
      <div className="info">
        <h3 className="movie-title">{movie.title || movie.name}</h3>
        <div className="release-date">
          {movie.release_date ? movie.release_date.substring(0, 4) : "2019"}
        </div>
      </div>
    </Link>
  );
};
export default ResultCard;
