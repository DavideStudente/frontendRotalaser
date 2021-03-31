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
import { Pagination } from 'react-bootstrap';

class CustomPagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {items: [], pageselected:'', numberofpages:''};
    this.handlePagChange()
  }

  componentDidMount() {
      this.setState({pageselected: this.props.pageselected})
      this.setState({numberofpages: this.props.numberofpages})
      this.handlePagChange=this.handlePagChange.bind(this);

  }

  handlePagChange(event) {
    console.log("HAI CLICCATO QUESTO!")
    console.log(event.target.text)
    this.setState({pageselected: event.target.text})
    console.log("MA ABBIAMO AGGIORNATO COSì!")
    console.log(this.state.customerpageselected)
    this.paginationInit(this.state.customersfiltered.length/5, event.target.text)
  }

  paginationInit(length, pageselected) {
    let active = 2;
    let items = [];
    length=Math.ceil(length)
    
    for (let number = 1; number <= length; number++) {
      
      if (number==pageselected) {
        console.log("OK SONO LO STESSO NUMERO!")
        console.log(pageselected)
        items.push(
          <Pagination.Item value={number} active>
            {number}
          </Pagination.Item>,
        );
      }
      else {
        items.push(
          <Pagination.Item value={number} onClick={this.handlePagChange}>
            {number}
          </Pagination.Item>,
        );
      }
      
    }
    this.setState({pagesdiecutter: items})
  }

  render() {
    this.paginationInit(this.state.numberofpages, this.state.pageselected)
    return (
      <Pagination>
          {this.state.pagesdiecutter}
      </Pagination>
      
    );
  }
}




export default CustomPagination;