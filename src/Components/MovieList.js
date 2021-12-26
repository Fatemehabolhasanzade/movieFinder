import React from 'react'
import AddFavorate from './AddFavorate'

export default function MovieList(props) {
    const FavorateComponents = props.favorateComponents

    return (
        <>
            {props.movies.map((movie, index) =>
                <div key={index} className='poster d-flex justify-content-start m-3'>
                    <img src={movie.poster} alt="movie poster" style={{
                        width: 240,
                        height: 360
                    }} />
                    <div className='overly d-flex align-item-center justify-content-center'
                        onClick={() => props.handelFavorateClick(movie)}>
                        <FavorateComponents />
                    </div>
                </div>
            )}
        </>
    )
}
