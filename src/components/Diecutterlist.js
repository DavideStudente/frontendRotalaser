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

class Diecutterlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '',
                  value2: factories[0],
                  cutterselected: '',
                  render: ''};

    this.changeCutter = this.changeCutter.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  displayDieCutters() {
    var dieCuttersList=[];
    var i;
    for (i=0 ; i<this.state.value2.diecutters.length; i++) {
      dieCuttersList.push(<p><Button variant="primary"  value={this.state.value2.diecutters[i]} onClick={this.changeCutter} >DieCutter {this.state.value2.diecutters[i]}  </Button></p>);
    }
    return dieCuttersList;
  }

  changeCutter(event){
    this.setState({cutterselected: event.target.value});
    //console.log(this.state.cutterselected);
  }


  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('E\' stato inserito un nome: ' + this.state.value);
    event.preventDefault();
  }

  displayWarnings() {
    var i;
    var dieCutterWarnings=[]
    for (i=0; i<this.state.value2.diecutters.length; i++) {
      var diecutterId=this.state.value2.diecutters[i];
      var diecutterTmp;
      //WE SHOULD GET THE DIE CUTTER WITH ID == diecutterId there, I will retrieve it from data.js for now and then replace with actual data
      for (var y=0; y<diecutters.length; y++) {
        if (diecutters[y].id==diecutterId) {
          diecutterTmp=diecutters[y];
        }
      }
      if (diecutterTmp.status == "critical") {
        dieCutterWarnings.push(<p><Button variant="danger" value={diecutterId} onClick={this.changeCutter} > {diecutterTmp.desc}</Button> </p>)
      }
      else if (diecutterTmp.status == "warning") {
        dieCutterWarnings.push(<p><Button variant="warning" value={diecutterId} onClick={this.changeCutter} > {diecutterTmp.desc}</Button> </p>)
      }
      
    }
    return dieCutterWarnings;
  }

  render() {
    console.log("STO RENDERIZZANDOOO");
    var cuttersel=this.state.cutterselected;
    console.log(this.state.cutterselected);
    return (
      <Container fluid>
        <Row>
          <Col style={{backgroundColor: '#B8860B',  border:'2px solid black'}}>{this.displayDieCutters()} </Col>
          <Col xs={6} style={{backgroundColor: '#BDB76B',  border:'2px solid black'}}><Diecutterinfo dataParentToChild={[cuttersel,1]}/></Col>
          <Col style={{backgroundColor: '#B8860B',  border:'2px solid black'}}> {this.displayWarnings()}</Col>
        </Row>
      </Container>
      
    );
  }
}




export default Diecutterlist;