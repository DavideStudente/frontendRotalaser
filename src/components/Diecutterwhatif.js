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
import performancechartpred from '../functionCharts/performancechartpred';
import {refreshToken} from '../utils/refreshToken';


class Diecutterwhatif extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            value: this.props.match.params.handle,
            periodofanalysis: "",
            temperature: "  same as prev period ",
            humidity: "  same as prev period ",
            rotationspeed:"  same as prev period ",
            cardboardperday: "  same as prev period "
        };

        this.handlechangeStartDate=this.handlechangeStartDate.bind(this);
      }
    
    
    handlechangeStartDate(event) {
        if (event.target.id=="temperature") {
            if (event.target.value==0) {
                this.setState({temperature:" same as prev period "});
            }
            else if (event.target.value<0) {
                this.setState({temperature: (event.target.value + "% belov prev period ")});
            }
            else {
                this.setState({temperature: (event.target.value + "% above prev period ")});
            }
            
        }
        else if (event.target.id=="humidity") {
            if (event.target.value==0) {
                this.setState({humidity:" same as prev period "});
            }
            else if (event.target.value<0) {
                this.setState({humidity: (event.target.value + "% belov prev period ")});
            }
            else {
                this.setState({humidity: (event.target.value + "% above prev period ")});
            }
            
        }
        else if (event.target.id=="rotationspeed") {
            if (event.target.value==0) {
                this.setState({rotationspeed:" same as prev period "});
            }
            else if (event.target.value<0) {
                this.setState({rotationspeed: (event.target.value + "% belov prev period ")});
            }
            else {
                this.setState({rotationspeed: (event.target.value + "% above prev period ")});
            }
            
        }
        else if (event.target.id=="cardboardperday") {
            if (event.target.value==0) {
                this.setState({cardboardperday:" same as prev period "});
            }
            else if (event.target.value<0) {
                this.setState({cardboardperday: (event.target.value + "% belov prev period ")});
            }
            else {
                this.setState({cardboardperday: (event.target.value + "% above prev period ")});
            }
            
        }
        
    }

    render() {
        return (
            <Container fluid >
            <Row>
              <Col  style={{backgroundColor: '#BDB76B',  border:'1px solid black'}}> 
                <Row style={{border:'1px solid black'}}>{performancechartpred()}</Row>
                <Row><b>ANALYSIS PARAMETERS</b></Row>
                <Row>
                        <label for="points"> Temperature: </label>
                        <input type="range"  id="temperature" name="points" min="-100" max="100" onChange={this.handlechangeStartDate}/>
                        <label> {this.state.temperature}</label>
                </Row>
                <Row>
                        <label for="points"> Humidity: </label>
                        <input type="range"  id="humidity" name="points" min="-100" max="100" onChange={this.handlechangeStartDate}/>
                        <label> {this.state.humidity}</label>
                </Row>
                <Row>
                        <label for="points"> Rotation Speed: </label>
                        <input type="range"  id="rotationspeed" name="points" min="-100" max="100" onChange={this.handlechangeStartDate}/>
                        <label> {this.state.rotationspeed}</label>
                </Row>
                <Row>
                        <label for="points"> Cardboard Per Day: </label>
                        <input type="range"  id="cardboardperday" name="points" min="-100" max="100" onChange={this.handlechangeStartDate}/>
                        <label> {this.state.cardboardperday}</label>

                </Row>
                
                
              </Col>
              <Col style={{backgroundColor: '#B8860B',  border:'1px solid black'}}> 
              <div>DIE CUTTER STATUS</div>
              <img src={cad} alt="CAD" />
              <div><Link to={"/details/"+this.state.value} className="btn btn-primary">BACK</Link></div>
              </Col>
            </Row>
          </Container>
        
        );
    }
}



export default Diecutterwhatif;