import React from 'react';
import '../stylesheets/main-style.css';
import {NavLink} from 'react-router-dom';
import {MdLightbulb,MdFlashlightOn} from 'react-icons/md';


class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            light: false,
        }
    }
    render(){
        return(
            <header className='main-header'>
                <ul className='links'>
                    <li>
                        <NavLink to="/" activeClassName='activ' className="nav-link" >Popular</NavLink>
                    </li>
                    <li>
                        <NavLink to="/battle" activeClassName='activ'  className="nav-link"  >Battle</NavLink>
                    </li>
                </ul>
                <div>{!this.state.light  ? <MdFlashlightOn  className='torch-off' /> : <MdLightbulb  className='torch-on' />}</div>
            </header>
        )
    }
}

export default Header;