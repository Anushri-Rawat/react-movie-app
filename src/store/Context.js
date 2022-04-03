import { createContext, useEffect, useState } from "react";

const Context = createContext();
const API_KEY = "9d72a0c28c0f596ef447765eb5e600a2";
const BASE_URL = `https://cors-anywhere-venky.herokuapp.com/https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`;
export const ContextProvider = (props) => {
  useEffect(() => {
    getMoviesData();
    getGenresList();
  }, []);
  const [isLoading, setIsLoading] = useState(true);
  const [MoviesArray, setMoviesArray] = useState({});
  const [detailsPage, setDetailsPage] = useState([]);
  const [genre, setGenre] = useState();
  const getMoviesData = async () => {
    const res = await fetch(BASE_URL);
    const data = await res.json();
    setMoviesArray({ ...data, type: "Trending" });
    setIsLoading(!isLoading);
  };

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
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
export default Context;
