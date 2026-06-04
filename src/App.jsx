import React, { useActionState, useEffect, useState } from "react"
import Search from "./components/Search"
import Spinner from "./components/spinner"
import MovieCard from "./components/MovieCard";
import { getTrendingMovies, updateSearchCount } from "./appwrite";

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
  const [trendingMovies, setTrendingMovies] = useState([]);

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
      
      
      if(query && filteredMovies.length > 0){
        await updateSearchCount(query, filteredMovies[0])
      }

    }catch(error){
      console.error(`Error fetching movies ${error}`);
      setErrorMsg("Error fetching movies. Please try again later.");
      setMovieList([]);
    }
    finally{
      setIsLoading(false);
    }
  }

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();

      setTrendingMovies(movies);
      
    } catch (error) {
      console.error(`Error fetching trending movies ${error}`)
    }
  }

  // added debouncing for optimize search functionality:
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMovies(searchTerm)
    },500);
    return() => clearTimeout(timer);
  },[searchTerm]);
  
  useEffect(() => {
    loadTrendingMovies();
  },[])

  return (
    <main>
      <div className = "pattern"/>
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="hero banner"/>
          <h1>Find <span className="text-gradient">Movies </span>You'll Enjoy Without the Hassle</h1>
          <Search searchTerm = {searchTerm} setSearchTerm = {setSearchTerm}/>
        </header>

        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>
            

            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )}

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