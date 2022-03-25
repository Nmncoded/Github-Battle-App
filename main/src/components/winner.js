import queryString from 'query-string';
import React from 'react';

import {RiStarSFill} from 'react-icons/ri';
import {BsFillPersonFill} from 'react-icons/bs';
import {CgGitFork} from 'react-icons/cg';
import {FiAlertTriangle} from 'react-icons/fi';
import {Link} from 'react-router-dom';


class Winner extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: null,
            scoreOne:"",
            scoreTwo:"",
        }
    }
    componentDidMount(){
        const params = queryString.parse(this.props.location.search);
        console.log(params);
        let arr = []
        for(const key in params){
            fetch(`https://api.github.com/users/${params[key]}`)
        .then(res => res.json())
        .then(data => {
            arr.push(data);
            if(arr.length === 2){
                const [playerOne,playerTwo] = arr;
            this.setState({
                scoreOne:(playerOne.followers*20)+playerOne.public_repos > (playerTwo.followers*20)+playerTwo.public_repos ? "Winner" : (playerOne.followers*20)+playerOne.public_repos === (playerTwo.followers*20)+playerTwo.public_repos ? "Tie" : "looser",
                scoreTwo: (playerOne.followers*20)+playerOne.public_repos < (playerTwo.followers*20)+playerTwo.public_repos ? "Winner" : (playerOne.followers*20)+playerOne.public_repos === (playerTwo.followers*20)+playerTwo.public_repos ? "Tie" : "looser",
                data:arr,
        })
            }
        })
        }
    }
    componentDidUpdate(){
        console.log(this.state.scoreOne);
        console.log(this.state.scoreTwo);
        
    }

    

    render() {
        // console.log(this.state.data)
        if(!this.state.data){
            return <Loader />
        }
        
        return (
            <>
            <ul className='popular-users'>
            {
                this.state.data.map((item,index) => {
                    return(
                        <li key={item.id} className='single-user'>
                            <h1>{(index === 0) ? this.state.scoreOne: this.state.scoreTwo}</h1>
                            <div className="img"><img src={item.avatar_url} alt={item.id} /></div>
                            <div className='a' >{(item.followers*20)+item.public_repos}</div>
                            <div className='username'><BsFillPersonFill /><a href={`https://api.github.com/users/${item.login}`} >{item.login}</a></div>
                            <div className='stars'>
                                <RiStarSFill />
                                {item.location}
                            </div>
                            <div className='forks'>
                                <CgGitFork />
                                {item.company}
                            </div>
                            <div className='followers'>
                            <FiAlertTriangle />
                            {item.followers} Followers
                            </div>
                            <div className='following'>
                            <FiAlertTriangle />
                            {item.following} Following
                            </div>
                            <div className='issues'>
                                <FiAlertTriangle />
                                {item.public_repos} Repositories
                            </div>
                        </li>
                    )
                })
            }
            </ul>
            
            <div className="btl-btn padding">
            <Link to="/battle" >RESET</Link>
            </div>
            </>
        )
    }
}

function Loader(){
    return (
        <div class="bouncing-loader">
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default Winner;