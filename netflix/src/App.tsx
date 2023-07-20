import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Tv from "./Routes/Tv";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Header from "./Routes/Components/Header";

function App() {
    return (
        <Router>
            <Header></Header>
            <Switch>
                <Route path="/">
                    <Home></Home>
                </Route>
                <Route path="/tv">
                    <Tv></Tv>
                </Route>
                <Route path="/search">
                    <Search></Search>
                </Route>
            </Switch>
        </Router>
    );
}

export default React.memo(App);
