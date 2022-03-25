import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Route} from 'react-router-dom';
import './stylesheets/main-style.css';
import Header from './components/header';
import Popular from './components/popular';
import Battle from './components/battle';
import Winner from './components/winner.js';
let root = document.getElementById(`root`);




class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            color:false,
        }
    }
    handleColorClick = () => {
        // console.log("yes")
        this.setState((prev) => {
            return{
                color: !prev.color,
            }
        },() => {
            // console.log("inside")
            root.classList.toggle(`bg-color`);
        })
    }
    render(){
        return(
            <BrowserRouter>
                <Header handleColorClick={ () => this.handleColorClick()} color={this.state.color} />
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
}

ReactDOM.render(<App />,root);