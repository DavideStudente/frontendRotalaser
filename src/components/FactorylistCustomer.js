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
import {refreshToken} from '../utils/refreshToken';


class Factorylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', username: '', isLoaded: false, items: [], factoryselected: '', keyA: '', refresh: 0, role: '',
     customerselected: '', users: [], userselected: '', factoriesfiltered: [], usersfiltered:[]};

    this.changeFactory = this.changeFactory.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.redirectCreationFactory=this.redirectCreationFactory.bind(this);
    this.redirectCreationUser=this.redirectCreationUser.bind(this);
    this.filterFactories=this.filterFactories.bind(this);
    this.filterUsers=this.filterUsers.bind(this);
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
    if (this.state.keyA!=sessionStorage.getItem('token') || this.state.customerselected!=this.props.customer) {
      if (this.state.customerselected!=this.props.customer) {
        this.setState({factoryselected: ''})
      }
      //console.log("SONO NELL'UPDATE!" + sessionStorage.getItem('token'))
      
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
    //console.log(this.state.factoryselected);
  }


  redirectCreationFactory() {
    this.props.history.push({pathname:'/create', state: {element: "factory", customerId: this.state.customerselected}});
  }

  redirectCreationUser() {
    this.props.history.push({pathname:'/create', state: {element: "user", customerId: this.state.customerselected}});
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

      for (i=0 ; i<this.state.factoriesfiltered.length; i++) {
        if (this.state.factoryselected == this.state.factoriesfiltered[i].id) {
          factoriesList.push(<Col><p><Button variant="dark" value={this.state.factoriesfiltered[i].id} onClick={this.changeFactory} > Factory {this.state.factoriesfiltered[i].id}</Button></p></Col>);

        }
        else {
          factoriesList.push(<Col><p><Button variant="primary" value={this.state.factoriesfiltered[i].id} onClick={this.changeFactory} > Factory {this.state.factoriesfiltered[i].id}</Button></p></Col>);

        }
        //<Link to={"/factories/"+this.state.items[i].id+"/diecutter"} className="btn btn-primary">Factory {this.state.items[i].id}</Link>
      }
    /*if (this.state.factoryselected=='') {
      return factoriesList;
    }

    else {
      var factorysel=this.state.factoryselected;
      factoriesList.push(<Col><div><b>YOU ARE IN THE OVERVIEW OF THE FACTORY WITH ID: {this.state.factoryselected}</b> </div></Col>);
      factoriesList.push(<div><Diecutterlist customer={this.state.customerselected} username={this.state.username} keyA={this.state.keyA} factory={this.state.factoryselected}/></div>)
      return factoriesList;
       
      
    }*/
    return factoriesList
  }


  displayChoose() {
    var factoriesList=[];
    
    if (this.state.userselected=='') {
      if (this.state.factoryselected=='') {
        return factoriesList;
      }
      else {
        
        var factorysel=this.state.factoryselected;
        factoriesList.push(<Col><div><b>YOU ARE IN THE OVERVIEW OF THE FACTORY WITH ID: {this.state.factoryselected}</b> </div></Col>);
        factoriesList.push(<div><Diecutterlist customer={this.state.customerselected} username={this.state.username} keyA={this.state.keyA} factory={this.state.factoryselected}/></div>)
        return factoriesList;
      }
     
    }

    else {
      
      factoriesList.push(<div><b>YOU ARE IN THE OVERVIEW OF THE USER WITH ID: {this.state.userselected}</b> </div>);
      //TODO list the factories of the users
      //factoriesList.push(<div><FactorylistCustomer customer={this.state.customerselected} history= {this.props.history}/></div>)
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

    for (i=0 ; i<this.state.usersfiltered.length; i++) {
      if (this.state.userselected==this.state.usersfiltered[i].id) {
        usersList.push(<Col><p><Button variant="dark" value={this.state.usersfiltered[i].id} onClick={this.changeUser} > User {this.state.usersfiltered[i].id}</Button></p></Col>);

      }
      else {
        usersList.push(<Col><p><Button variant="primary" value={this.state.usersfiltered[i].id} onClick={this.changeUser} > User {this.state.usersfiltered[i].id}</Button></p></Col>);

      }
      //<Link to={"/factories/"+this.state.items[i].id+"/diecutter"} className="btn btn-primary">Factory {this.state.items[i].id}</Link>
    }
    /*
    if (this.state.factoryselected=='') {
      return factoriesList;
    }

    else {
      var factorysel=this.state.factoryselected;
      factoriesList.push(<Col><div><b>YOU ARE IN THE OVERVIEW OF THE FACTORY WITH ID: {this.state.userselected}</b> </div></Col>);
      factoriesList.push(<div><Diecutterlist customer={this.state.customerselected} username={this.state.username} keyA={this.state.keyA} factory={this.state.factoryselected}/></div>)
      return factoriesList;
      
      
    }*/
    return usersList 
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
          <Col style={{backgroundColor: '#B8860B',  border:'2px solid black'}}>{this.displayFactories()} </Col>
          <Col style={{backgroundColor: '#B8860B',  border:'2px solid black'}}>{this.displayUsers()} </Col>
    
        </Row>
        <Row>
          <Col style={{backgroundColor: '#B8860B',  border:'2px solid black'}}>{this.displayChoose()} </Col>  
        </Row>
      </Container>
      
    );
  }
}




export default Factorylist;