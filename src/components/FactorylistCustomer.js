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
import DiecutterlistAdmin from './DiecutterlistAdmin';
import {refreshToken} from '../utils/refreshToken';
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  FactorylistUser  from './FactorylistUser';
import { Pagination } from 'react-bootstrap';



const numberOfelement=5;

class FactorylistCustomer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', username: '', isLoaded: false, items: [], factoryselected: '', keyA: '', refresh: 0, role: '',
     userpageselected:1 , factorypageselected:1,
     customerselected: '', users: [], userselected: '', factoriesfiltered: [], usersfiltered:[], reload: false};

    this.changeFactory = this.changeFactory.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.redirectCreationFactory=this.redirectCreationFactory.bind(this);
    this.redirectCreationUser=this.redirectCreationUser.bind(this);
    this.redirectUpdateFactory=this.redirectUpdateFactory.bind(this);
    this.redirectUpdateUser=this.redirectUpdateUser.bind(this);
    this.filterFactories=this.filterFactories.bind(this);
    this.filterUsers=this.filterUsers.bind(this);
    this.deleteFactory=this.deleteFactory.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.handlePagChange=this.handlePagChange.bind(this);

  }

  componentDidMount () {
    var usern=sessionStorage.getItem('username');
    this.setState({username: sessionStorage.getItem('username')});
    this.setState({keyA: sessionStorage.getItem('token')});
    this.setState({role: sessionStorage.getItem('role')})
    this.setState({customerselected: this.props.customer})
    
    //const headers = {'key': this.props.location.state };
    const headers = {'key': sessionStorage.getItem('token') };
    console.log("https://localhost:5002/v1/customers/"+this.props.customer+"/factories")
    
      fetch("https://localhost:5002/v1/customers/"+this.props.customer+"/factories", { headers })
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
                    this.setState({factoriesfiltered: this.state.items})
                    

                  },
                  // Note: it's important to handle errors here
                  // instead of a catch() block so that we don't swallow
                  // exceptions from actual bugs in components.
                  (error) => {
                    console.log("ERRORE!" + error);
                  }
                ).then(res => {
                  fetch("https://localhost:5002/v1/customers/"+this.props.customer+"/users", { headers })
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
                    console.log("TUTTI GLI USERS")
                    console.log(result)
                    if (result == "false") return;
                    //console.log(result);
                    this.setState({
                      isLoaded: true,
                      users: result
                    });
                    this.setState({
                      usersfiltered: this.state.users
                    })
                    

                  },
                  // Note: it's important to handle errors here
                  // instead of a catch() block so that we don't swallow
                  // exceptions from actual bugs in components.
                  (error) => {
                    console.log("ERRORE!" + error);
                  }
                )
                })
    
     
  }

  componentDidUpdate () {
    if (this.state.keyA!=sessionStorage.getItem('token') || this.state.customerselected!=this.props.customer || this.state.reload==true) {
      
      if (this.state.customerselected!=this.props.customer) {
        this.setState({factoryselected: ''})
      }
      //console.log("SONO NELL'UPDATE!" + sessionStorage.getItem('token'))
      this.setState({reload: false})
      this.setState({refresh: 0});
      var usern=sessionStorage.getItem('username');
      this.setState({username: sessionStorage.getItem('username')});
      this.setState({keyA: sessionStorage.getItem('token')});
      this.setState({role: sessionStorage.getItem('role')})
      this.setState({customerselected: this.props.customer})
      
      //const headers = {'key': this.props.location.state };
      const headers = {'key': sessionStorage.getItem('token') };
      
        fetch("https://localhost:5002/v1/customers/"+this.props.customer+"/factories", { headers })
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
                      this.setState({factoriesfiltered: result})
                      
  
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (error) => {
                      console.log("ERRORE!" + error);
                    }
                  ).then(res => {
                    fetch("https://localhost:5002/v1/customers/"+this.props.customer+"/users", { headers })
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
                        users: result
                      });
                      this.setState({usersfiltered: result})
                      
                      
  
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (error) => {
                      console.log("ERRORE!" + error);
                    }
                  )
                  })
      
       
     
      
    }
     
  }

  changeFactory(event){
    this.setState({factoryselected: event.target.value});
    this.setState({userselected: ''});
    //console.log(this.state.factoryselected);
  }

  changeUser(event){
    this.setState({userselected: event.target.value});
    this.setState({factoryselected: ''});
    console.log(this.state.userselected);
  }


  redirectCreationFactory() {
    this.props.history.push({pathname:'/create', state: {element: "factory", customerId: this.state.customerselected}});
  }

  redirectCreationUser() {
    this.props.history.push({pathname:'/create', state: {element: "user", customerId: this.state.customerselected}});
  }

  redirectUpdateFactory() {
    this.props.history.push({pathname:'/update', state: {element: "factory", customerId: this.state.customerselected, factoryId: this.state.factoryselected}});
  }

  redirectUpdateUser() {
    this.props.history.push({pathname:'/update', state: {element: "user", customerId: this.state.customerselected, userId: this.state.userselected}});
  }

  filterFactories(event) {
    var i;
    if (event.target.value=='') {
      this.setState({factoriesfiltered: this.state.items})
    }
    var factoriesfiltered = []
   
    for (i=0; i<this.state.items.length; i++) {
      if ((this.state.items[i].id).includes(event.target.value)) {
        
        factoriesfiltered.push(this.state.items[i])
        
        
      }
    }
    this.setState({factoriesfiltered: factoriesfiltered})
  }


  displayFactories() {
    var factoriesList=[];
      var i;
      factoriesList.push(<Col><p><input type="text" onChange={this.filterFactories} />   Search Factories   </p></Col>)

      factoriesList.push(<Col><p><Button variant="primary" onClick={this.redirectCreationFactory} > AddFactoryToCustomer</Button></p></Col>)

      var firsttoshow = (this.state.factorypageselected-1)*numberOfelement
      var maxindex
      if (firsttoshow+numberOfelement>this.state.factoriesfiltered.length) {
        maxindex=this.state.factoriesfiltered.length;
      }
      else {
        maxindex=firsttoshow+numberOfelement;
      }
      for (i=firsttoshow ; i<maxindex; i++) {
        if (this.state.factoryselected == this.state.factoriesfiltered[i].id) {
          factoriesList.push(<Col><p><Button variant="dark" value={this.state.factoriesfiltered[i].id} onClick={this.changeFactory} > Factory {this.state.factoriesfiltered[i].id}</Button></p></Col>);

        }
        else {
          factoriesList.push(<Col><p><Button variant="primary" value={this.state.factoriesfiltered[i].id} onClick={this.changeFactory} > Factory {this.state.factoriesfiltered[i].id}</Button></p></Col>);

        }
        //<Link to={"/factories/"+this.state.items[i].id+"/diecutter"} className="btn btn-primary">Factory {this.state.items[i].id}</Link>
      }
    
    return factoriesList
  }

  deleteFactory(){
    
    const requestOptions = {
        method: 'DELETE',
        headers: {'key': sessionStorage.getItem('token')},
        
      };
      console.log(requestOptions)
      fetch('https://localhost:5002/v1/factories/'+this.state.factoryselected, requestOptions)
          .then(response => {
           
            this.setState({factoryselected: ''})
            this.setState({reload: true})
            if (response.status == 200) {
              
              alert("deleted successfully")
              
            }
            else {
              alert("c'è stato un errore")
            }
          })
  }

  deleteUser(){
    
    const requestOptions = {
        method: 'DELETE',
        headers: {'key': sessionStorage.getItem('token')},
        
      };
      console.log(requestOptions)
      fetch('https://localhost:5002/v1/users/'+this.state.userselected, requestOptions)
          .then(response => {
           
            this.setState({userselected: ''})
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
    
    if (this.state.userselected=='') {
      if (this.state.factoryselected=='') {
        return factoriesList;
      }
      else {
        
        var factorysel=this.state.factoryselected;
        factoriesList.push(<Row><Col><b>YOU ARE IN THE OVERVIEW OF THE FACTORY WITH ID: {this.state.factoryselected}</b></Col>
          <Col xs={1}><button onClick={this.redirectUpdateFactory} ><FontAwesomeIcon
          icon={faPen} 
          
          /></button></Col>
          <Col xs={1}><button onClick={this.deleteFactory}><FontAwesomeIcon
            icon={faTrashAlt}
            
          /></button></Col>
          </Row>);
        factoriesList.push(<div><DiecutterlistAdmin customer={this.state.customerselected} username={this.state.username} keyA={this.state.keyA} factory={this.state.factoryselected}/></div>)
        return factoriesList;
      }
      
     
    }

    else {
      
      factoriesList.push(<Row><Col><b>YOU ARE IN THE OVERVIEW OF THE USER WITH USERNAME: {this.state.userselected}</b></Col>

        <Col xs={1}><button onClick={this.redirectUpdateUser} ><FontAwesomeIcon
          icon={faPen} 
          
          /></button></Col>
        <Col xs={1}><button onClick={this.deleteUser}><FontAwesomeIcon
          icon={faTrashAlt}
          
        /></button></Col>
        </Row>);
      //TODO list the factories of the users
      console.log("USER SELEZIONATO")
      console.log(this.state.userselected)
      factoriesList.push(<div><FactorylistUser user={this.state.userselected} customer={this.state.customerselected} username={this.state.username} keyA={this.state.keyA} history={this.props.history}/></div>)

      return factoriesList;
      
      
    }
  }

  filterUsers(event) {
    var i;
    if (event.target.value=='') {
      this.setState({usersfiltered: this.state.users})
    }
    var usersfiltered = []
   
    for (i=0; i<this.state.users.length; i++) {
      if ((this.state.users[i].id).includes(event.target.value)) {
        
        usersfiltered.push(this.state.users[i])
        
        
      }
    }
    this.setState({usersfiltered: usersfiltered})
  }

  displayUsers() {
    var usersList=[];
    var i;
    usersList.push(<Col><p><input type="text" onChange={this.filterUsers} />   Search Users   </p></Col>)

    usersList.push(<Col><p><Button variant="primary" onClick={this.redirectCreationUser} > AddUserToCustomer</Button></p></Col>)

    var firsttoshow = (this.state.userpageselected-1)*numberOfelement
    var maxindex
    if (firsttoshow+numberOfelement>this.state.usersfiltered.length) {
      maxindex=this.state.usersfiltered.length;
    }
    else {
      maxindex=firsttoshow+numberOfelement;
    }
    for (i=firsttoshow ; i<maxindex; i++) {
      if (this.state.userselected==this.state.usersfiltered[i].id) {
        usersList.push(<Col><p><Button variant="dark" value={this.state.usersfiltered[i].id} onClick={this.changeUser} > User {this.state.usersfiltered[i].id}</Button></p></Col>);

      }
      else {
        usersList.push(<Col><p><Button variant="primary" value={this.state.usersfiltered[i].id} onClick={this.changeUser} > User {this.state.usersfiltered[i].id}</Button></p></Col>);

      }
      //<Link to={"/factories/"+this.state.items[i].id+"/diecutter"} className="btn btn-primary">Factory {this.state.items[i].id}</Link>
    }
    
    return usersList 
  }


  handlePagChange(event) {
    
    
    if (event.target.type.includes("user")) {
      if (event.target.type == "prevuser") {
        if (this.state.userpageselected != 1) {
          this.setState({userpageselected: this.state.userpageselected-1})
        }
        
      }
      else if (event.target.type == "nextuser") {
      
        if (this.state.userpageselected != Math.ceil((this.state.usersfiltered.length)/numberOfelement)) {
          this.setState({userpageselected: this.state.userpageselected+1})
        }
      }
      else {
        this.setState({userpageselected: parseInt(event.target.text)})
      }
    }


    

    else if (event.target.type.includes("factory") ) {
      console.log(this.state.factorypageselected)
      if (event.target.type == "prevfactory") {
        if (this.state.factorypageselected != 1) {
          
          this.setState({factorypageselected: this.state.factorypageselected-1})
        }
        
      }
      else if (event.target.type == "nextfactory") {
      
        if (this.state.factorypageselected != Math.ceil((this.state.factoriesfiltered.length)/numberOfelement)) {
          
          this.setState({factorypageselected: this.state.factorypageselected+1})
        }
      }
      else {
        
        this.setState({factorypageselected: parseInt(event.target.text)})
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

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('E\' stato inserito un nome: ' + this.state.value);
    event.preventDefault();
  }

  

  render() {
    var cuttersel=this.state.cutterselected;
    console.log(this.state.cutterselected);
    return (
      <Container fluid>
        <Row>
          <Col style={{backgroundColor: '#B8860B',  border:'2px solid black'}}>{this.displayFactories()} 
            <Pagination size="sm">
            {this.paginationInit((this.state.factoriesfiltered.length)/numberOfelement, this.state.factorypageselected, "factory")}
            </Pagination>
          </Col>
          <Col style={{backgroundColor: '#B8860B',  border:'2px solid black'}}>{this.displayUsers()}
          <Pagination size="sm">
            {this.paginationInit((this.state.usersfiltered.length)/numberOfelement, this.state.userpageselected, "user")}
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




export default FactorylistCustomer;