import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from 'react';
import MovieList from './Components/MovieList';
import MovieListHeading from './Components/MovieListHeading';
import SearchBox from './Components/SearchBox';
import AddFavorate from './Components/AddFavorate';
import RemoveComponent from './Components/RemoveComponent';


function App() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("")
  const [favorates, setFavorates] = useState([]);
  const url = `https://moviesapi.ir/api/v1/movies?q=${searchValue}&page=${page}`;


  // const getMovieRequest = async () => {
  //   const response = await fetch(url);
  //   const responseJson = await response.json();
  //   console.log(responseJson);
  // }
  // useEffect(() => {
  //   getMovieRequest()
  // }, [])

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(d => setMovies(d.data))
  }, [page, searchValue, url])

  useEffect(() => {
    if (favorates) {
      const movieFavorates = JSON.parse(
        localStorage.getItem('react-movie-app-favorates')
      );
      setFavorates(movieFavorates)
    }
  }, [])

  const saveFavorateMovie = (items) => {
    localStorage.setItem('react-movie-app-favorates', JSON.stringify(items));
  }

  const addFavorateMovie = (movie) => {
    const newFavorateList = [...favorates, movie];
    setFavorates(newFavorateList);
    saveFavorateMovie(newFavorateList);
  }
  const RemoveFavorateMovie = (movie => {
    const newFavorateList = favorates.filter(
      (favorates) => favorates.id !== movie.id
    )
    setFavorates(newFavorateList);
    saveFavorateMovie(newFavorateList);
  })
  console.log(favorates);

  return (
    <div className='movie-app'>
      <div className='head'>
        <MovieListHeading heading="Movies" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className='container'>
        <MovieList movies={movies} favorateComponents={AddFavorate}
          handelFavorateClick={addFavorateMovie} />
      </div>
      <div className='pages'>
        <span onClick={() => page > 1 && setPage(page - 1)}>previous</span>
        <span >{page}</span>
        <span onClick={() => setPage(page + 1)}>next</span>
        <br />
        <br />
      </div>
      <div className='favorates'>
        <MovieListHeading heading="favorates" />
      </div>
      <div className='container'>
        <MovieList movies={favorates} favorateComponents={RemoveComponent}
          handelFavorateClick={RemoveFavorateMovie} />
      </div>
    </div>
  );

}

export default App;
