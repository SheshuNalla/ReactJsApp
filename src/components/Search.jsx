import React from "react"

const Search = ({searchTerm , setSearchTerm}) => {
    return(
        <div className="search">
            <div className="flex">
                <img src="./search.svg"/>
                <input type="text"
                placeholder="Search a movie"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            </div>
            
        </div>
    )
}
export default Search