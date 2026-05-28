import React, { useState, useEffect } from "react"
import Search from "./components/Search"

const API_BASE_URL = `http://www.omdbapi.com/?apikey=[${API_KEY}]`
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

const API_OPTIONS = {
  method : "GET",
  headers : {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
  const [searchTerm , setSearchTerm] = useState("");
  const[errorMsg, setErrorMsg] = useState("")

  const fetchMovies = async() => {
    try{
      const endpoint = `${API_BASE_URL}/discover/movies?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);

      alert(response)

    }
    catch(error){
      console.error(`Error fetching movies: ${error}`)
      setErrorMsg("Failed to fetch movies. Please try again later.")

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
        </header>
        <Search searchTerm = {searchTerm} setSearchTerm = {setSearchTerm}/>
        <h1>{searchTerm}</h1>
      </div>
    </main>
  )
}

export default App