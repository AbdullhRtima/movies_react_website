import React from 'react'

class MovieRow extends React.Component {
  viewMovie() {
    // console.log("Trying to view movie")
    // console.log(this.props.movie.title)
    const url = "https://www.themoviedb.org/movie/" + this.props.movie.id
    window.location.href = url
  }

  render() {
    return <table key={this.props.movie.id}>
    <tbody class="container">
      <tr>
        <td>
          <img  class="z-depth-5" alt="poster" width="180" src={this.props.movie.poster_src}/>
        </td>
        <td>
          <h3>{this.props.movie.title}</h3>
          <p >{this.props.movie.overview}</p>
          <input class="waves-effect waves-light btn" type="button" onClick={this.viewMovie.bind(this)} value="View"/>
        </td>
      </tr>
    </tbody>
  </table>
  }
}

export default MovieRow