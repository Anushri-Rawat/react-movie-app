import "./Carousel.css";
import { useContext, useEffect, useState } from "react";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import Context from "../../store/Context";
import { Link } from "react-router-dom";
import uuid from "react-uuid";
import Loading from "../Basic Ui Components/Loading";

const Carousel = () => {
  const ctx = useContext(Context);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(3);
  const [nowPlayingMovie, setNowPlayingMovie] = useState([]);

  async function renderCarouselData() {
    const res = await fetch(
      `https://cors-anywhere-venky.herokuapp.com/https://api.themoviedb.org/3/movie/now_playing?api_key=9d72a0c28c0f596ef447765eb5e600a2&language=en-US&page=1`
    );
    const data = await res.json();
    setNowPlayingMovie((prev) => {
      prev = [{ ...data, type: "Now Playing" }];
      return prev;
    });
    setLength(nowPlayingMovie.results ? nowPlayingMovie.results.length : 20);
  }

  async function openDetailsPage(e) {
    ctx.setDetailsPage([]);
    console.log(e.target.parentElement.id);
    const movieDetail = await fetch(
      `https://api.themoviedb.org/3/movie/${e.target.id}?api_key=9d72a0c28c0f596ef447765eb5e600a2&language=en-US`
    );

    const data = await movieDetail.json();
    const castDetails = await fetch(
      `https://api.themoviedb.org/3/movie/${e.target.id}/credits?api_key=9d72a0c28c0f596ef447765eb5e600a2&language=en-US`
    );
    const castDetailsData = await castDetails.json();
    ctx.setDetailsPage((prev) => (prev = [{ ...data, ...castDetailsData }]));
  }

  useEffect(() => {
    renderCarouselData();
  }, []);

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
  if (nowPlayingMovie.length > 0) {
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
              {nowPlayingMovie[0].results.map((movie) => {
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
                        <a href="#">Watch</a>
                        <Link
                          to="/detailsPage"
                          id={movie.id}
                          onClick={openDetailsPage}
                        >
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
