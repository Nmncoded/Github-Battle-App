import React from 'react';
import '../stylesheets/main-style.css';
import {BsPersonSquare} from 'react-icons/bs';
import {CgAirplane} from 'react-icons/cg';
import {GiTrophy} from 'react-icons/gi';
import {Link} from 'react-router-dom'; 

class Battle extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            playerOne: "",
            playerTwo: "",
            isClickedOne:false,
            isClickedTwo:false,
            oneImg:"",
            twoImg:"",
        }
    }

    handleInput = ({target}) => {
        let {name,value} = target;
        this.setState({
            [name]:value,
        });
        fetch(`https://api.github.com/users/${value}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data.avatar_url)
            if(name === "playerOne"){
                this.setState({
                    oneImg: data.avatar_url,
                })
            }
            if(name === "playerTwo"){
                this.setState({
                    twoImg: data.avatar_url,
                })
            }
        })
    }
    handleBtnClick = (value) => {
        if(value === "one"){
            this.setState((prev) => {
                return {
                    isClickedOne: !prev.isClickedOne,
                }
            })
        }
        if(value === "two"){
            this.setState((prev) => {
                return {
                    isClickedTwo: !prev.isClickedTwo,
                }
            })
        }
    }
    render(){
        return(
            <section className='battleground' >
                <div className='instructions' >
                    <h2>Instructions</h2>
                    <div className='info' >
                        <div className='users'>
                            Enter two Github users
                            <div><BsPersonSquare /></div>
                        </div>
                        <div className='b-info'>
                            Battle
                            <div><CgAirplane /></div>
                        </div>
                        <div className='winner'>
                            See the winner
                            <div><GiTrophy /></div>
                        </div>
                    </div>
                </div>
                <div className='players'>
                    <h3>Players</h3>
                    <div className='players-info'>
                        <div className='player-one'>
                        <label htmlFor='one' >Player one</label>
                            <div className='p-one-input'>
                                {
                                    this.state.isClickedOne ? <div className='final-name'>
                                        <div><img src={this.state.oneImg} alt="playerone" /></div>
                                    <span>{this.state.playerOne}</span> <span onClick={ () => this.handleBtnClick("one")} >X</span>
                                </div> : <input id='one' type="text" onChange={this.handleInput} value={this.state.playerOne} name="playerOne" placeholder='github username' />
                                }
                                <button onClick={ () => this.handleBtnClick("one")} className={this.state.isClickedOne ? "active-btn" : ""} disabled={!this.state.playerOne} >SUBMIT</button>
                            </div>
                        </div>
                        <div className='player-two'>
                            <label htmlFor='two' >Player Two</label>
                            <div className='p-two-input'>
                                {
                                    this.state.isClickedTwo ? <div className='final-name'>
                                        <div><img src={this.state.twoImg} alt="playertwo" /></div>
                                        <span>{this.state.playerTwo}</span> <span onClick={ () => this.handleBtnClick("two")} >X</span>
                                    </div> : <input id='two' type="text" value={this.state.playerTwo}  onChange={this.handleInput}  name="playerTwo"  placeholder='github username' />
                                }
                                <button  onClick={ () => this.handleBtnClick("two")}  className={this.state.isClickedTwo ? "active-btn" : ""}  disabled={!this.state.playerTwo}>SUBMIT</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="btl-btn">
                    <Link to={`/battle/results?playerOne=${this.state.playerOne}&playerTwo=${this.state.playerTwo}`} className={this.state.isClickedOne === false || this.state.isClickedTwo === false ? 'active-btn' : ""}>BATTLE</Link>
                </div>
            </section>
        )
    }
}

export default Battle;