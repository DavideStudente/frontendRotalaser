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
import { withRouter } from 'react-router';

class Adminview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', username: '', isLoaded: false, items: [],
     diecutterselected:'', customerselected: '', keyA: '', refresh: 0, role: '', diecutters: [],
    customersfiltered:[], diecuttersfiltered:[]};

    this.changeCustomer = this.changeCustomer.bind(this);
    this.changeDiecutter = this.changeDiecutter.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.redirectCreationCustomer=this.redirectCreationCustomer.bind(this);
    this.redirectCreationDieCutter=this.redirectCreationDieCutter.bind(this);
    this.filterCustomers=this.filterCustomers.bind(this);
    this.filterDiecutters=this.filterDiecutters.bind(this);

  }

  componentDidMount () {
    var usern=this.props.match.params.handle;
    this.setState({username: this.props.match.params.handle});
    this.setState({keyA: sessionStorage.getItem('token')});
    this.setState({role: sessionStorage.getItem('role')});
     

    //const headers = {'key': this.props.location.state };
    const headers = {'key': sessionStorage.getItem('token') };
    if (sessionStorage.getItem('role') == "admin") {
      fetch("https://localhost:5002/v1/customers", { headers })
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
                    this.setState({customersfiltered: this.state.items});   
                    console.log("QUESTI SONO I CUSTOMERS")
                    console.log(result)
                    

                  },
                  // Note: it's important to handle errors here
                  // instead of a catch() block so that we don't swallow
                  // exceptions from actual bugs in components.
                  (error) => {
                    console.log("ERRORE!" + error);
                  }
                ).then( risultato => {


                fetch("https://localhost:5002/v1/diecutters", { headers })
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
                
                      diecutters: result
                    });
                    this.setState({diecuttersfiltered: result})
                    console.log("QUESTI SONO LE DIECUTTERS ")
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
                )
    }
    
     
  }

  componentDidUpdate () {
    if (this.state.keyA!=sessionStorage.getItem('token')) {
      //console.log("SONO NELL'UPDATE!" + sessionStorage.getItem('token'))
      this.setState({refresh: 0});
      var usern=this.props.match.params.handle;
      this.setState({username: this.props.match.params.handle});
      this.setState({keyA: sessionStorage.getItem('token')});
      
      //const headers = {'key': this.props.location.state };
      const headers = {'key': sessionStorage.getItem('token') };
      if (sessionStorage.getItem('role') == "admin") {
        fetch("https://localhost:5002/v1/customers", { headers })
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
                ).then( risultato => {


                  fetch("https://localhost:5002/v1/diecutters", { headers })
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
                  
                        diecutters: result
                      });
                      this.setState({diecuttersfiltered: result})

                      console.log("QUESTI SONO LE DIECUTTERS ")
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
                  )
      }
      
    }
     
  }

  changeCustomer(event){
    this.setState({customerselected: event.target.value});
    this.setState({diecutterselected: ''});
    console.log("CHANGED CUSTOMER!");
  }

  changeDiecutter(event){
    this.setState({diecutterselected: event.target.value});
    this.setState({customerselected: ''});
    console.log("CHANGED DieCutter!");
  }

  displayChoose() {
    var factoriesList=[];
    
    if (this.state.customerselected=='') {
      if (this.state.diecutterselected=='') {
        return factoriesList;
      }
      else {
        
        factoriesList.push(<div><b>YOU ARE IN THE OVERVIEW OF THE DIECUTTER WITH ID: {this.state.diecutterselected}</b> </div>);
        factoriesList.push(<div><Diecutterlistall username={this.state.username} diecutter={this.state.diecutterselected}/></div>)
        return factoriesList;
      }
     
    }

    else {
      
      factoriesList.push(<div><b>YOU ARE IN THE OVERVIEW OF THE CUSTOMER WITH PIVA: {this.state.customerselected} </b> </div>);
      factoriesList.push(<div><FactorylistCustomer customer={this.state.customerselected} history= {this.props.history}/></div>)
      return factoriesList;
      
      
    }
  }

  redirectCreationCustomer(){

    this.props.history.push({pathname:'/create', state: {element: "customer"}});
  }

  redirectCreationDieCutter() {
    this.props.history.push({pathname:'/create', state: {element: "diecutter"}});
  }

  filterCustomers(event) {
    var i;
    if (event.target.value=='') {
      this.setState({customersfiltered: this.state.items})
    }
    var customersfiltered = []
   
    for (i=0; i<this.state.items.length; i++) {
      if ((this.state.items[i].piva).includes(event.target.value)) {
        
        customersfiltered.push(this.state.items[i])
        
        
      }
    }
    this.setState({customersfiltered: customersfiltered})
  }

  displayCustomers() {
    var customersList=[];
      var i;
      customersList.push(<Col><p><input type="text" onChange={this.filterCustomers} />   Search Customers   </p></Col>)
      customersList.push(<Col><p><Button variant="primary" onClick={this.redirectCreationCustomer} > Add Customer</Button></p></Col>)
      for (i=0 ; i<this.state.customersfiltered.length; i++) {
        
        if (this.state.customerselected==this.state.customersfiltered[i].piva) {
          customersList.push(<Col><p><Button variant="dark" value={this.state.customersfiltered[i].piva} onClick={this.changeCustomer} > Customer {this.state.customersfiltered[i].piva}</Button></p></Col>);
        }
        else {
          customersList.push(<Col><p><Button variant="primary" value={this.state.customersfiltered[i].piva} onClick={this.changeCustomer} > Customer {this.state.customersfiltered[i].piva}</Button></p></Col>);

        }
        //<Link to={"/factories/"+this.state.items[i].id+"/diecutter"} className="btn btn-primary">Factory {this.state.items[i].id}</Link>
      }
    
    return customersList
  }


  filterDiecutters(event) {
    var i;
    if (event.target.value=='') {
      this.setState({diecuttersfiltered: this.state.diecutters})
    }
    var diecuttersfiltered = []
   
    for (i=0; i<this.state.diecutters.length; i++) {
      if ((this.state.diecutters[i].id).includes(event.target.value)) {
        
        diecuttersfiltered.push(this.state.diecutters[i])
        
        
      }
    }
    this.setState({diecuttersfiltered: diecuttersfiltered})
  }

  

  displayDiecutters() {
    var diecuttersList=[];
      var i;
      diecuttersList.push(<Col><p><input type="text" onChange={this.filterDiecutters} />   Search Diecutters   </p></Col>)

      diecuttersList.push(<Col><p><Button variant="primary" onClick={this.redirectCreationDieCutter} > Add DieCutter</Button>
      </p></Col>)
      for (i=0 ; i<this.state.diecuttersfiltered.length; i++) {
        if (this.state.diecutterselected==this.state.diecuttersfiltered[i].id) {
          diecuttersList.push(<Col><p><Button variant="dark" value={this.state.diecuttersfiltered[i].id} onClick={this.changeDiecutter} > DieCutter {this.state.diecuttersfiltered[i].id}</Button></p></Col>);

        }
        else {
          diecuttersList.push(<Col><p><Button variant="primary" value={this.state.diecuttersfiltered[i].id} onClick={this.changeDiecutter} > DieCutter {this.state.diecuttersfiltered[i].id}</Button></p></Col>);

        }
        //<Link to={"/factories/"+this.state.items[i].id+"/diecutter"} className="btn btn-primary">Factory {this.state.items[i].id}</Link>
      }
    /*if (this.state.customerselected=='') {
      return customersList;
    }

    else {
      var customersel=this.state.customerselected;
      customersList.push(<Col><div><b>YOU ARE IN THE OVERVIEW OF THE CUSTOMER WITH ID: {this.state.customerselected}</b> </div></Col>);
      customersList.push(<div><FactorylistCustomer customer={this.state.customerselected}/></div>)
      return customersList;
       
      
    }*/
    return diecuttersList;
  }



  handleChange(event) {
    this.setState({value: event.target.value});
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
          <Col style={{backgroundColor: '#B8860B',  border:'2px solid black'}}>{this.displayCustomers()} </Col>
          <Col style={{backgroundColor: '#B8860B',  border:'2px solid black'}}>{this.displayDiecutters()} </Col>
        </Row>
        <Row>
          <Col style={{backgroundColor: '#B8860B',  border:'2px solid black'}}>{this.displayChoose()} </Col>  
        </Row>
        
      </Container>
      
    );
  }
}




export default Adminview;