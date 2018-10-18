import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';
import MovieRow from './MovieRow';

class App extends Component {
  constructor(props){
    super (props)
    this.state ={}
    // console.log('we are here ')
    // const movies =[
    //   {id :0, imgpath : '/img/m1.jpg' , title: " Avenger : Infinity war " ,overview : " smaple text "},
    //   {id :0 ,imgpath : '/img/m1.jpg' , title: " Avenger : Infinity war " ,overview : " smaple text "}
    //   ]
    // this.state ={
    //   rows :[
    //     <p key ="1">this is row 1</p>,
    //     <p key ="2">this is row 2</p>,
    //     <p key ="3">this is row 3</p>
    //   ]
    // }
    
    // var movieRows =[] 
    // movies.forEach((movie)=>{
    //   console.log(movie.title)
    //   const movieRow = <MovieRow movie ={movie}/>
    //   movieRows.push(movieRow)
    // })
    // this.state ={ rows : movieRows}
    this.preformSerch("marvel")
  }
    preformSerch(searchTerm){
      console.log("i am here baby ");
      const urlString = "https://api.themoviedb.org/3/search/movie?api_key=9865299846e3818ea346b28d014ec7c9&query=" + searchTerm 
      $.ajax({
      url :urlString ,
      success : (searchResults) => {
        console.log("success data is here ")
        console.log(searchResults);
        const results = searchResults.results 
        var movieRows = []

        results.forEach((movie) => {
          movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path
          // console.log(movie.poster_path)
          const movieRow = <MovieRow key={movie.id} movie={movie}/>
          movieRows.push(movieRow)
        })

        this.setState({rows: movieRows})
      },
      error : (xhr ,state ,err ) => {
        console.error(" error so sade for u baby ")
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
      <div className="App">
        <table className ="Navbar">
          <tbody>
            <tr>
              <td>
              <img alt="image icon " width="50" src="img/imgDB.png"/>
              </td>
              <td width="8" />
              <td>
                <h1>Movies Home</h1>
              </td>
            </tr>
          </tbody>
        </table>
        <input style={{
          fontSize: 24,
          display: 'block',
          width: "99%",
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 16
        }} onChange={this.searchChangeHandler.bind(this)} placeholder="Enter search term"/>
        {this.state.rows}
      </div>
    );
  }
}

export default App;
