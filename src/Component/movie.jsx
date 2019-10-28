import React, { Component } from 'react';
import $ from 'jquery';
import Paginate from './Common/Paginate.jsx';
import { paginate } from '../utils/paginate.js';
import MovieForm from './MovieForm.jsx';
import { Link } from 'react-router-dom';
import SearchBox from './Common/SearchBox.jsx';
import _ from 'lodash';

class Movie extends Component {

    state = {
        movies: [],
        pageSize: 4,
        currentPage: 1,
        showForm: false,
        editMovie: {},
        sortedColumn: {
            path: "",
            order: "asc"
        },
        searchQuery: ""
    }

    componentDidMount() {
        this.loadData();

    }

    loadData = () => {
        $.ajax({
            url: "https://localhost:44351/api/movie",
            type: "GET",
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                this.setState({ movies: data });
                console.log(this.state.movies);
            }.bind(this),
            error: function (error) {
                console.log(error);
            }.bind(this)
        })
    }

    onPageChange = (page) => {
        this.setState({
            currentPage: page
        })
    }

    addNewMovie = () => {
        this.setState({ showForm: true });


    }

    handleEdit = (movie) => {
        this.setState({ showForm: true });
        this.setState({ editMovie: movie })
    }


    handleAddMovie = (movie) => {
        if (movie.movieId == "") {
            console.log("moviein handle Add", movie);
            $.ajax({
                url: "https://localhost:44351/api/movie",
                type: 'POST',
                datatype: "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(movie),
                success: function (response) {
                    this.loadData();
                    this.setState({ showForm: false });
                    console.log(response);
                }.bind(this),
                error: function (error) {
                    console.log("errtttttor", error);
                }.bind(this)
            })
        }
        else {
            $.ajax({
                url: "https://localhost:44351/api/movie/editMovie",
                type: 'PUT',
                datatype: "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(movie),
                success: function (response) {
                    this.loadData();
                    this.setState({ showForm: false });
                    console.log(response);
                }.bind(this),
                error: function (error) {
                    console.log("errtttttor", error);
                }.bind(this)
            })

        }
    }

    handleSort = (path) => {
        this.setState({ sortedColumn: { path, order: 'asc' } });
    }

    handleSearch = query => {
        this.setState({ searchQuery: query, currentPage: 1 });
    }

    render() {
        return (
            this.state.showForm ? this.renderAdd() : this.renderTable())
    }
    renderTable() {
        const { movies, pageSize, currentPage, sortedColumn, searchQuery } = this.state
        let searchmovie = movies;
        if (searchQuery)
            searchmovie = movies.filter(m => m.movieName.toLowerCase().startsWith(searchQuery.toLowerCase()));

        const sortedmovies = _.orderBy(searchmovie, sortedColumn.path, sortedColumn.order);
        const paginatedMovies = paginate(sortedmovies, currentPage, pageSize);
        return (
            <div>
                <div>
                    <button onClick={this.addNewMovie}> NewMovie</button>
                </div>

                <SearchBox value={searchQuery} onChange={this.handleSearch} />

                <table className="table">
                    <thead>
                        <tr>
                            <th onClick={() => this.handleSort('title')}>MovieName</th>
                            <th onClick={() => this.handleSort('genre')}>Genre</th>
                            <th onClick={() => this.handleSort('stock')}>Stock</th>
                            <th onClick={() => this.handleSort('language')}>Language</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedMovies.map(movie => <tr key={movie.movieId}>
                            <td><Link to={`/movies/${movie.movieId}`}>{movie.movieName}</Link></td>
                            <td>{movie.genre}</td>
                            <td>{movie.stock}</td>
                            <td>{movie.language}</td>
                            <td><button onClick={() => { this.handleEdit(movie) }}>Edit </button></td>
                        </tr>)}

                    </tbody>
                </table>
                <Paginate totalCount={movies.length} pageSize={pageSize} currentPage={currentPage} onChange={this.onPageChange} />

            </div>
        )
    }

    renderAdd() {
        return (<MovieForm movie={this.state.editMovie} addMovie={this.handleAddMovie} />)

    }
}

export default Movie;