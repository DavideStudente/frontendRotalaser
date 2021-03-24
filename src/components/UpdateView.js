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
import Updatecustomer from './Updatecustomer';
import Updatefactory from './Updatefactory';
import Updatediecutter from './Updatediecutter';
import Updateuser from './Updateuser';


class UpdateView extends React.Component {
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
        return (<Updatecustomer history={this.props.history} customerId={this.props.location.state.customerId}/>)
    }
    if (this.state.objecttocreate=="factory") {
      
      return (<Updatefactory customer={this.props.location.state.customerId} history={this.props.history} UserId={this.props.location.state.userId}/>)
    }
    if (this.state.objecttocreate=="diecutter") {
      return (<Updatediecutter history={this.props.history} diecutter={this.props.diecutter}/>)

    }
    if (this.state.objecttocreate=="user"){
      return (<Updateuser history={this.props.history} customer={this.props.location.state.customerId}/>)
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




export default UpdateView;