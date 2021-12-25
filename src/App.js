import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from 'react';
import MovieList from './Components/MovieList';
import MovieListHeading from './Components/MovieListHeading';
import SearchBox from './Components/SearchBox';
import AddFavorate from './Components/AddFavorate';


function App() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("")
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


  return (
    <div className='movie-app'>
      <div className='head'>
        <MovieListHeading heading="Movies" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className='container'>
        <MovieList movies={movies} favorateComponents={AddFavorate} />
      </div>
      <div className='pages'>
        <span onClick={() => page > 1 && setPage(page - 1)}>previous</span>
        <span >{page}</span>
        <span onClick={() => setPage(page + 1)}>next</span>
        <br />
        <br />
      </div>

    </div>
  );
}

export default App;
