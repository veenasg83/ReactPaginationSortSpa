
import React, { Component } from 'react';

class SalesForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: {
                movieName: "",
                genre: "",
                stock: ""
            }
        };
    }


    handleAdd = () => {
        this.props.addMovie(this.state.movies);
        console.log(this.state.movies);
    }

    handleChange = (e) => {
        const movies = { ...this.state.movies };
        movies[e.currentTarget.name] = e.target.value;
        this.setState({ movies });
    }

    render() {
        return (
            <form>
                <div className="form-group">
                    <label for="movie">MovieName</label>
                    <select class="form-control" id="movie">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                </div>
                <div className="form-group">
                    <label for="author">Author</label>
                    <select class="form-control" id="author">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="date">SaleDate</label>
                    <input
                        type="Date"
                        name="date"
                        className="form-control"
                        id="date"
                        placeholder="Enter date"
                    />
                </div>

                <button className="btn btn-primary" onClick={this.handleAdd}>Submit</button>
            </form>

        );
    }
}

export default SalesForm;