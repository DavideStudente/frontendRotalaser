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


class Warninglist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', username: '', isLoaded: false, warnings: [], factory:'', keyA: ''};

    this.changeFactory = this.changeFactory.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({username: this.props.username});
    this.setState({keyA: sessionStorage.getItem('token')});
    this.setState({factory: this.props.factory});
    
    const headers = {'key': sessionStorage.getItem('token') };
    fetch("https://localhost:8080/v1/factories/"+ this.props.factory+"/warnings", { headers })
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
                  warnings: result
                });
                //alert('A name was submitted: ' + this.state.items);
                console.log("LISTA WARNINGS PERVENUTA");
                console.log(this.state.warnings)
                

              },
              // Note: it's important to handle errors here
              // instead of a catch() block so that we don't swallow
              // exceptions from actual bugs in components.
              (error) => {
                alert("ERRORE!" + error);
              }
            )
}


componentDidUpdate() {
  if (this.state.factory!=this.props.factory || this.state.keyA!=sessionStorage.getItem('token')) {
    this.setState({username: this.props.username});
    this.setState({keyA: sessionStorage.getItem('token')});
    this.setState({factory: this.props.factory});
    
    const headers = { 'key': sessionStorage.getItem('token') };
    fetch("https://localhost:8080/v1/factories/"+ this.props.factory+"/warnings", { headers })
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
                  warnings: result
                });
                //alert('A name was submitted: ' + this.state.items);
                console.log("LISTA WARNINGS PERVENUTA");
                console.log(this.state.warnings)
                
                

              },
              // Note: it's important to handle errors here
              // instead of a catch() block so that we don't swallow
              // exceptions from actual bugs in components.
              (error) => {
                alert("ERRORE!" + error);
              }
            )
    }
   
}

  changeFactory(event){
    this.setState({factoryselected: event.target.value});
    //console.log(this.state.factoryselected);
  }

  displayWarnings() {
      var warningsList=[];
      var i;
      for (i=0; i<this.state.warnings.length; i++) {
          if (this.state.warnings[i].severity=='critical') {
            warningsList.push(<p><Button variant="danger" value={this.state.warnings[i].DieCutterId}> DieCutter {this.state.warnings[i].DieCutterId} is in a critical state</Button></p>)
          }
          else if (this.state.warnings[i].severity=='warning') {
            warningsList.push(<p><Button variant="warning" value={this.state.warnings[i].DieCutterId}> DieCutter {this.state.warnings[i].DieCutterId} is in a warning state</Button></p>)
          }
          
      }
      return warningsList;
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
     
      <div>{this.displayWarnings()} </div>
      
    );
  }
}




export default Warninglist;