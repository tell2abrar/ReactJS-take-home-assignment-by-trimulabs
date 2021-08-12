import React from 'react';

import './App.css';
import Header from './Header/Header';
import PostJob from './PostJob/PostJob';

const App = ()=>{
    return (
        <div className="app">
            <Header />
            <PostJob />
        </div>
    );
};

export default App;