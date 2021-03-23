import logo from './logo.svg';
import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Diecutterlist from './components/Diecutterlist';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter} from 'react-router-dom';
import { Router, Route } from "react-router";
import Diecutterdetails from './components/Diecutterdetails';
import Diecutterwhatif from './components/Diecutterwhatif';
import Login from './components/Login';
import Factorylist from './components/Factorylist';
import Adminview from './components/Adminview';
import Createview from './components/CreateView';
import UpdateView from './components/UpdateView';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      width:  800,
      height: 182
    }
  }

  /**
   * Calculate & Update state of new dimensions
   */
  updateDimensions() {
    if(window.innerWidth < 500) {
      this.setState({ width: 450, height: 102 });
    } else {
      let update_width  = window.innerWidth-100;
      let update_height = Math.round(update_width/4.4);
      this.setState({ width: update_width, height: update_height });
    }
  }

  /**
   * Add event listener
   */
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }
  render() {
    return(
      <body style={{height: '100%'}}>
        <BrowserRouter>
        <div>
          <header>
          <h1>Dashboard</h1>
          </header>
            <Route exact path="/" component={Login} />
            <Route exact path="/admins/:handle/" component={Adminview}/>
            <Route exact path="/users/:handle/factories" component={Factorylist} />
            <Route exact path="/details/:handle" component={Diecutterdetails} />
            <Route exact path="/details/:handle/whatif" component={Diecutterwhatif} />
            <Route exact path="/create" component={Createview}/>
            <Route exact path="/update" component={UpdateView}/>
            
        </div>
      </BrowserRouter>
      </body>
      
    );
  }
}



export default App;
