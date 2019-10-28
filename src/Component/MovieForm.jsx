
import React, { Component } from 'react';
import $ from 'jquery';

class MovieForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: {
                movieName: this.props.movie.movieName || "",
                genre: this.props.movie.genre || "",
                stock: this.props.movie.stock || "",
                language: this.props.movie.language || "",
                movieId: this.props.movie.movieId
            },
            language: [],

        };
        console.log("props", this.props);

    }

    handleAdd = () => {
        this.props.addMovie(this.state.movies);
        console.log("handleAdd", this.state.movies);
    }

    handleChange = (e) => {
        const movies = { ...this.state.movies };
        movies[e.currentTarget.name] = e.target.value;
        console.log(e.currentTarget.name);
        console.log(e.target.value);
        this.setState({ movies });
        console.log(this.state.movies);
    }

    loadData = () => {
        $.ajax({
            url: "https://localhost:44351/api/Language",
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                this.setState({ language: data })
                console.log("lan", data);
            }.bind(this),
            error: function (error) {
                console.log(error);
            }.bind(this)

        })

    }




    componentDidMount = () => {
        this.loadData();
    }

    render() {
        const { movies } = this.state;
        return (
            <form>
                <div className="form-group">
                    <label htmlFor="movieName">MovieName</label>
                    <input
                        type="text"
                        name="movieName"
                        className="form-control"
                        id="movieName"
                        placeholder="Enter movieName"
                        value={movies.movieName}
                        onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="genre">Genre</label>
                    <input
                        type="text"
                        name="genre"
                        className="form-control"
                        id="genre"
                        placeholder="Enter Genre"
                        value={movies.genre}
                        onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="stock">Stock</label>
                    <input
                        type="text"
                        name="stock"
                        className="form-control"
                        id="stock"
                        placeholder="Enter Stock"
                        value={movies.stock}
                        onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="language">Language</label>
                    <select
                        className="form-control"
                        id="language"
                        name="language"
                        value={movies.language}
                        onChange={this.handleChange}>
                        {this.state.language.map(lang =>
                            <option>{lang.languageName}</option>
                        )}

                    </select>
                </div>


                <button className="btn btn-primary" onClick={this.handleAdd}>Submit</button>
            </form>

        );
    }
}

export default MovieForm;