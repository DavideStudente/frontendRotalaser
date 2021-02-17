import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import generateData from './generateData';
import Diecutterinfo from './Diecutterinfo';
import {factory1} from '../fakedata/data';
import {diecutters} from '../fakedata/data';
import {factories} from '../fakedata/data';
import  { Redirect } from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: '' , username: '', password: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleChangePassword = this.handleChangePassword.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({username: event.target.value});
    }
    handleChangePassword(event) {
      this.setState({password: event.target.value});
    }
  
    handleSubmit(event) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: this.state.username, password: this.state.password })
      };
      fetch('http://localhost:8080/v1/login', requestOptions)
          .then(response => {
            if (response.status==401) {
              alert("credenziali errate!")
              this.setState({username: ''})
              this.setState({password: ''})
              return "false";
            }
            else {
              return response.json()
            }
          })
            .then(data => {
            if (data=="false") {
              return;
            }
            sessionStorage.setItem('refreshtoken', data.refreshtoken)
            sessionStorage.setItem('token', data.token )
            console.log("QUESTO è il refresh token! " + sessionStorage.getItem('refreshtoken'));
            console.log("QUESTO è il token! " + sessionStorage.getItem('token'));
            this.props.history.push({pathname:'/users/'+ this.state.username +'/factories', state: data.token})});
      //this.props.history.push({path:'/users/'+ this.state.username +'/factories'});
      event.preventDefault();
    }
    //<Link to={"/details/"+information} className="btn btn-primary">SEE DETAILS</Link>
    render() {
      return (
        <Col style={{backgroundColor: '#B8860B',  border:'2px solid black'}}>
            <form onSubmit={this.handleSubmit}>
            <label>
                Username :
                <input type="text" value={this.state.username} onChange={this.handleChange} />
            </label>
            <label>
                Password :
                <input type="password" value={this.state.password} onChange={this.handleChangePassword} />
            </label>
            <input type="submit" value="Submit" />
            </form>
        </Col>
      );
    }
}

export default Login;