import React from "react"

const MovieCard = ({movie : {title, rating, thumbnail, releaseYear, duration}}) => {
    return( 
        <div className="movie-card">
            <img 
                src={thumbnail ? thumbnail : `/No movie.png`}
                alt={title}
            />
            <div className="mt-4">
                <h3>{title.slice(9)}</h3>
                <div className="content">
                    <div className="rating">
                        <img src="star.svg" alt="Star Icon"/>
                        <p>{rating ? rating : 'N/A'}</p>
                    </div>
                    <span>•</span>
                    <p className="text-white">{duration ? duration : 'N/A'}</p>
                    <span>•</span>
                    <p className="text-white">{releaseYear ? releaseYear : 'N/A'}</p>
                </div>
            </div>
        </div>
    )
}
export default MovieCard