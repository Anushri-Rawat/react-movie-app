import { useContext } from "react";
import Context from "../../store/Context";
import playBtn from "../../Assests/play.svg";
import Header from "../Basic Ui Components/Header";
import "./DetailsPage.css";
import { AiFillStar, AiFillHeart } from "react-icons/ai";

const DetailsPage = () => {
  const ctx = useContext(Context);
  console.log(ctx.detailsPage);

  function closeHandler(e) {
    e.preventDefault();
    ctx.setDetailsPage([]);
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
            ></img>
            <figcaption>{cast.name}</figcaption>
          </figure>
        );
      }
    });

    return markup;
  };

  if (!ctx.detailsPage[0].status_code) {
    return (
      <div
        className="detailsPage"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.75)),url("https://image.tmdb.org/t/p/original/${ctx.detailsPage[0].poster_path}")`,
        }}
      >
        <button className="close-btn" onClick={closeHandler}>
          X
        </button>
        <Header />
        <h1>{ctx.detailsPage[0].title}</h1>
        <div className="movie-description">
          <div className="rating-and-type">
            <div className="movie-rating">
              <div className="movie-rating-stars">
                {renderStars(Math.round(3))}
              </div>
              <div className="movie-rating-number">3/5</div>
            </div>
            <div className="movie-detail-type">
              <div>{ctx.detailsPage[0].genres[0].name}</div>
              <div className="movie-length">
                {Math.round(ctx.detailsPage[0].runtime / 60)}hrs{" "}
                {ctx.detailsPage[0].runtime % 60}mins
              </div>
              <div className="movie-release-year">
                {ctx.detailsPage[0].release_date.slice(0, 4)}
              </div>
            </div>
          </div>
          <p>{ctx.detailsPage[0].overview}</p>
          <div className="movies-btn">
            <a
              href={ctx.detailsPage[0].homepage}
              className="movie-trailer-link"
            >
              <img src={playBtn} alt="Play icon"></img> Watch Trailer
            </a>
            <button className="favourite-btn">
              <AiFillHeart style={{ fill: "#eb2f06" }} />
              Add to Favorites
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
  } else {
    return <h2 className="error-msg">{ctx.detailsPage[0].status_message}</h2>;
  }
};
export default DetailsPage;
