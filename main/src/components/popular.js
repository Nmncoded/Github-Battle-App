import React from 'react';
import '../stylesheets/main-style.css';
import {NavLink} from 'react-router-dom';
import {RiStarSFill} from 'react-icons/ri';
import {BsFillPersonFill} from 'react-icons/bs';
import {CgGitFork} from 'react-icons/cg';
import {FiAlertTriangle} from 'react-icons/fi';

class Popular extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            languageName: "All",
            data:null,
        }
    }
    handleLanguageClick = (value) => {
        this.setState((prev) => {
            return {
                languageName: value,
                data:null,
            }
        })
        fetch(`https://api.github.com/search/repositories?q=stars:%3E1+language:${this.state.languageName}&sort=stars&order=desc&type=Repositories`)
        .then(res => res.json())
        .then(data => {
            this.setState((prev) => {
                return {
                    data: data.items.sort((a,b) => b.watchers - a.watchers)
                }
            })
        })
    }
    componentDidUpdate(){
        console.log("updated");
        
    }
    componentDidMount(){
        console.log("mount");
        fetch(`https://api.github.com/search/repositories?q=stars:%3E1+language:${this.state.languageName}&sort=stars&order=desc&type=Repositories`)
        .then(res => res.json())
        .then(data => {
            this.setState((prev) => {
                return {
                    data: data.items.sort((a,b) => b.watchers - a.watchers)
                }
            })
        })
    }
    render(){
        if(!this.state.data){
            return <Loader />
        }
        return(
            <section className='popular'>
                <nav className='all-languages'>
                    {
                        ["All","Javascript","Ruby","Java","CSS","Python"].map(language => {
                            return(
                                <li onClick={() => this.handleLanguageClick(language)} className={this.state.languageName === language ? "activ": ""} key={language} >
                                    {language}
                                </li>
                            )
                        })
                    }
                </nav>
                <ul className='popular-users'>
                    {
                        this.state.data.map((item,index) => {
                            if(index === 30)return null;
                            return(
                                <li key={item.id} className='single-user'>
                                    <h1>#{index+1}</h1>
                                    <div className="img"><img src={item.owner.avatar_url} alt={item.owner.id} /></div>
                                    <div className='a' ><a href={item.html_url} >{item.owner.login}</a></div>
                                    <div className='username'><BsFillPersonFill /><a href={`https://api.github.com/users/${item.owner.login}`} >{item.owner.login}</a></div>
                                    <div className='stars'>
                                        <RiStarSFill />
                                        {item.watchers} Stars
                                    </div>
                                    <div className='forks'>
                                        <CgGitFork />
                                        {item.forks} Forks
                                    </div>
                                    <div className='issues'>
                                        <FiAlertTriangle />
                                        {item.open_issues} Open issues
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </section>
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

export default Popular;