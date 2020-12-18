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


class Diecutterinfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        value: ""
    };
    this.displayStatus = this.displayStatus.bind(this);
  }

  

  displayStatus(information) {
    var diecutter = getDieCutterFromId(information);
    if (diecutter.status=="ok") {
      return (<p><Button variant="success">GOOD</Button > <Button variant="secondary">WARNING</Button> <Button variant="secondary">CRITICAL</Button></p>);
    }
    else if (diecutter.status=="warning") {
      return (<p><Button variant="secondary">GOOD</Button > <Button variant="warning">WARNING</Button> <Button variant="secondary">CRITICAL</Button></p>);
    }
    else if (diecutter.status=="critical") {
      return (<p><Button variant="secondary">GOOD</Button > <Button variant="secondary">WARNING</Button> <Button variant="danger">CRITICAL</Button></p>);
    }
  }
  

  render() {
    
    var information = this.props.dataParentToChild[0];
    var showdetails = this.props.dataParentToChild[1];
    
    var factoryId = getFactoryFromDieCutter(information);
    var ownerName = getOwnerFromFactory(factoryId);

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
                    <div>OWNER: {ownerName}</div>
                    <div>INFO</div>
                    <div>STATUS: {this.displayStatus(information)} </div>
                    <div><Link to={"/details/"+information} className="btn btn-primary">SEE DETAILS</Link></div>
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
                      <div>OWNER: {ownerName}</div>
                      <div>INFO</div>
                      <div>STATUS: {this.displayStatus(information)} </div>
                  </div>);
        }
        
        
    }
        
    }
}




export default Diecutterinfo;