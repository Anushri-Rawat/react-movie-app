import { useContext, useEffect } from "react";
import Context from "../../store/Context";
import "./SideBar.css";
import Loading from "../Basic Ui Components/Loading";
import { NavLink } from "react-router-dom";
import React from "react";

const SideBar = () => {
  const ctx = useContext(Context);

  const movieListByCategories = React.useCallback(
    async (e) => {
      ctx.setDetailsPage([]);
      if (e) {
        ctx.setPages(1);
        const movie_type = e.target.textContent
          .replace(/ /g, "_")
          .toLowerCase();
        ctx.setMovieType((prev) => {
          prev = e.target.textContent;
          return prev;
        });
        ctx.setUrl((prev) => {
          prev = `https://api.themoviedb.org/3/movie/${movie_type}?api_key=9d72a0c28c0f596ef447765eb5e600a2`;
          return prev;
        });
      }
    },
    [ctx.pages]
  );

  useEffect(() => {
    movieListByCategories();
  }, [movieListByCategories]);

  async function movieListByGenre(e) {
    ctx.setDetailsPage([]);
    if (e) {
      ctx.setPages(1);
      ctx.setMovieType((prev) => {
        prev = e.target.textContent;
        return prev;
      });
      ctx.setUrl((prev) => {
        prev = `https://api.themoviedb.org/3/discover/movie?api_key=9d72a0c28c0f596ef447765eb5e600a2&with_genres=${e.target.id}`;
        return prev;
      });
    }
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
            <NavLink to="/category">
              <li onClick={movieListByCategories}>Top Rated</li>
            </NavLink>
            <NavLink to="/category">
              <li onClick={movieListByCategories}>Now playing</li>
            </NavLink>
            <NavLink to="/category">
              <li onClick={movieListByCategories}>Popular</li>
            </NavLink>
            <NavLink to="/category">
              <li onClick={movieListByCategories}>Upcoming</li>
            </NavLink>
          </ul>
        </div>
        <div className="sidebar-categories">
          <h2 className="sidebar-title">Categories</h2>
          <ul className="nav-bar">
            {ctx.genre.map((type) => {
              return (
                <NavLink
                  to="/category"
                  onClick={movieListByGenre}
                  key={type.id}
                  id={type.id}
                >
                  {type.name}
                </NavLink>
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
