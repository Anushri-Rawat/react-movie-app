import { useContext } from "react";
import Context from "../../store/Context";
import "./ResultCard.css";
import { Link } from "react-router-dom";

const ResultCard = (props) => {
  const ctx = useContext(Context);
  const movie = props.movie;

  return (
    <Link
      to="/detailsPage"
      className="resultCard"
      onClick={() =>
        ctx.setDetailsPage((prev) => {
          prev = [{ ...movie }];
          return prev;
        })
      }
    >
      <div className="poster-wrapper">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt={`${movie.title} Poster`}
          ></img>
        ) : (
          <div className="filler-poster"></div>
        )}
        {/* <div className="overlay"></div> */}
        <div className="movie-ratings">
          {(movie.vote_average / 2).toFixed(1)}
        </div>
        <div
          className="control-btn"
          onClick={() => {
            ctx.removeMoviesFromFavourites(movie.id);
          }}
        >
          X
        </div>
      </div>
      <div className="info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="release-date">
          {movie.release_date ? movie.release_date.substring(0, 4) : "2019"}
        </div>
      </div>
    </Link>
  );
};
export default ResultCard;
