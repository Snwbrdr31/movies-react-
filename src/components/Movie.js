import React from 'react';

class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editing: false };
  }

  toggleEdit = () => {
    // everytime you call setState render() gets called!
    this.setState({ editing: !this.state.editing });
  }

  display() {
    return(
      <div className='col s12 m4'>
        <h3>{this.props.movie.title}</h3>
        <button onClick={ this.toggleEdit } className='btn'>Edit</button>
        <button onClick={ () => this.props.deleteMovie(this.props.movie.id) } className='btn red'>Delete</button>
        <iframe
          src={this.props.movie.trailerUrl}
          width='400px'
          height='400px'
        >
        </iframe>
        <i>{this.props.movie.description}</i>
      </div>
    );
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let title = this.refs.title.value;
    let trailerUrl = this.refs.trailerUrl.value;
    let description = this.refs.description.value;

    let updatedMovie = { id: this.props.movie.id, title, trailerUrl, description };
    this.props.editMovie(this.props.movie.id, updatedMovie);
    this.toggleEdit();
  }

  edit() {
    return(
      <div className='col s12 m4'>
        <h3>Editing: {this.props.movie.title}</h3>
        <form onSubmit={ this.handleSubmit } >
          <input ref='title' type='text' required defaultValue={this.props.movie.title} />
          <br />
          <input ref='trailerUrl' type='url' required defaultValue={this.props.movie.trailerUrl} />
          <br />
          <textarea ref='description' required className='materialize-textarea' defaultValue={this.props.movie.description}></textarea>
          <br />
          <button type='button' className='btn grey' onClick={this.toggleEdit}>Cancel</button>
          <input type='submit' className='btn' />
        </form>
      </div>
    );
  }

  render() {
    if(this.state.editing)
      return this.edit();
    else
      return this.display();
  }
}

export default Movie;
