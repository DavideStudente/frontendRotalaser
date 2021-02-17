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
    this.state = {value: '', username: '', isLoaded: false, items: [], factoryselected: '', keyA: '', refresh: 0};

    this.changeFactory = this.changeFactory.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount () {
    var usern=this.props.match.params.handle;
    this.setState({username: this.props.match.params.handle});
    this.setState({keyA: sessionStorage.getItem('token')});
    
    //const headers = {'key': this.props.location.state };
    const headers = {'key': sessionStorage.getItem('token') };
    fetch("http://localhost:8080/v1/users/"+ usern +"/factories", { headers })
            .then(res => 
              {
                if (res.status==401) {
                  console.log("token vecchio e scaduto!" + sessionStorage.getItem('token'));
                  const newTok=refreshToken(sessionStorage.getItem('refreshToken'));
                  //sessionStorage.setItem('token', newTok )
                  //console.log("token nuovo e bellissimo!" + newTok);
                  //console.log("token nuovo e bellissimo!" + sessionStorage.getItem('token'));
                  this.setState({keyA: newTok})
                  
                  this.setState({refresh: 1 })
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
    if (this.state.keyA!=sessionStorage.getItem('token')) {
      //console.log("SONO NELL'UPDATE!" + sessionStorage.getItem('token'))
      this.setState({refresh: 0});
      var usern=this.props.match.params.handle;
      this.setState({username: this.props.match.params.handle});
      this.setState({keyA: sessionStorage.getItem('token')});
      
      //const headers = {'key': this.props.location.state };
      const headers = {'key': sessionStorage.getItem('token') };
      fetch("http://localhost:8080/v1/users/"+ usern +"/factories", { headers })
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
    //console.log(this.state.factoryselected);
  }

  displayFactories() {
    var factoriesList=[];
      var i;
      for (i=0 ; i<this.state.items.length; i++) {
        factoriesList.push(<Col><p><Button variant="primary" value={this.state.items[i].id} onClick={this.changeFactory} > Factory {this.state.items[i].id}</Button></p></Col>);
        //<Link to={"/factories/"+this.state.items[i].id+"/diecutter"} className="btn btn-primary">Factory {this.state.items[i].id}</Link>
      }
    if (this.state.factoryselected=='') {
      return factoriesList;
    }

    else {
      var factorysel=this.state.factoryselected;
      factoriesList.push(<Col><div><b>YOU ARE IN THE OVERVIEW OF THE FACTORY WITH ID: {this.state.factoryselected}</b> </div></Col>);
      factoriesList.push(<div><Diecutterlist username={this.state.username} keyA={this.state.keyA} factory={this.state.factoryselected}/></div>)
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
      </Container>
      
    );
  }
}




export default Factorylist;