import userImg from "../../Assests/user2.jpg";
import searchBtn from "../../Assests/search.svg";
import "./Header.css";
import { useContext, useState } from "react";
import Context from "../../store/Context";

const Header = () => {
  const ctx = useContext(Context);
  const [searchQuery, setSearchQuery] = useState("");
  function SearchBarHandler(e) {
    e.target.previousElementSibling.classList.toggle("opensearchbar");
  }

  async function searchHandler(e) {
    e.preventDefault();
    setSearchQuery((prev) => prev + e.target.value);
    if (e.key == "Enter") {
      const res = await fetch(`
    https://api.themoviedb.org/3/search/movie?api_key=9d72a0c28c0f596ef447765eb5e600a2&language=en-US&page=1&include_adult=false&query=${e.target.value}`);
      const data = await res.json();
      ctx.setMoviesArray({ ...data, type: `Search Results` });
      ctx.setDetailsPage([]);
    }
  }

  return (
    <div className="header">
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
      <div className="app_user">
        <img src={userImg} className="user-image"></img>
        <span className="username">John Doe</span>
      </div>
    </div>
  );
};
export default Header;
