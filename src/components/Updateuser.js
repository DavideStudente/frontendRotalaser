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
    this.state = {value: '', username: '', isLoaded: false, items: [],  keyA: '', CustomerPiva:'', id:'', role:'standard'};

    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.displayCustomer = this.displayCustomer.bind(this);
    this.createUserUpdate = this.createUserUpdate.bind(this);
  }

  componentDidMount () {
   
    this.setState({username: sessionStorage.getItem('username')});
    this.setState({keyA: sessionStorage.getItem('token')});
    this.setState({CustomerPiva: this.props.customer})
    const headers = {'key': sessionStorage.getItem('token') };
   if (sessionStorage.getItem('role') == "admin") {
     console.log("https://localhost:5002/v1/users/"+this.props.userId)
     fetch("https://localhost:5002/v1/users/"+this.props.userId, { headers })
               .then(res => 
                 {
                   if (res.status==401) {
                     //console.log("token vecchio e scaduto!" + sessionStorage.getItem('token'));
                     const newTok=refreshToken(sessionStorage.getItem('refreshToken'));
                     //sessionStorage.setItem('token', newTok )
                     //console.log("token nuovo e bellissimo!" + newTok);
                     //console.log("token nuovo e bellissimo!" + sessionStorage.getItem('token'));
                     this.setState({keyA: newTok})
                     return "false";
                     
                   }
                   else {
                     return res.json()
                   }
                 })
               .then(
                 (result) => {
                   console.log(result)
                   if (result == "false") return;
                   //console.log(result);
                   this.setState({userGET: result})
                   this.setState({id: result.id })
                   this.setState({password: false})
                 
                     

                 },
                 // Note: it's important to handle errors here
                 // instead of a catch() block so that we don't swallow
                 // exceptions from actual bugs in components.
                 (error) => {
                   console.log("ERRORE!" + error);
                 }
               
               
               )
   }
   
    
 }

  handleChange(event) {
      if (event.target.name=="id") {
          this.setState({id: event.target.value})
      }
     
      if (event.target.name=="password") {
        this.setState({password: event.target.value})
      }
  }


  createUserUpdate(event) {
    if (this.state.password==false) {
      var user=  JSON.stringify({ id: this.state.id})
    }
    else {
      var user=  JSON.stringify({ id: this.state.id, password: this.state.password})
    }
    
    const requestOptions = {
        method: 'PUT',
        headers: {'key': sessionStorage.getItem('token'), 'Content-Type': 'application/json'},
        body: user
        
      };
      console.log(requestOptions)
      fetch('https://localhost:5002/v1/users/'+this.props.userId, requestOptions)
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
    customerList.push(<div><b>Creation User</b></div>)
    customerList.push(<form onSubmit={this.createUserUpdate}>
        <label>
          username:    
          <input type="text" name="id" value={this.state.id} onChange={this.handleChange} />
        </label> <br />
        <label>
          password:
          <input type="password" name="password" onChange={this.handleChange}/>
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