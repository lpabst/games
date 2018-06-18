
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home/Home.js';
import Pirates from './components/Pirates/Pirates.js';
import Art from './components/Art/Art';


export default (
    <Switch>
        
        <Route component={ Home } path='/' exact />
        <Route component={ Pirates } path='/pirates' exact />
        <Route component={ Art } path='/art' exact />

    </Switch>
)
