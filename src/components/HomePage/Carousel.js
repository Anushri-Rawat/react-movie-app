import "./Carousel.css";
import { useContext, useEffect, useState } from "react";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import Context from "../../store/Context";
import { Link } from "react-router-dom";
import uuid from "react-uuid";
import Loading from "../Basic Ui Components/Loading";
import React from "react";

const Carousel = () => {
  const ctx = useContext(Context);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(3);

  useEffect(() => {
    setLength(ctx.nowPlayingMovie[0].results.length);
  }, [ctx.nowPlayingMovie]);

  const next = () => {
    if (currentIndex < length - 1) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };
  if (ctx.nowPlayingMovie.length > 0) {
    return (
      <div className="carousel-container">
        <div className="carousel-wrapper">
          {currentIndex > 0 && (
            <button onClick={prev} className="left-arrow">
              <AiOutlineLeft style={{ color: "white", fontSize: "10px" }} />
            </button>
          )}
          <div className="carousel-content-wrapper">
            <div
              className="carousel-content"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {ctx.nowPlayingMovie[0].results.map((movie) => {
                return (
                  <div
                    className="banner"
                    key={uuid()}
                    style={{
                      backgroundImage: `linear-gradient(rgba(0, 0,0, 0.2), rgba(0, 0, 0, 0.3)),url("https://image.tmdb.org/t/p/original/${movie.poster_path}")`,
                    }}
                  >
                    <div className="banner-information">
                      <h2>{movie.title}</h2>
                      <div className="genres">Action,adventure,Comedy</div>
                      <div className="watch-viewDetails-btn">
                        <a
                          href={`https://www.youtube.com/results?search_query=${movie.title}`}
                        >
                          Watch
                        </a>
                        <Link to={`/detailsPage/${movie.id}`}>
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {currentIndex < length - 1 && (
            <button onClick={next} className="right-arrow">
              <AiOutlineRight style={{ color: "white", fontSize: "10px" }} />
            </button>
          )}
        </div>
      </div>
    );
  } else return <Loading></Loading>;
};
export default Carousel;
