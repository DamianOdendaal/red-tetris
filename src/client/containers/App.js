import React from 'react';

import { HashRouter as Router, Route } from 'react-router-dom';

import Join from '../components/Join';
import Tetris from '../components/Tetris';

const App = () => (
    <Router hashType="noslash" >
        <Route path="/" exact component={Join} />
        <Route path="/:RoomName" render={(props) => <Tetris {...props} />}/>
    </Router>
);

export default App;