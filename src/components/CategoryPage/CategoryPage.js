import { useContext } from "react";
import Context from "../../store/Context";
import Header from "../Basic Ui Components/Header";
import Loading from "../Basic Ui Components/Loading";
import DetailsPage from "../DetailsPage/DetailsPage";
import next from "../../Assests/next.svg";
import classes from "./CategoryPage.module.css";
import { Link } from "react-router-dom";
import back from "../../Assests/prev.svg";

const CategoryPage = () => {
  const ctx = useContext(Context);
  const moviesList = ctx.MoviesArray.results;

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

  if (!ctx.isLoading) {
    return (
      <section className={classes["Homepage"]}>
        <Header></Header>
        <h1 className={classes["Homepage-heading"]}>{ctx.MoviesArray.type}</h1>
        <ul className={classes["movies-list"]}>
          {moviesList.map((movie) => {
            return (
              <li className={classes["movies-item"]} key={movie.id}>
                <Link to="/detailsPage">
                  <div
                    id={movie.id}
                    className={classes["movies-link"]}
                    onClick={openDetailsPage}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/original/${movie["poster_path"]}`}
                      alt="Movie Poster Image"
                    ></img>
                    <h2 className={classes["movie-name"]}>
                      {movie.title || movie.original_name}
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
        </div>
      </section>
    );
  } else {
    return <Loading></Loading>;
  }
};
export default CategoryPage;
