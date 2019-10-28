import React from 'react';
import logo from './logo.svg';
import './App.css';
import Movie from './Component/movie.jsx';
import NavBar from './Component/NavBar.jsx';
import Customers from './Component/Customers.jsx';
import Rentals from './Component/Rentals.jsx';
import NotFound from './Component/NotFound.jsx';
import MovieForm from './Component/MovieForm.jsx';
import Login from './Component/Login.jsx';
import SalesForm from "./Component/SalesForm.jsx";
import Register from "./Component/Register.jsx";
import { Route, Switch, Redirect } from 'react-router-dom';

function App() {
    return (
        <div className="container">
            <NavBar />

            <Switch>
                <Route path="/movies/:id" component={MovieForm} />
                <Route path="/movies" component={Movie} />
                <Route path="/customers" component={Customers} />
                <Route path="/rentals" component={Rentals} />
                <Route path="/notfound" component={NotFound} />
                <Route path="/login" component={Login} />
                <Route path="/sales" component={SalesForm} />
                <Route path="/register" component={Register} />
                <Redirect from="/" exact to="/movies" />
                <Redirect to="/notfound" />
            </Switch>
        </div>
    );
}

export default App;
