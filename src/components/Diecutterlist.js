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
import Warninglist from './Warninglist';
import {refreshToken} from '../utils/refreshToken';
import { Pagination } from 'react-bootstrap';
const numberOfelement=5;

class Diecutterlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '',
                  value2: factories[0],
                  diecutterselected: '', diecutterpageselected:1,
                  customerselected: '',
                  render: '', username: '', keyA: '', factory:'', items: [], isLoaded: false,
                diecuttersfiltered:[]};

    this.changeCutter = this.changeCutter.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlePagChange=this.handlePagChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.filterDiecutters = this.filterDiecutters.bind(this);
  }

  componentDidMount() {
      this.setState({username: this.props.username});
      this.setState({keyA: sessionStorage.getItem('token')});
      this.setState({factory: this.props.factory});
      this.setState({customerselected: this.props.customer})
     
      const headers = { 'key': sessionStorage.getItem('token') };
      fetch("https://foiadev.diag.uniroma1.it:5002/v1/factories/"+ this.props.factory+"/diecutters", { headers })
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
                  this.setState({diecuttersfiltered: result})

                  //alert('A name was submitted: ' + this.state.items);
                  console.log("DIE CUTTER PERVENUTA");
                  console.log(sessionStorage.getItem('token'));
                  
                  console.log("https://foiadev.diag.uniroma1.it:5002/v1/"+ this.state.factory+"/diecutters");
                  

                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                  console.log("ERRORE!" + error);
                }
              )
  }
  

  componentDidUpdate() {
    if (this.state.customerselected!=this.props.customer) {
      this.setState({factory: ''})
      this.setState({items: [] })
      this.setState({customerselected: this.props.customer})
    }
    if ((this.state.factory!=this.props.factory || this.state.keyA!=sessionStorage.getItem('token'))  ) {
      this.setState({username: this.props.username});
      this.setState({customerselected: this.props.customer})
      this.setState({keyA: sessionStorage.getItem('token')});
      this.setState({factory: this.props.factory});
      
      const headers = { 'key': sessionStorage.getItem('token') };
      fetch("https://foiadev.diag.uniroma1.it:5002/v1/factories/"+ this.props.factory+"/diecutters", { headers })
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
                  this.setState({diecuttersfiltered: result})
                  //alert('A name was submitted: ' + this.state.items);
                 
                  

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

  filterDiecutters(event) {
    var i;
    if (event.target.value=='') {
      this.setState({diecuttersfiltered: this.state.items})
    }
    var diecuttersfiltered = []
   
    for (i=0; i<this.state.items.length; i++) {
      if ((this.state.items[i].id).includes(event.target.value)) {
        
        diecuttersfiltered.push(this.state.items[i])
        
        
      }
    }
    this.setState({diecuttersfiltered: diecuttersfiltered})
  }

  displayDieCutters() {
    var dieCuttersList=[];
    var i;
    dieCuttersList.push(<Col><p><input type="text" onChange={this.filterDiecutters} />   Search Diecutters   </p></Col>)

    var firsttoshow = (this.state.diecutterpageselected-1)*numberOfelement
    var maxindex
    if (firsttoshow+numberOfelement>this.state.diecuttersfiltered.length) {
      maxindex=this.state.diecuttersfiltered.length;
    }
    else {
      maxindex=firsttoshow+numberOfelement;
    }
    for (i=firsttoshow ; i<maxindex; i++) {
      console.log(i)
      console.log(this.state.diecuttersfiltered)
      if (this.state.diecutterselected==this.state.diecuttersfiltered[i].id) {
        dieCuttersList.push(<p><Button variant="dark"  value={this.state.diecuttersfiltered[i].id} onClick={this.changeCutter} >DieCutter {this.state.diecuttersfiltered[i].id}  </Button></p>);

      }
      else {
        dieCuttersList.push(<p><Button variant="primary"  value={this.state.diecuttersfiltered[i].id} onClick={this.changeCutter} >DieCutter {this.state.diecuttersfiltered[i].id}  </Button></p>);

      }
    }
    
    return dieCuttersList;
  }

  changeCutter(event){
    this.setState({diecutterselected: event.target.value});
    //console.log(this.state.diecutterselected);
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

  handlePagChange(event) {

    if (event.target.type.includes("diecutter") ) {
      console.log(this.state.diecutterpageselected)
      if (event.target.type == "prevdiecutter") {
        if (this.state.diecutterpageselected != 1) {
          
          this.setState({diecutterpageselected: this.state.diecutterpageselected-1})
        }
        
      }
      else if (event.target.type == "nextdiecutter") {
      
        if (this.state.diecutterpageselected != Math.ceil((this.state.diecuttersfiltered.length)/numberOfelement)) {
          
          this.setState({diecutterpageselected: this.state.diecutterpageselected+1})
        }
      }
      else {
        
        this.setState({diecutterpageselected: parseInt(event.target.text)})
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


  render() {
    console.log("STO RENDERIZZANDOOO");
    var cuttersel=this.state.diecutterselected;
    console.log(this.state.diecutterselected);
    return (
      <Container fluid>
        <Row>
          <Col style={{backgroundColor: '#B8860B',  border:'2px solid black'}}>{this.displayDieCutters()} 
          <Pagination size="sm">
            {this.paginationInit((this.state.diecuttersfiltered.length)/numberOfelement, this.state.diecutterpageselected, "diecutter")}
            </Pagination>
          </Col>
          
          <Col xs={6} style={{backgroundColor: '#BDB76B',  border:'2px solid black'}}><Diecutterinfo dataParentToChild={[cuttersel,1]} username={this.state.username} keyA={this.state.keyA}/></Col>
          <Col style={{backgroundColor: '#B8860B',  border:'2px solid black'}}> <Warninglist username={this.state.username} keyA={this.state.keyA} factory={this.state.factory}/></Col>
        </Row>
      </Container>
      
    );
  }
}




export default Diecutterlist;