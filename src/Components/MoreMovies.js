import React from 'react'

function MoreMovies(props) {

    return (
        <>
            {/* <span onClick={() => page > 1 && setPage(page - 1)}>previous</span>
            <span >{page}</span> */}
            <span onClick={() => { props.handelMoreMoviesClick(props.movie) }}> show more</span>
        </>
    )
}

export default MoreMovies
