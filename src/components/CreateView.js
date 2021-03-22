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
import {Link} from 'react-router-dom';
import Diecutterlist from './Diecutterlist';
import Factorylist from './Factorylist';
import FactorylistCustomer from './FactorylistCustomer';
import {refreshToken} from '../utils/refreshToken';
import Diecutterlistall from './Diecutterlistall';
import buttonadd from './addbutton.png'
import Createcustomer from './Createcustomer';
import Createfactory from './Createfactory';
import Creatediecutter from './Creatediecutter';
import Createuser from './Createuser';


class Adminview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', objecttocreate:''};

    this.displayCreation = this.displayCreation.bind(this);
  }

  componentDidMount() {
    
        this.setState({objecttocreate: this.props.location.state.element  })
    

  }
    
     
  
  displayCreation() {
    if (this.state.objecttocreate=="customer") {
        return (<Createcustomer history={this.props.history}/>)
    }
    if (this.state.objecttocreate=="factory") {
      
      return (<Createfactory customer={this.props.location.state.customerId} history={this.props.history}/>)
    }
    if (this.state.objecttocreate=="diecutter") {
      return (<Creatediecutter history={this.props.history}/>)

    }
    if (this.state.objecttocreate=="user"){
      return (<Createuser history={this.props.history} customer={this.props.location.state.customerId}/>)
    }
  }


  

  render() {
    
    var cuttersel=this.state.cutterselected;
    console.log(this.state.cutterselected);
    return (
      <Container fluid>
        {this.displayCreation()}
        
      </Container>
      
    );
  }
}




export default Adminview;