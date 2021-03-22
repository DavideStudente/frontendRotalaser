import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import generateData from './generateData';
import {factory1} from '../fakedata/data';
import {diecutters} from '../fakedata/data';
import {factories} from '../fakedata/data';
import getFactoryFromDieCutter from '../functionsGetData/getFactoryFromDieCutter';
import getOwnerFromFactory from '../functionsGetData/getOwnerFromFactory';
import getDieCutterFromId from '../functionsGetData/getDieCutterFromId';
import {Link} from 'react-router-dom';
import {refreshToken} from '../utils/refreshToken';


class Diecutterinfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        value: "", cutter: "", isLoaded:false, diecutter: '', warnings: [], keyA:''
    };
    this.displayStatus = this.displayStatus.bind(this);
  }

  componentDidUpdate() {

    if (this.state.cutter!=this.props.dataParentToChild[0] || this.state.keyA!=sessionStorage.getItem('token')) {
      this.setState({username: this.props.username});
      this.setState({keyA: sessionStorage.getItem('token')});
      this.setState({cutter: this.props.dataParentToChild[0]});
      const headers = { 'key': sessionStorage.getItem('token') };
      fetch("https://foiadev.diag.uniroma1.it:5002/v1/diecutters/"+this.props.dataParentToChild[0], { headers })
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
                    diecutter: result
                  });
                  //alert('A name was submitted: ' + this.state.items);
                  console.log("DIE CUTTER SELEZIONATA");
                  console.log(this.state.diecutter.id);
                  
                  

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


  displayStatus(information) {
    var diecutter = this.state.diecutter;
    if (diecutter.status=='good') {
      return (<p><Button variant="success">GOOD</Button > <Button variant="secondary">WARNING</Button> <Button variant="secondary">CRITICAL</Button></p>);
    }
    else if (diecutter.status=='warning') {
      return (<p><Button variant="secondary">GOOD</Button > <Button variant="warning">WARNING</Button> <Button variant="secondary">CRITICAL</Button></p>);
    }
    else if (diecutter.status=='critical') {
      return (<p><Button variant="secondary">GOOD</Button > <Button variant="secondary">WARNING</Button> <Button variant="danger">CRITICAL</Button></p>);
    }
  }
  

  render() {
    
    var information = this.props.dataParentToChild[0];
    var showdetails = this.props.dataParentToChild[1];
    
   
    var ownerName = this.props.username;

    //console.log("CIAODSADASJIADJIDASJI");
    //console.log(diecutter);
    if (showdetails==1) {
        console.log(information);
        if (information=='') {
        return <div>NO CUTTER SELECTED! PLEASE CLICK ON A CUTTER TO DISPLAY ITS INFORMATION</div>;
        }
        else {
        
        return (<div>
                    <div> DIE CUTTER {information}</div> 
                    
                    <div>INFO</div>
                    <div>STATUS: {this.displayStatus(information)} </div>
                    <div><Link to={{pathname:"/details/"+information, state:this.state.keyA}} className="btn btn-primary">SEE DETAILS</Link></div>
                </div>);
        
        }
    }
    else {
        console.log(information);
        if (information=='') {
          return <div>NO CUTTER SELECTED! PLEASE CLICK ON A CUTTER TO DISPLAY ITS INFORMATION</div>;
        }
        else {
          return (<div>
                      <div> DIE CUTTER {information}</div> 
                      
                      <div>INFO</div>
                      <div>STATUS: {this.displayStatus(information)} </div>
                  </div>);
        }
        
        
    }
        
    }
}




export default Diecutterinfo;