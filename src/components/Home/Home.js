import React, { Component } from 'react';
import './Home.css'

import { Link } from 'react-router-dom';
import pressStart from './../../media/pressStart.gif';

class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            
        }

    }

    componentDidMount(){
        
    }

    render() {
        return (
            <section className='routeWrapper'>

                <div className='header'>
                    <ul className='topNav' >
                        <Link to='/' > Home </Link>
                        <Link to='/pirates' > Pirates </Link>
                        <a href='http://snake.lorenpabst.com' > Snake </a>
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