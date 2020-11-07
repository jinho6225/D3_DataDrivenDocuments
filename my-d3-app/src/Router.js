import React from 'react';
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import Home from './Home';
import Profile from './Profile';
import Detail from './Detail';


const AppRouter = () => {
    return (
        <Router>
            <Switch>
                    <>
                        <Route exact path='/'>
                            <Home />
                        </Route>
                        <Route path='/profile'>
                            <Profile />
                        </Route>
                        <Route path='/detail/:company_name'>
                            <Detail />
                        </Route>

                    </>
            </Switch>
        </Router>
    )
}

export default AppRouter