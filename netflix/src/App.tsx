import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Tv from "./Routes/Tv";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Header from "./Routes/Components/Header";

function App() {
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <Header></Header>
            <Switch>
                <Route path="/tv">
                    <Tv></Tv>
                </Route>
                <Route path="/search">
                    <Search></Search>
                </Route>
                <Route path={["/", "/movies/:movieId"]}>
                    <Home></Home>
                </Route>
            </Switch>
        </Router>
    );
}

export default React.memo(App);
