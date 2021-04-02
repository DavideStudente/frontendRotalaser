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
import { Pagination } from 'react-bootstrap';



const numberOfelement=5;


class Factorylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', username: '', isLoaded: false, items: [], factoryselected: '', keyA: '', refresh: 0, role: '',
    factorypageselected:1,
    factoriesfiltered: []};

    this.changeFactory = this.changeFactory.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlePagChange = this.handlePagChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.filterFactories = this.filterFactories.bind(this);
  }

  componentDidMount () {
    var usern=sessionStorage.getItem('username');
    this.setState({username: sessionStorage.getItem('username')});
    this.setState({keyA: sessionStorage.getItem('token')});
    this.setState({role: sessionStorage.getItem('role')})
    
    //const headers = {'key': this.props.location.state };
    const headers = {'key': sessionStorage.getItem('token') };
    if (sessionStorage.getItem('role') == "admin") {
      fetch("https://foiadev.diag.uniroma1.it:5002/v1/factories", { headers })
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
    else {
      fetch("https://foiadev.diag.uniroma1.it:5002/v1/users/"+ usern +"/factories", { headers })
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

  componentDidUpdate () {
    if (this.state.keyA!=sessionStorage.getItem('token')) {
      //console.log("SONO NELL'UPDATE!" + sessionStorage.getItem('token'))
      this.setState({refresh: 0});
      var usern=sessionStorage.getItem('username');
      this.setState({username: sessionStorage.getItem('username')});
      this.setState({keyA: sessionStorage.getItem('token')});
      
      //const headers = {'key': this.props.location.state };
      const headers = {'key': sessionStorage.getItem('token') };
      if (sessionStorage.getItem('role') == "admin") {
        fetch("https://foiadev.diag.uniroma1.it:5002/v1/factories", { headers })
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
      else {
        fetch("https://foiadev.diag.uniroma1.it:5002/v1/users/"+ usern +"/factories", { headers })
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
     
  }

  changeFactory(event){
    this.setState({factoryselected: event.target.value});
    //console.log(this.state.factoryselected);
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

  handlePagChange(event) {
    
    
    if (event.target.type.includes("factory") ) {
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

  displayFactories() {
    var factoriesList=[];
      var i;
      factoriesList.push(<Col><p><input type="text" onChange={this.filterFactories} />   Search Factories   </p></Col>)

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

  displayChoose() {
    var factoriesList=[];
    
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
          <Col style={{backgroundColor: '#B8860B',  border:'2px solid black'}}>{this.displayFactories()} 
          <Pagination size="sm">
            {this.paginationInit((this.state.factoriesfiltered.length)/numberOfelement, this.state.factorypageselected, "factory")}
            </Pagination>
          </Col>
    
          
          
        </Row>
        <Row>{this.displayChoose()}</Row>
      </Container>
      
    );
  }
}




export default Factorylist;