import React, { Component } from 'react';
import router from './router';
import { Link } from 'react-router-dom';

import './reset.css';
import './App.css';


class App extends Component {

  render() {
    return (
      <div className="App">

        <div className='homeImage'>
          <Link to='/' ><img src='http://www.redheadscafe.com/images/icons/home.png' alt='home icon' /></Link>
        </div>

        { router }

      </div>
    );
  }
}


export default App;
