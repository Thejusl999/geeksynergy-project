import React from "react";
import './movieList.css';

const MovieList = (props) => {
  return (
    <div className="row row-cols-1 row-cols-md-2 mt-0 g-3 bg-dark px-3">
      {props.movies&&props.movies.map((movie, index) => (
        <div key={index} className="col">
          <div className="card px-2 pb-2 cardBg">
            <div className="row g-0 pt-2 d-flex justify-content-center">
              <div className="col-2 d-flex justify-content-center align-items-center">
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <button className="btn me-1" style={{backgroundColor:'transparent',border:'none',padding:'0'}}>
                    <span aria-label="upvote" role="img" style={{color:'black',fontSize:'1.5rem'}}>&#9650;</span>
                  </button>
                  <span className="me-1">{movie.totalVoted}</span>
                  <button className="btn me-1" style={{backgroundColor:'transparent',border:'none',padding:'0'}}>
                    <span aria-label="downvote" role="img" style={{color:'black',fontSize:'1.5rem'}}>&#9660;</span>
                  </button>
                  <span className="me-1">Votes</span>
                </div>
              </div>
              <div className="col-4 d-flex align-items-center pe-3"> 
                <img src={movie.poster} className="img-fluid border rounded shadow movieImg" alt={movie.title} />
              </div>
              <div className="col-6 cardBody">
                <div className="row d-flex align-items-start">
                  <div className="card-body overflowY-auto">
                    <h5 className="card-title bg-dark text-white text-center p-2 mb-0 rounded">{movie.title}</h5>
                    <p className="card-text mb-0 text-center fs-6 text-primary">{movie.runTime===null?'':`${movie.runTime}Mins | `} {movie.language.length>1?movie.language:''} | {new Date(movie.releasedDate * 1000).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' }).replace(/(\d+)(?:st|nd|rd|th)/, '$1')}</p>
                    <p className="card-text mb-0 text-center fs-6 text-primary">{movie.pageViews} views | Voted by {movie.totalVoted} People</p>
                    <p className="card-text mb-0"><strong>Genre:</strong> {movie.genre}</p>
                    {movie.director[0].length>1&&<p className="card-text mb-0"><strong>Director:</strong>{movie.director}</p>}
                    {movie.stars[0].length>1&&<p className="card-text mb-0"><strong>Starring:</strong>{movie.stars}</p>}
                    {movie.productionCompany[0].length>1&&<p className="card-text mb-0"><strong>Producer:</strong> {movie.productionCompany}</p>}
                    {movie.description.length>0&&<p className="card-text mb-0"><strong>Description:</strong> {movie.description}</p>}
                  </div>
                </div>
              </div>
            </div>
            <div className="row g-0 p-1">
              <button className="btn btn-primary me-2 mt-2">Watch Trailer</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;