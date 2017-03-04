import React from 'react';
import Movie from './Movie';

class Movies extends React.Component {
  constructor(props) {
    super(props);
    let movie = [
                {
                  id: 1,
                  title: 'Lala Land',
                  trailerUrl: 'https://www.youtube.com/embed/0pdqf4P9MB8',
                  description: 'desc'
                },
              ];
    this.state = { movies: movie };
  }

  s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
    }

  guid() {
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
      this.s4() + '-' + this.s4() + this.s4() + this.s4();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // this is where you would make AJAX call to save the movie in the database
    // grab all the values out of the form
    let title = this.refs.title.value;
    let trailerUrl = this.refs.trailerUrl.value;
    let description = this.refs.description.value;
    let movie = { id: this.guid(), title, trailerUrl, description };
    // add a new movie to the movies state
    this.setState({ movies: [...this.state.movies, movie] });
    this.refs.movieForm.reset();
    this.refs.title.focus();
  }

  editMovie = (id, updatedMovie) => {
    // make the ajax call to update the movie the database
    let movies = this.state.movies.map( movie => {
      if(movie.id === id)
        return updatedMovie
      else
        return movie
    });
    this.setState({ movies });
  }

  deleteMovie = (id) => {
    alert('delete movie');
    // loop the movies and remove the one with the matching id
    // HINT: use the javascript filter method to do this
    let movies = this.state.movies.filter ( movie => {
      if(movie.id === id) {
        return false;
      }
        return true;
    });

    this.setState({ movies });
  }

  displayMovies = () => {
    // [<Movie />, <Movie />, <Movie />]
    return this.state.movies.map( movie => {
      return(<Movie key={movie.id} movie={movie} editMovie={this.editMovie} deleteMovie={this.deleteMovie} />);
    });
  }

  render() {
    return(
      <div>
        <h3>{this.props.title}</h3>
        <form ref='movieForm' onSubmit={ this.handleSubmit }>
          <input ref='title' type='text' required placeholder='Movie Title' />
          <br />
          <input ref='trailerUrl' type='url' required placeholder='Trailer URL' />
          <br />
          <textarea
            className='materialize-textarea'
            required
            ref='description'
            placeholder='Movie Description'
          >
          </textarea>
          <br />
          <input type='submit' className='btn' />
        </form>
        <br />
        <div className='row'>
          { this.displayMovies() }
        </div>
      </div>
    );
  }
}

export default Movies;
