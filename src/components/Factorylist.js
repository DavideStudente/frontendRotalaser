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



class Factorylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', username: '', isLoaded: false, items: []};

    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount () {
    this.setState({username: this.props.match.params.handle});
    console.log(this.props.match.params.handle);
    const headers = { 'username': this.state.username, 'key': 'chiave elegante' };
    fetch("http://localhost:8080/v1/"+ this.state.username+"factories", { headers })
            .then(res => res.json())
            .then(
              (result) => {
                this.setState({
                  isLoaded: true,
                  items: result
                });
                //alert('A name was submitted: ' + this.state.items);
                console.log(this.state.items);
                console.log("http://localhost:8080/v1/"+ this.state.username+"/factories");
                

              },
              // Note: it's important to handle errors here
              // instead of a catch() block so that we don't swallow
              // exceptions from actual bugs in components.
              (error) => {
                alert("ERRORE!" + error);
              }
            )
     
  }

  displayFactories() {
    

    var factoriesList=[];
    var i;
    for (i=0 ; i<this.state.items.length; i++) {
      factoriesList.push(<p><Button variant="primary"  value={this.state.items[i].id}  >Factory {this.state.items[i].id}  </Button></p>);
    }
    return factoriesList;
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