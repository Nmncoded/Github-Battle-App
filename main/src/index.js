import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Route} from 'react-router-dom';
import './stylesheets/main-style.css';
import Header from './components/header';
import Popular from './components/popular';
import Battle from './components/battle';
import Winner from './components/winner.js';



function App(props){
    return(
        <BrowserRouter>
            <Header />
            <Route path="/" exact>
                <Popular />
            </Route>
            <Route path="/battle" exact>
                <Battle />
            </Route>
            <Route path="/battle/results" component={Winner} />
        </BrowserRouter>
    )
}

ReactDOM.render(<App />,document.getElementById(`root`));