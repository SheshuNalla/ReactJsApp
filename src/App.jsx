import React, { useActionState, useEffect, useState } from "react"
import Search from "./components/Search"
import Spinner from "./components/spinner"

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

  const fetchMovies = async () => {
    setIsLoading(true);
    setErrorMsg('');

    try{
      const endpoints = `${API_URL}`;
      const response = await fetch(endpoints, API_OPTIONS);
      if(!response.ok){
        throw new Error('Failed fetching movies')
      }

      const data = await response.json();
      console.log(data);

      if(data.response === 'false'){
        setErrorMsg(data.Error || 'Failed to fetch Movies');
        setMovieList([]);
        return;
      }

      setMovieList(data || [])

    }catch(error){
      console.error(`Error fetching movies ${error}`);
      setErrorMsg("Error fetching movies. Please try again later.")
    }
    finally{
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies();
  }, [])
  

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
                <div id={movie.id}>
                  <img src={movie.thumbnail}></img>
                  <p className="text-white">{movie.title.slice(9)}</p>
                  <p className="text-white">{movie.rating}</p>
                  <a target="_blank" href={movie.trailer} className="text-white hover:underline">{movie.trailer}</a>
                </div>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}

export default App