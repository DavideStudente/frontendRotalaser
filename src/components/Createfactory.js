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

class Createcustomer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', username: '', isLoaded: false, items: [],  keyA: '', piva: '', name:'', surname:'', id:'', location:'', UserId:''};

    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.displayCustomer = this.displayCustomer.bind(this);
    this.createCustomerPost = this.createCustomerPost.bind(this);
  }

  componentDidMount () {
   
    this.setState({username: sessionStorage.getItem('username')});
    this.setState({keyA: sessionStorage.getItem('token')});
    this.setState({role: sessionStorage.getItem('role')})
    this.setState({UserId: this.props.UserId})
    
  
  }

  handleChange(event) {
      if (event.target.name=="id") {
          this.setState({id: event.target.value})
      }
      if (event.target.name=="location") {
          this.setState({location: event.target.value})

      }
      if (event.target.name=="UserId") {
        this.setState({UserId: event.target.value})
      }
  }


  createCustomerPost(event) {
    var customer=  JSON.stringify({ id: this.state.id, location: this.state.location, UserId: this.state.UserId, CustomerPiva: this.props.customer})
    
    const requestOptions = {
        method: 'POST',
        headers: {'key': sessionStorage.getItem('token'), 'Content-Type': 'application/json'},
        body: customer
        
      };
      console.log(requestOptions)
      fetch('https://localhost:5002/v1/factories', requestOptions)
          .then(response => {
            console.log(response.json())
            if (response.status == 200) {
              this.props.history.goBack();
            }
            else {
              alert("c'è stato un errore")
            }


          })
    event.preventDefault();
            
           
  }


  displayCustomer(){
    
    
    var customerList=[];
    customerList.push(<div><b>Creation Factory</b></div>)
    customerList.push(<form onSubmit={this.createCustomerPost}>
        <label>
          id:    
          <input type="text" name="id" onChange={this.handleChange} />
        </label> <br />
        <label>
          location:
          <input type="text" name="location" onChange={this.handleChange}/>
        </label> <br />
        <label>
          UserId:
          <input type="text" name="UserId" value={this.props.UserId} onChange={this.handleChange}/>
        </label> <br />
        <input type="submit" value="Submit" />
      </form>)
    return customerList
  }

 





  handleSubmit(event) {
    alert('E\' stato inserito un nome: ' + this.state.value);
    event.preventDefault();
  }

  

  render() {
    console.log("STO RENDERIZZANDOOO");
    var cuttersel=this.state.cutterselected;
    console.log(this.state.cutterselected);
    return (
      <Container fluid>
        <Row>
        
          <Col style={{backgroundColor: '#B8860B',  border:'2px solid black'}}>{this.displayCustomer()} </Col>
          
         
        </Row>
        
        
      </Container>
      
    );
  }
}




export default Createcustomer;