import React, { useActionState, useEffect, useState } from "react"
import Search from "./components/Search"
import Spinner from "./components/spinner"
import MovieCard from "./components/MovieCard";

const API_URL = "http://localhost:3000/movies";

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json'
  }
}

const App = () => {
  const [searchTerm , setSearchTerm] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMsg('');

    try{
      const endpoints = `${API_URL}`;
      const response = await fetch(endpoints, API_OPTIONS);
      if(!response.ok){
        throw new Error('Failed fetching movies')
      }

      const data = await response.json();

      const filteredMovies = query ? data.filter((movie) => 
      movie.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      ) 
      : data;

      setMovieList(filteredMovies)

    }catch(error){
      console.error(`Error fetching movies ${error}`);
      setErrorMsg("Error fetching movies. Please try again later.");
      setMovieList([]);
    }
    finally{
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies(searchTerm);
  }, [searchTerm])
  

  return (
    <main>
      <div className = "pattern"/>
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="hero banner"/>
          <h1>Find <span className="text-gradient">Movies </span>You'll Enjoy Without the Hassle</h1>
          <Search searchTerm = {searchTerm} setSearchTerm = {setSearchTerm}/>
        </header>
        <section className="all-movies">
          <h2>All movies</h2>
          {isLoading ? (
            <Spinner />
          ) : errorMsg ? (
            <p className="text-red-500">{errorMsg}</p>
          ) : (
            <ul>
              {movieList.map((movie) =>(
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}

export default App