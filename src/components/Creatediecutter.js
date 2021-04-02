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

class Creatediecutter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', username: '', isLoaded: false, items: [],  keyA: '', piva: '', name:'', surname:'', id:'', cadfile:'', FactoryId:'', base64:''};

    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.displayCustomer = this.displayCustomer.bind(this);
    this.createCustomerPost = this.createCustomerPost.bind(this);
  }

  componentDidMount () {
   
    this.setState({username: sessionStorage.getItem('username')});
    this.setState({keyA: sessionStorage.getItem('token')});
    this.setState({role: sessionStorage.getItem('role')})
    
  
  }

  
  handleChange(event) {
      if (event.target.name=="id") {
          this.setState({id: event.target.value})
      }
      if (event.target.name=="FactoryId") {
          this.setState({FactoryId: event.target.value})

      }
      if (event.target.name=="cadfile") {
        
        //TODO convert file to base64
        var cadfile;
        const scope = this
        console.log(event.target.files[0]);
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = function () {
          cadfile = reader.result
          var arr = cadfile.split(',');
          var base64 = arr[arr.length-1];
          console.log(base64)
          scope.setState({cadfile: base64})
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
      }
  }


  createCustomerPost(event) {
    var customer=  JSON.stringify({ id: this.state.id, FactoryId: this.state.FactoryId, cadfile: this.state.cadfile})
    
    const requestOptions = {
        method: 'POST',
        headers: {'key': sessionStorage.getItem('token'), 'Content-Type': 'application/json'},
        body: customer
        
      };
      console.log(requestOptions)
      fetch('https://foiadev.diag.uniroma1.it:5002/v1/diecutters', requestOptions)
          .then(response => {
            console.log(response.json())
            if (response.status == 200) {
              this.props.history.goBack();
            }
            else {
              alert("c'è stato un errore")
            }


          })
    event.preventDefault();
            
           
  }


  displayCustomer(){
    
    
    var customerList=[];
    customerList.push(<div><b>Creation Factory</b></div>)
    customerList.push(<form onSubmit={this.createCustomerPost}>
        <label>
          id:    
          <input type="text" name="id" onChange={this.handleChange} />
        </label> <br />
        <label>
          FactoryId:
          <input type="text" name="FactoryId" onChange={this.handleChange}/>
        </label> <br />
        <label>
          cad_file:
          <input type="file" name="cadfile" onChange={this.handleChange}/>
        </label> <br />
        <input type="submit" value="Submit" />
      </form>)
    return customerList
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
        
          <Col style={{backgroundColor: '#B8860B',  border:'2px solid black'}}>{this.displayCustomer()} </Col>

         
        </Row>
        
        
      </Container>
      
    );
  }
}




export default Creatediecutter;