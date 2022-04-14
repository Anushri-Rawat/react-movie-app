import userImg from "../../Assests/user2.jpg";
import searchBtn from "../../Assests/search.svg";
import "./Header.css";
import { useContext, useEffect, useState } from "react";
import Context from "../../store/Context";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

const Header = () => {
  const ctx = useContext(Context);

  function SearchBarHandler(e) {
    e.target.previousElementSibling.classList.toggle("opensearchbar");
  }

  async function searchHandler(e) {
    e.preventDefault();
    if (e && e.key === "Enter") {
      ctx.setDetailsPage([]);
      ctx.setPages(1);
      ctx.setMovieType((prev) => {
        prev = "Search Results";
        return prev;
      });
      ctx.setUrl((prev) => {
        prev = `
        https://api.themoviedb.org/3/search/movie?api_key=9d72a0c28c0f596ef447765eb5e600a2&language=en-US&page=1&include_adult=false&query=${e.target.value}`;
        return prev;
      });
    }
  }

  function openSideMenuHandler() {
    const sideMenu = document.querySelector(".sidebar");
    sideMenu.classList.toggle("sideMenu");
    document.querySelectorAll(".nav-bar li").forEach((li) => {
      li.addEventListener("click", (e) => {
        setTimeout(() => {
          sideMenu.classList.remove("sideMenu");
        }, 50);
      });
    });
    document.querySelectorAll(".nav-bar a").forEach((li) => {
      li.addEventListener("click", (e) => {
        setTimeout(() => {
          sideMenu.classList.remove("sideMenu");
        }, 50);
      });
    });
  }

  return (
    <div className="header">
      <div className="mobile-header">
        <div className="homePage-logo">
          <h2>MOVEA</h2>
        </div>
        <div className="mobile-header-right-section">
          <div
            className="theme-block"
            onClick={() => {
              ctx.setTheme((prev) => !prev);
              document
                .querySelector("body")
                .classList.remove(
                  `${ctx.theme ? "dark-theme" : "light-theme"}`
                );
              document
                .querySelector("body")
                .classList.add(`${ctx.theme ? "light-theme" : "dark-theme"}`);
            }}
          >
            {ctx.theme ? (
              <i className="bi bi-sun-fill"></i>
            ) : (
              <i className="bi bi-moon-fill"></i>
            )}
          </div>
          <div className="favourites-div">
            <Link to="/favourites">
              My List<div className="fav-btn">{ctx.favourites.length}</div>
            </Link>
          </div>
          <div className="sidemenu-btn">
            <GiHamburgerMenu
              style={{
                fontSize: "1.5rem",
                color: `${ctx.theme ? "white" : "black"}`,
              }}
              onClick={openSideMenuHandler}
            />
          </div>
        </div>
      </div>
      <Link to="/search">
        <div className="search-bar">
          <input
            type="text"
            className="search-input-box"
            onKeyUp={searchHandler}
            placeholder="Search here.Press enter to search."
          ></input>
          <img
            src={searchBtn}
            alt="Search Icon"
            className="search-btn"
            onClick={SearchBarHandler}
          ></img>
        </div>
      </Link>
      <div
        className="theme-block"
        onClick={() => {
          ctx.setTheme((prev) => !prev);
          document
            .querySelector("body")
            .classList.remove(`${ctx.theme ? "dark-theme" : "light-theme"}`);
          document
            .querySelector("body")
            .classList.add(`${ctx.theme ? "light-theme" : "dark-theme"}`);
        }}
      >
        {ctx.theme ? (
          <i className="bi bi-sun-fill"></i>
        ) : (
          <i className="bi bi-moon-fill"></i>
        )}
      </div>
      <div className="favourites-div">
        <Link to="/favourites">
          My List<div className="fav-btn">{ctx.favourites.length}</div>
        </Link>
      </div>
      <div className="app_user">
        <img src={userImg} className="user-image" alt="john doe img"></img>
        <span className="username">John Doe</span>
      </div>
    </div>
  );
};
export default Header;
