import React, { Component } from 'react';
import './App.css';
import MovieRow from './MovieRow.js'
import Footer from './footer.js'
import $ from 'jquery'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {}
    // console.log("This is my initializer")

    // const movies = [
    //   {id: 0, poster_src: "https://image.tmdb.org/t/p/w185/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
    //    title: "Avengers: Infinity War", overview: "As the Avengers and their allies have continued to protect the world from threats too large"},
    //   {id: 1, poster_src: "https://image.tmdb.org/t/p/w185/cezWGskPY5x7GaglTTRN4Fugfb8.jpg",
    //    title: "	The Avengers", overview: "This is my second overview"},
    // ]

    // var movieRows = []
    // movies.forEach((movie) => {
    //   console.log(movie.title)
    //   const movieRow = <MovieRow movie={movie} />
    //   movieRows.push(movieRow)
    // })

    // this.state = {rows: movieRows}

    this.performSearch("marvel")
  }

  performSearch(searchTerm) {
    console.log("Perform search using moviedb")
    const urlString =  "https://api.themoviedb.org/3/search/movie?api_key=9865299846e3818ea346b28d014ec7c9&query="+searchTerm 
    $.ajax({
      url: urlString,
      success: (searchResults) => {
        console.log("Fetched data successfully")
         console.log(searchResults)
        const results = searchResults.results
        // console.log(results[0])

        var movieRows = []

        results.forEach((movie) => {
          movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path
          // console.log(movie.poster_path)
          const movieRow = <MovieRow key={movie.id} movie={movie}/>
          movieRows.push(movieRow)
        })

        this.setState({rows: movieRows})
      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data")
      }
    })
  }

  searchChangeHandler(event) {
    console.log(event.target.value)
    const boundObject = this
    const searchTerm = event.target.value
    boundObject.performSearch(searchTerm)
  }

  render() {
    return (
      <div>
        
        <table className ="Navbar">
           <tbody>
             <tr>
               <td>
               <img alt="poster" width="60" src="img/imgDB.png"/>
               </td>
               <td />
               <td>
                 <h2>Movies Home</h2>
               </td>
            </tr>
           </tbody>
        </table>
        <input style={{
          fontSize: 24,
          display: 'block',
          width: "98%",
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 16
        }} onChange={this.searchChangeHandler.bind(this)} placeholder="search here like eg : marvel "/>

        {this.state.rows}
       <Footer/>
      </div>
      
    );
  }
}

export default App;

