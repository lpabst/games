import React, { Component } from 'react';
import './Home.css'

import { Link } from 'react-router-dom';
import pressStart from './../../media/pressStart.gif';

class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            showGamesMenu: false,
            hoveringOnGamesMenuParent: false,
            hoveringOnGamesMenu: false,
        }

        this.handleShowGameMenu = this.handleShowGameMenu.bind(this);
    }

    hoverOnGamesMenuParent(){
        this.setState( {hoveringOnGamesMenuParent: true}, this.handleShowGameMenu );
    }

    leaveHoverOnGamesMenuParent(){
        this.setState( {hoveringOnGamesMenuParent: false}, this.handleShowGameMenu );
    }

    hoverOnGamesMenu(){
        this.setState( {hoveringOnGamesMenu: true}, this.handleShowGameMenu );
    }

    leaveHoverOnGamesMenu(){
        this.setState( {hoveringOnGamesMenu: false}, this.handleShowGameMenu );
    }

    handleShowGameMenu(){
        let showGamesMenu = this.state.hoveringOnGamesMenu || this.state.hoveringOnGamesMenuParent;
        this.setState({ showGamesMenu });
    }

    render() {
        let gamesMenuParentBackground = this.state.showGamesMenu ? '#555' : '#333';
        return (
            <section className='routeWrapper'>

                <div className='header'>
                    <ul className='topNav' >
                        <Link to='/art' > Art </Link>
                        <div style={{background: gamesMenuParentBackground}} className='gamesMenuParent' onMouseEnter={() => this.hoverOnGamesMenuParent()} onMouseLeave={() => this.leaveHoverOnGamesMenuParent()} >Games
                            { this.state.showGamesMenu && 
                                <div className='gamesMenu' onMouseEnter={() => this.hoverOnGamesMenu()} onMouseLeave={() => this.leaveHoverOnGamesMenu()}>
                                    <Link to='/pirates' > Pirates </Link>
                                    <Link to='/minesweeper' > Minesweeper </Link>
                                    <a href='http://snake.lorenpabst.com' > Snake </a>
                                </div>
                            }
                        </div>
                    </ul>
                </div>

                <div className='pressStartWrapper' >
                    <img src={pressStart} alt={"arcade game screen"} />
                    <p>Select a game in the header to start playing!!!</p>
                </div>

            </section>
        );
    }
}

export default Home;