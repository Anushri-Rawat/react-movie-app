import { useContext } from "react";
import Context from "../../store/Context";
import "./SideBar.css";
import Loading from "../Basic Ui Components/Loading";

const SideBar = () => {
  const ctx = useContext(Context);
  async function movieListByCategories(e) {
    ctx.setDetailsPage([]);
    const movie_type = e.target.textContent.replace(/ /g, "_").toLowerCase();
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movie_type}?api_key=9d72a0c28c0f596ef447765eb5e600a2&language=en-US&page=1`
    );
    const data = await res.json();
    ctx.setMoviesArray({ ...data, type: `${e.target.textContent}` });
  }

  async function movieListByGenre(e) {
    ctx.setDetailsPage([]);
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=9d72a0c28c0f596ef447765eb5e600a2&with_genres=${e.target.id}`
    );
    const data = await res.json();
    ctx.setMoviesArray({ ...data, type: `${e.target.textContent}` });
  }
  if (ctx.genre) {
    return (
      <section className="sidebar">
        <div className="sidebar-logo">
          <h2>MOVEA</h2>
        </div>
        <div className="sidebar-browse">
          <h2 className="sidebar-title">BROWSE</h2>
          <ul className="nav-bar">
            <li onClick={movieListByCategories}>Top Rated</li>
            <li onClick={movieListByCategories}>TV on the air</li>
            <li onClick={movieListByCategories}>Popular</li>
            <li onClick={movieListByCategories}>Upcoming</li>
          </ul>
        </div>
        <div className="sidebar-categories">
          <h2 className="sidebar-title">Categories</h2>
          <ul className="nav-bar">
            {ctx.genre.map((type) => {
              return (
                <li onClick={movieListByGenre} key={type.id} id={type.id}>
                  {type.name}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    );
  } else {
    return <Loading></Loading>;
  }
};
export default SideBar;
