import React from 'react';
import { Switch, Route,Redirect } from 'react-router-dom';
import './App.css';
import Header from './modules/Header';
import Sidebar from './modules/Sidebar'
import Dashboard from './modules/Dashboard';
import History from './modules/History';
import Settings from './modules/Settings';

import Test from './modules/test'

function App() {
  return (
    <div className="container-scroller">
      <Header/>
      <div className="container-fluid page-body-wrapper">
        <Sidebar/>       
        <Switch>
          <Route exact path='/' component={Dashboard}/>
          <Route path='/history' component={History}/>
          <Route path='/settings/:option' component={Settings}/>
          <Route path='/test' component={Test}/>
          <Route render={() => <Redirect to={{pathname: "/"}} />} />

        </Switch>
      </div>
    </div>
    
  );
}

export default App;
