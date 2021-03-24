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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


class FactorylistUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', username: '', isLoaded: false, items: [], factoryselected: '', keyA: '', refresh: 0, role: '',
     customerselected: '', users: [], userselected: '', factoriesfiltered: [], usersfiltered:[], reload: false};

    this.changeFactory = this.changeFactory.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.redirectCreationFactory=this.redirectCreationFactory.bind(this);
    this.filterFactories=this.filterFactories.bind(this);
    this.deleteFactory=this.deleteFactory.bind(this);
    
  }

  componentDidMount () {
    var usern=sessionStorage.getItem('username');
    this.setState({username: sessionStorage.getItem('username')});
    this.setState({keyA: sessionStorage.getItem('token')});
    this.setState({role: sessionStorage.getItem('role')})
    this.setState({customerselected: this.props.customer})
    
    //const headers = {'key': this.props.location.state };
    const headers = {'key': sessionStorage.getItem('token') };
    
      fetch("https://foiadev.diag.uniroma1.it:5002/v1/users/"+this.props.user+"/factories", { headers })
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
                )
                
    
     
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
      
        fetch("https://foiadev.diag.uniroma1.it:5002/v1/users/"+this.props.user+"/factories", { headers })
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
                  )
                  
      
       
     
      
    }
     
  }

  changeFactory(event){
    this.setState({factoryselected: event.target.value});
    this.setState({userselected: ''});
    //console.log(this.state.factoryselected);
  }



  redirectCreationFactory() {
    
    this.props.history.push({pathname:'/create', state: {element: "factory", userId: this.props.user, customerId: this.state.customerselected}});
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

      factoriesList.push(<Col><p><Button variant="primary" onClick={this.redirectCreationFactory} > AddFactoryToUser</Button></p></Col>)

      for (i=0 ; i<this.state.factoriesfiltered.length; i++) {
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
      fetch('https://foiadev.diag.uniroma1.it:5002/v1/factories/'+this.state.factoryselected, requestOptions)
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

 

  displayChoose() {
    var factoriesList=[];
    
    
      if (this.state.factoryselected=='') {
        return factoriesList;
      }
      else {
        
        var factorysel=this.state.factoryselected;
        factoriesList.push(<Row><Col><b>YOU ARE IN THE OVERVIEW OF THE FACTORY WITH ID: {this.state.factoryselected}</b></Col>
          <Col xs={1}><button onClick={this.deleteFactory}><FontAwesomeIcon
            icon={faTrashAlt}
            
          /></button></Col>
          </Row>);
        factoriesList.push(<div><DiecutterlistAdmin customer={this.state.customerselected} username={this.state.username} keyA={this.state.keyA} factory={this.state.factoryselected}/></div>)
        return factoriesList;
      }
     
    

    
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
          
    
        </Row>
        <Row>
          <Col style={{backgroundColor: '#B8860B',  border:'2px solid black'}}>{this.displayChoose()} </Col>  
        </Row>
      </Container>
      
    );
  }
}




export default FactorylistUser;