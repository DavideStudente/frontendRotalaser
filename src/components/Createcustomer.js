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
    this.state = {value: '', username: '', isLoaded: false, items: [],  keyA: '', piva: '', name:'', surname:''};

    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.displayCustomer = this.displayCustomer.bind(this);
    this.createCustomerPost = this.createCustomerPost.bind(this);
  }

  componentDidMount () {
   
    this.setState({username: sessionStorage.getItem('username')});
    this.setState({keyA: sessionStorage.getItem('token')});
    this.setState({role: sessionStorage.getItem('role')})
    
    //const headers = {'key': this.props.location.state };
    const headers = {'key': sessionStorage.getItem('token') };
    if (sessionStorage.getItem('role') == "admin") {
      fetch("https://foiadev.diag.uniroma1.it:5002/v1/customers", { headers })
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
                    if (result == "false") return;
                    //console.log(result);
                    this.setState({
                      isLoaded: true,
                      items: result
                    });
                    console.log("QUESTI SONO I CUSTOMERS")
                    console.log(result)
                    

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
      if (event.target.name=="piva") {
          this.setState({piva: event.target.value})
      }
      if (event.target.name=="name") {
          this.setState({name: event.target.value})

      }

      if (event.target.name=="surname") {
         this.setState({surname: event.target.value})
      }
    
  }


  createCustomerPost(event) {
    var customer=  JSON.stringify({ piva: this.state.piva, name: this.state.name, surname: this.state.surname})
    var bodycustomer = (JSON.stringify({customer: customer}))
    const requestOptions = {
        method: 'POST',
        headers: {'key': sessionStorage.getItem('token'), 'Content-Type': 'application/json'},
        body: JSON.stringify({ piva: this.state.piva, name: this.state.name, surname: this.state.surname})
        
      };
      console.log(requestOptions)
      fetch('https://foiadev.diag.uniroma1.it:5002/v1/customers', requestOptions)
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
    customerList.push(<div><b>Creation Customer</b></div>)
    customerList.push(<form onSubmit={this.createCustomerPost}>
        <label>
          piva:    
          <input type="text" name="piva" onChange={this.handleChange} />
        </label> <br />
        <label>
          name:
          <input type="text" name="name" onChange={this.handleChange}/>
        </label> <br />
        <label>
          surname:
          <input type="text" name="surname" onChange={this.handleChange}/>
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