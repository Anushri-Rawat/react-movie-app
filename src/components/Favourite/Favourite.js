import { useContext } from "react";
import Context from "../../store/Context";
import Loading from "../Basic Ui Components/Loading";
import ResultCard from "./ResultCard";
import "./ResultCard.css";

const Favourite = () => {
  const ctx = useContext(Context);
  const movie = ctx.favourites;
  if (movie) {
    return (
      <div className="favourite-section">
        <h1>My Watchlist</h1>
        {movie.length > 0 ? (
          <div className="favourite-movies">
            {movie.map((item) => {
              return <ResultCard movie={item} key={movie.imdb_id} />;
            })}
          </div>
        ) : (
          <h2 className="no-movies">No movies in the watch List</h2>
        )}
      </div>
    );
  } else return <Loading></Loading>;
};
export default Favourite;
