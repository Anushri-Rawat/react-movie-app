import { createContext, useEffect, useState, useReducer } from "react";

const Context = createContext();
const API_KEY = "9d72a0c28c0f596ef447765eb5e600a2";
// const BASE_URL = ;
const favourites = localStorage.getItem("watchList")
  ? JSON.parse(localStorage.getItem("watchList"))
  : [];

export const ContextProvider = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [MoviesArray, setMoviesArray] = useState({});
  const [detailsPage, setDetailsPage] = useState([]);
  const [genre, setGenre] = useState();
  const [pages, setPages] = useState(1);
  const [movieType, setMovieType] = useState("Trending");
  const [url, setUrl] = useState(
    `https://cors-anywhere-venky.herokuapp.com/https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`
  );
  const [nowPlayingMovie, setNowPlayingMovie] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getMoviesData(url);
  }, [pages, url]);

  useEffect(() => {
    getGenresList();
    renderCarouselData();
  }, []);

  const [state, dispatch] = useReducer(AppReducer, favourites);

  const addMoviesToFavourites = (movie) => {
    dispatch({ type: "ADD_MOVIE_TO_FAVOURITE", payload: movie });
  };

  const removeMoviesFromFavourites = (id) => {
    dispatch({ type: "REMOVE_MOVIE_FROM_FAVOURITE", payload: id });
  };

  function AppReducer(state, action) {
    switch (action.type) {
      case "ADD_MOVIE_TO_FAVOURITE":
        return [action.payload, ...state];
      case "REMOVE_MOVIE_FROM_FAVOURITE":
        return state.filter((movie) => movie.id != action.payload);
      default:
        return state;
    }
  }
  const getMoviesData = async (url) => {
    const res = await fetch(`${url}&language=en-US&page=${pages}`);
    const data = await res.json();
    setMoviesArray((prev) => {
      return { prev, ...data, type: movieType };
    });
    setIsLoading((prev) => !prev);
  };

  async function renderCarouselData() {
    const res = await fetch(
      `https://cors-anywhere-venky.herokuapp.com/https://api.themoviedb.org/3/movie/now_playing?api_key=9d72a0c28c0f596ef447765eb5e600a2&language=en-US&page=1`
    );
    const data = await res.json();
    setNowPlayingMovie((prev) => {
      prev = [{ ...data, type: "Now Playing" }];
      return prev;
    });
  }

  async function openDetailsPage(url) {
    setDetailsPage([]);
    const movieDetail = await fetch(
      `https://api.themoviedb.org/3/movie/${url}?api_key=9d72a0c28c0f596ef447765eb5e600a2&language=en-US`
    );

    const data = await movieDetail.json();
    const castDetails = await fetch(
      `https://api.themoviedb.org/3/movie/${url}/credits?api_key=9d72a0c28c0f596ef447765eb5e600a2&language=en-US`
    );
    const castDetailsData = await castDetails.json();
    setDetailsPage((prev) => (prev = [{ ...data, ...castDetailsData }]));
  }

  useEffect(() => {
    localStorage.setItem("watchList", JSON.stringify(state));
  }, [state]);

  const getGenresList = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=9d72a0c28c0f596ef447765eb5e600a2&language=en-US`
    );
    const data = await res.json();
    setGenre(data.genres);
  };
  return (
    <Context.Provider
      value={{
        isLoading,
        setIsLoading,
        MoviesArray,
        setMoviesArray,
        setDetailsPage,
        detailsPage,
        genre,
        favourites: state,
        addMoviesToFavourites,
        removeMoviesFromFavourites,
        pages,
        setPages,
        getMoviesData,
        movieType,
        setMovieType,
        url,
        setUrl,
        nowPlayingMovie,
        openDetailsPage,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
export default Context;
