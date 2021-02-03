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
      this.state = {value: '' , username: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({username: event.target.value});
    }
  
    handleSubmit(event) {
      
      this.props.history.push('/user/'+ this.state.username +'/factories');
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
            <input type="submit" value="Submit" />
            </form>
        </Col>
      );
    }
}

export default Login;