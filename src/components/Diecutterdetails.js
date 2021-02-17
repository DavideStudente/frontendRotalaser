
import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import generateData from './generateData';
import Diecutterinfo from './Diecutterinfo';
import {diecutters} from '../fakedata/data';
import {factories} from '../fakedata/data';
import Diecutterhistory from './Diecutterhistory';
import cad from './cad.png';
import predictchart from '../functionCharts/predictchart';
import {Link} from 'react-router-dom';
import {refreshToken} from '../utils/refreshToken';

class Diecutterdetails extends React.Component {

    state = {
        value: '', keyA: ''
    }
    componentDidMount () {
        this.setState({keyA: sessionStorage.getItem('token')})
        this.setState({value: this.props.match.params.handle});
        console.log(this.props.match.params.handle);
        
        
    }
      

    render() {
        return (
            <Container fluid >
            <Row>
              <Col  style={{backgroundColor: '#B8860B',  border:'1px solid black'}}> 
                <Row style={{border:'1px solid black'}} ><Diecutterinfo dataParentToChild={[this.state.value,0]}/></Row>
                <Row > DieCutter Feature selected INFO</Row> 
              </Col>
              <Col style={{ backgroundColor: '#BDB76B',  border:'1px solid black'}}>
                <Row style={{border:'1px solid black'}}> <Diecutterhistory diecutter={this.state.value} keyA={this.state.keyA} /></Row>
                <Row > {predictchart()}</Row> 
              </Col>
              <Col style={{backgroundColor: '#B8860B',  border:'1px solid black'}}> 
              <div>DIE CUTTER STATUS</div>
              <img src={cad} alt="CAD" />
              <div><Link to={"/details/"+this.state.value+"/whatif"} className="btn btn-primary">WHAT-IF ANALYSIS</Link></div>
              </Col>
            </Row>
          </Container>
        
        );
    }
}



export default Diecutterdetails;

