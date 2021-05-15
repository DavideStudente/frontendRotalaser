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
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Pagination } from 'react-bootstrap';
import PageItem from 'react-bootstrap/PageItem'
import ReactPaginate from 'react-paginate';


const numberOfelement=5;

class Adminview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', username: '', isLoaded: false, items: [], nmbrpages: 0, pagesdiecutter: [], customerpageselected:1,
     diecutterpageselected:1, diecutterselected:'', customerselected: '', keyA: '', refresh: 0, role: '', diecutters: [],
    customersfiltered:[], diecuttersfiltered:[], reload: false};

    this.changeCustomer = this.changeCustomer.bind(this);
    this.changeDiecutter = this.changeDiecutter.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.redirectCreationCustomer=this.redirectCreationCustomer.bind(this);
    this.redirectCreationDieCutter=this.redirectCreationDieCutter.bind(this);
    this.redirectUpdateCustomer=this.redirectUpdateCustomer.bind(this);
    this.redirectUpdateDiecutter=this.redirectUpdateDiecutter.bind(this);
    this.filterCustomers=this.filterCustomers.bind(this);
    this.deleteDiecutter=this.deleteDiecutter.bind(this);
    this.deleteCustomer=this.deleteCustomer.bind(this);
    this.filterDiecutters=this.filterDiecutters.bind(this);
    this.handlePagChange=this.handlePagChange.bind(this);

  }

  componentDidMount () {
    var usern=this.props.match.params.handle;
    this.setState({username: this.props.match.params.handle});
    this.setState({keyA: sessionStorage.getItem('token')});
    this.setState({role: sessionStorage.getItem('role')});
    this.getRequests() 

     
  }

  componentDidUpdate () {
    if (this.state.keyA!=sessionStorage.getItem('token') || this.state.reload==true) {
      this.setState({reload:false})
      
      this.setState({refresh: 0});
      var usern=this.props.match.params.handle;
      this.setState({username: this.props.match.params.handle});
      this.setState({keyA: sessionStorage.getItem('token')});
      this.getRequests();
      //const headers = {'key': this.props.location.state };
    }
  }

  getRequests(){
    const headers = {'key': sessionStorage.getItem('token') };
      if (sessionStorage.getItem('role') == "admin") {
        fetch("https://localhost:5002/v1/customers", { headers })
                .then(res => 
                  {
                    if (res.status==401) {
                      const newTok=refreshToken(sessionStorage.getItem('refreshToken'));
                      
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
                    this.setState({
                      isLoaded: true,
                      items: result
                    });
                    this.setState({customersfiltered: result})
              
                    

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
                       
                        const newTok=refreshToken(sessionStorage.getItem('refreshToken'));
                        
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
              
                      this.setState({
                  
                        diecutters: result
                      });
                      this.setState({diecuttersfiltered: result})
                      

                      
  
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

  changeCustomer(event){
    this.setState({customerselected: event.target.value});
    this.setState({diecutterselected: ''});
 
  }

  changeDiecutter(event){
    this.setState({diecutterselected: event.target.value});
    this.setState({customerselected: ''});
  
  }
  deleteDiecutter(){
    
    const requestOptions = {
        method: 'DELETE',
        headers: {'key': sessionStorage.getItem('token')},
        
      };
    
      fetch('https://localhost:5002/v1/diecutters/'+this.state.diecutterselected, requestOptions)
          .then(response => {
           
            this.setState({diecutterselected: ''})
            this.setState({reload: true})
            if (response.status == 200) {
              
              alert("deleted successfully")
              
            }
            else {
              alert("c'è stato un errore")
            }
          })
  }

  deleteCustomer(){
    
    const requestOptions = {
        method: 'DELETE',
        headers: {'key': sessionStorage.getItem('token')},
        
      };
     
      fetch('https://localhost:5002/v1/customers/'+this.state.customerselected, requestOptions)
          .then(response => {
           
            this.setState({customerselected: ''})
            this.setState({reload: true})
            if (response.status == 200) {
              
              alert("deleted successfully")
              
            }
            else {
              alert("c'è stato un errore")
            }
          })
  }


  displayChoose() {
    var factoriesList=[];
    
    if (this.state.customerselected=='') {
      if (this.state.diecutterselected=='') {
        return factoriesList;
      }
      else {
        
        factoriesList.push(<Row><Col><b>YOU ARE IN THE OVERVIEW OF THE DIECUTTER WITH ID: {this.state.diecutterselected}</b></Col>
        <Col xs={1}><button onClick={this.redirectUpdateDiecutter} ><FontAwesomeIcon
          icon={faPen} 
          
        /></button></Col>
        <Col xs={1}><button onClick={this.deleteDiecutter}><FontAwesomeIcon
          icon={faTrashAlt}
          
        /></button></Col>
        </Row>);
        factoriesList.push(<div><Diecutterlistall username={this.state.username} diecutter={this.state.diecutterselected}/></div>)
        return factoriesList;
      }
     
    }

    else {
      
      factoriesList.push(<Row><Col><b>YOU ARE IN THE OVERVIEW OF THE CUSTOMER WITH ID: {this.state.customerselected}</b></Col>
       
        <Col xs={1}><button onClick={this.redirectUpdateCustomer} ><FontAwesomeIcon
          icon={faPen} 
          
        /></button></Col>
         <Col xs={1}><button onClick={this.deleteCustomer}><FontAwesomeIcon
          icon={faTrashAlt}
          
        /></button></Col>
        </Row>);
      factoriesList.push(<div><FactorylistCustomer customer={this.state.customerselected} history= {this.props.history}/></div>)
      return factoriesList;
      
      
    }
  }

  redirectCreationCustomer(){

    this.props.history.push({pathname:'/create', state: {element: "customer"}});
  }
  
  redirectUpdateCustomer(){

    this.props.history.push({pathname:'/update', state: {element: "customer", customerId: this.state.customerselected}});
  }

  redirectCreationDieCutter() {
    this.props.history.push({pathname:'/create', state: {element: "diecutter"}});
  }

  redirectUpdateDiecutter() {
    this.props.history.push({pathname:'/update', state: {element: "diecutter", diecutterId: this.state.diecutterselected}});
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

  handlePagChange(event) {
    
    
    if (event.target.type.includes("customer")) {
      if (event.target.type == "prevcustomer") {
        if (this.state.customerpageselected != 1) {
          this.setState({customerpageselected: this.state.customerpageselected-1})
        }
        
      }
      else if (event.target.type == "nextcustomer") {
      
        if (this.state.customerpageselected != Math.ceil((this.state.customersfiltered.length)/numberOfelement)) {
          this.setState({customerpageselected: this.state.customerpageselected+1})
        }
      }
      else {
        this.setState({customerpageselected: parseInt(event.target.text)})
      }
    }


    

    else if (event.target.type.includes("diecutter") ) {
      if (event.target.type == "prevdiecutter") {
        if (this.state.diecutterpageselected != 1) {
          this.setState({diecutterpageselected: this.state.diecutterpageselected-1})
        }
        
      }
      else if (event.target.type == "nextdiecutter") {
      
        if (this.state.diecutterpageselected != Math.ceil((this.state.diecuttersfiltered.length)/numberOfelement)) {
          this.setState({diecutterpageselected: this.state.diecutterpageselected+1})
        }
      }
      else {
        this.setState({diecutterpageselected: parseInt(event.target.text)})
      }
      
    }
    

    
    
  }

  paginationInit(length, pageselected, element) {
    let active = 2;
    let items = [];
    length=Math.ceil(length)
    if (length <= 1) {
      return items
    }
    items.push(<Pagination.Item type={"prev"+element.toString()}  onClick={this.handlePagChange}>{"<"}</Pagination.Item>)

    
    for (let number = 1; number <= length; number++) {
      
      if (number==pageselected) {
        
        items.push(
          <Pagination.Item active>
            {number}
          </Pagination.Item>,
        );
      }
      else {
        items.push(
          <Pagination.Item type={element} onClick={this.handlePagChange}>
            {number}
          </Pagination.Item>,
        );
      }
      
    }
    items.push(<Pagination.Item type={"next"+element.toString()}  onClick={this.handlePagChange}>{">"}</Pagination.Item>)

    return items
    //this.setState({pagesdiecutter: items})
  }


  displayCustomers() {
    
    var customersList=[];
      var i;
      customersList.push(<Col><p><input type="text" onChange={this.filterCustomers} />   Search Customers   </p></Col>)
      customersList.push(<Col><p><Button variant="primary" onClick={this.redirectCreationCustomer} > Add Customer</Button></p></Col>)
      var firsttoshow = (this.state.customerpageselected-1)*numberOfelement
      var maxindex
      if (firsttoshow+numberOfelement>this.state.customersfiltered.length) {
        maxindex=this.state.customersfiltered.length;
      }
      else {
        maxindex=firsttoshow+numberOfelement;
      }
      for (i=firsttoshow ; i<maxindex; i++) {
        
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
      var firsttoshow = (this.state.diecutterpageselected-1)*5
      //this.paginationInit(this.state.customersfiltered.length/5);
      var maxindex
      if (firsttoshow+numberOfelement>this.state.diecuttersfiltered.length) {
        maxindex=this.state.diecuttersfiltered.length;
      }
      else {
        maxindex=firsttoshow+numberOfelement;
      }
      for (i=firsttoshow ; i<maxindex; i++) {
        if (this.state.diecutterselected==this.state.diecuttersfiltered[i].id) {
          diecuttersList.push(<Col><p><Button variant="dark" value={this.state.diecuttersfiltered[i].id} onClick={this.changeDiecutter} > DieCutter {this.state.diecuttersfiltered[i].id}</Button></p></Col>);

        }
        else {
          diecuttersList.push(<Col><p><Button variant="primary" value={this.state.diecuttersfiltered[i].id} onClick={this.changeDiecutter} > DieCutter {this.state.diecuttersfiltered[i].id}</Button></p></Col>);

        }
        //<Link to={"/factories/"+this.state.items[i].id+"/diecutter"} className="btn btn-primary">Factory {this.state.items[i].id}</Link>
      }
   
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
    var cuttersel=this.state.cutterselected;
    return (
      <Container fluid>
        <Row>
          <Col style={{backgroundColor: '#B8860B',  border:'2px solid black'}}>{this.displayCustomers()} 
            <Pagination size="sm">
            {this.paginationInit((this.state.customersfiltered.length)/numberOfelement, this.state.customerpageselected, "customer")}
            </Pagination>
          </Col>
          <Col style={{backgroundColor: '#B8860B',  border:'2px solid black'}}>{this.displayDiecutters()} 
            <Pagination size="sm">
            {this.paginationInit((this.state.diecuttersfiltered.length)/numberOfelement, this.state.diecutterpageselected, "diecutter")}
            </Pagination> 
          </Col>
        </Row>
        <Row>
          <Col style={{backgroundColor: '#B8860B',  border:'2px solid black'}}>{this.displayChoose()} </Col>  
        </Row>
        
      </Container>
      
    );
  }
}




export default Adminview;