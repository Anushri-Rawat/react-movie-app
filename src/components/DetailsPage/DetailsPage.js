import { useContext, useEffect } from "react";
import Context from "../../store/Context";
import playBtn from "../../Assests/play.svg";
import Header from "../Basic Ui Components/Header";
import "./DetailsPage.css";
import Loading from "../Basic Ui Components/Loading";
import { AiFillStar, AiFillHeart } from "react-icons/ai";
import React from "react";
import { useParams } from "react-router-dom";

const DetailsPage = () => {
  const ctx = useContext(Context);
  const params = useParams();

  useEffect(() => {
    ctx.openDetailsPage(params.id);
  }, []);

  let watchedDisabled;
  if (ctx.detailsPage.length > 0) {
    let storedMovie = ctx.favourites.find(
      (o) => o.id === ctx.detailsPage[0].id
    );
    watchedDisabled = storedMovie ? true : false;
  }

  const renderStars = (rating) => {
    let markup = [];
    for (let count = 0; count < rating; count++) {
      markup.push(
        <AiFillStar style={{ fill: "#0fd5ff" }} key={Math.random() * 10} />
      );
    }
    for (let count = 0; count < 5 - rating; count++) {
      markup.push(
        <AiFillStar style={{ fill: "#777" }} key={Math.random() * 10} />
      );
    }
    return markup;
  };

  const renderCast = (movieCast) => {
    let markup = [];
    movieCast.forEach((cast, i) => {
      if (i < 6) {
        markup.push(
          <figure className="cast-detail" key={cast.cast_id}>
            <img
              src={`https://image.tmdb.org/t/p/original/${cast["profile_path"]}`}
              alt="cast-profile"
            ></img>
            <figcaption>{cast.name}</figcaption>
          </figure>
        );
      }
    });

    return markup;
  };

  if (ctx.detailsPage.length > 0 && !ctx.detailsPage[0].status_code) {
    return (
      <div
        className="detailsPage"
        style={{
          backgroundImage: `${
            ctx.theme
              ? "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.75))"
              : "linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(50, 55, 114, 0.73))"
          },url("https://image.tmdb.org/t/p/original/${
            ctx.detailsPage[0].poster_path
          }")`,
        }}
      >
        {/* <button className="close-btn" onClick={closeHandler}>
          <AiOutlineArrowLeft style={{ fontSize: "1.2rem" }} />
        </button> */}
        <Header />
        <h1>{ctx.detailsPage[0].title}</h1>
        <div className="movie-description">
          <div className="rating-and-type">
            <div className="movie-rating">
              <div className="movie-rating-stars">
                {renderStars(Math.round(ctx.detailsPage[0].vote_average / 2))}
              </div>
              <div className="movie-rating-number">
                {(ctx.detailsPage[0].vote_average / 2).toFixed(1)}
                /5
              </div>
            </div>
            <div className="movie-detail-type">
              <div>{ctx.detailsPage[0].genres[0].name}</div>
              <span className="dot">.</span>
              <div className="movie-length">
                {Math.round(ctx.detailsPage[0].runtime / 60)}hrs{" "}
                {ctx.detailsPage[0].runtime % 60}mins
              </div>
              <span className="dot">.</span>
              <div className="movie-release-year">
                {ctx.detailsPage[0].release_date.slice(0, 4)}
              </div>
            </div>
          </div>
          <p className="movie-overview">{ctx.detailsPage[0].overview}</p>
          <div className="movies-btn">
            <a
              href={ctx.detailsPage[0].homepage}
              className="movie-trailer-link"
            >
              <img src={playBtn} alt="Play icon"></img> Watch Trailer
            </a>
            <button
              className="favourite-btn"
              disabled={watchedDisabled}
              onClick={() => {
                ctx.addMoviesToFavourites(ctx.detailsPage[0]);
              }}
            >
              <AiFillHeart style={{ fill: "#eb2f06" }} />
              Add to WatchList
            </button>
          </div>
          <div className="cast-details-container">
            <h3>Cast</h3>
            <div className="cast-actor-details">
              {renderCast(ctx.detailsPage[0].cast)}
            </div>
          </div>
          <div className="movie-direction">
            <h3 className="movie-directed-by">Directed By</h3>
            <p className="director-name">
              {ctx.detailsPage[0].production_companies[0]
                ? ctx.detailsPage[0].production_companies[0].name
                : "Michael Dior"}
            </p>
          </div>
        </div>
      </div>
    );
  } else if (ctx.detailsPage.length === 0) {
    return <Loading></Loading>;
  } else {
    return (
      <div className="error-window">
        <h2 className="error-msg">{ctx.detailsPage[0].status_message}</h2>
      </div>
    );
  }
};
export default DetailsPage;
