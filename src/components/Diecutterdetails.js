
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
import ImageMapper from 'react-image-mapper';


const coordinates = 
[
  [ 864 , 47 , 864 , 59 ] ,
  [ 784 , 767 , 769 , 767 ] ,
  [ 784 , 59 , 784 , 47 ] ,
  [ 792 , 39 , 856 , 39 ] ,
  [ 597 , 61 , 592 , 58 ] ,
  [ 597 , 54 , 658 , 54 ] ,
  [ 662 , 58 , 662 , 57 ] ,
  [ 658 , 61 , 597 , 61 ] ,
  [ 662 , 207 , 662 , 207 ] ,
  [ 658 , 211 , 576 , 211 ] ,
  [ 576 , 211 , 576 , 251 ] ,
  [ 990 , 10 , 975 , 10 ] ,
  [ 597 , 20 , 597 , 54 ] ,
  [ 597 , 807 , 597 , 773 ] ,
  [ 990 , 817 , 975 , 817 ] ,
  [ 576 , 615 , 576 , 575 ] ,
  [ 658 , 615 , 576 , 615 ] ,
  [ 662 , 619 , 662 , 619 ] ,
  [ 658 , 765 , 597 , 765 ] ,
  [ 662 , 769 , 662 , 769 ] ,
  [ 597 , 773 , 658 , 773 ] ,
  [ 597 , 765 , 592 , 768 ] ,
  [ 1050 , 765 , 1055 , 768 ] ,
  [ 1055 , 768 , 1095 , 768 ] ,
  [ 1050 , 773 , 989 , 773 ] ,
  [ 985 , 769 , 985 , 769 ] ,
  [ 989 , 765 , 1050 , 765 ] ,
  [ 1095 , 623 , 989 , 623 ] ,
  [ 985 , 619 , 985 , 619 ] ,
  [ 989 , 615 , 1071 , 615 ] ,
  [ 1071 , 615 , 1071 , 575 ] ,
  [ 1050 , 807 , 1050 , 773 ] ,
  [ 1050 , 20 , 1050 , 53 ] ,
  [ 1071 , 211 , 1071 , 251 ] ,
  [ 989 , 211 , 1071 , 211 ] ,
  [ 985 , 207 , 985 , 207 ] ,
  [ 989 , 61 , 1050 , 61 ] ,
  [ 985 , 57 , 985 , 57 ] ,
  [ 1050 , 53 , 989 , 53 ] ,
  [ 1050 , 61 , 1055 , 58 ] ,
  [ 784 , 621 , 784 , 631 ] ,
  [ 784 , 767 , 784 , 779 ] ,
  [ 792 , 787 , 856 , 787 ] ,
  [ 864 , 779 , 864 , 767 ] ,
  [ 566 , 565 , 552 , 565 ] ,
  [ 566 , 261 , 552 , 261 ] ,
  [ 1081 , 565 , 1095 , 565 ] ,
  [ 1081 , 261 , 1095 , 261 ] ,
  [ 552 , 565 , 552 , 261 ] ,
  [ 1095 , 565 , 1095 , 261 ] ,
  [ 799 , 646 , 849 , 646 ] ,
  [ 864 , 631 , 864 , 621 ] ,
  [ 864 , 621 , 864 , 615 ] ,
  [ 864 , 615 , 784 , 615 ] ,
  [ 784 , 615 , 784 , 621 ] ,
  [ 784 , 205 , 784 , 195 ] ,
  [ 799 , 180 , 849 , 180 ] ,
  [ 864 , 195 , 864 , 205 ] ,
  [ 864 , 205 , 864 , 211 ] ,
  [ 864 , 211 , 784 , 211 ] ,
  [ 784 , 211 , 784 , 205 ] ,
  [ 1095 , 768 , 1095 , 623 ] ,
  [ 990 , 817 , 1040 , 817 ] ,
  [ 657 , 817 , 607 , 817 ] ,
  [ 657 , 10 , 607 , 10 ] ,
  [ 990 , 10 , 1040 , 10 ] ,
  [ 975 , 817 , 879 , 767 ] ,
  [ 672 , 817 , 657 , 817 ] ,
  [ 672 , 10 , 657 , 10 ] ,
  [ 769 , 59 , 784 , 59 ] ,
  [ 879 , 59 , 864 , 59 ] ,
  [ 975 , 10 , 879 , 59 ] ,
  [ 879 , 767 , 864 , 767 ] ,
  [ 769 , 767 , 672 , 817 ] ,
  [ 769 , 59 , 672 , 10 ] ,
  [ 592 , 768 , 552 , 768 ] ,
  [ 552 , 623 , 658 , 623 ] ,
  [ 552 , 768 , 552 , 623 ] ,
  [ 592 , 58 , 552 , 58 ] ,
  [ 552 , 203 , 658 , 203 ] ,
  [ 552 , 58 , 552 , 203 ] ,
  [ 1055 , 58 , 1095 , 58 ] ,
  [ 1095 , 203 , 989 , 203 ] ,
  [ 1095 , 58 , 1095 , 203 ] ,
  [ 512 , 58 , 552 , 58 ] ,
  [ 552 , 203 , 446 , 203 ] ,
  [ 432 , 817 , 336 , 767 ] ,
  [ 129 , 817 , 114 , 817 ] ,
  [ 129 , 10 , 114 , 10 ] ,
  [ 226 , 59 , 241 , 59 ] ,
  [ 336 , 59 , 321 , 59 ] ,
  [ 432 , 10 , 336 , 59 ] ,
  [ 336 , 767 , 321 , 767 ] ,
  [ 226 , 767 , 129 , 817 ] ,
  [ 226 , 59 , 129 , 10 ] ,
  [ 49 , 768 , 9 , 768 ] ,
  [ 9 , 623 , 115 , 623 ] ,
  [ 9 , 768 , 9 , 623 ] ,
  [ 49 , 58 , 9 , 58 ] ,
  [ 9 , 203 , 115 , 203 ] ,
  [ 9 , 58 , 9 , 203 ] ,
  [ 321 , 47 , 321 , 59 ] ,
  [ 241 , 767 , 226 , 767 ] ,
  [ 241 , 59 , 241 , 47 ] ,
  [ 249 , 39 , 313 , 39 ] ,
  [ 54 , 61 , 49 , 58 ] ,
  [ 54 , 54 , 115 , 54 ] ,
  [ 119 , 58 , 119 , 57 ] ,
  [ 115 , 61 , 54 , 61 ] ,
  [ 119 , 207 , 119 , 207 ] ,
  [ 115 , 211 , 33 , 211 ] ,
  [ 33 , 211 , 33 , 251 ] ,
  [ 447 , 10 , 432 , 10 ] ,
  [ 54 , 20 , 54 , 54 ] ,
  [ 54 , 807 , 54 , 773 ] ,
  [ 447 , 817 , 432 , 817 ] ,
  [ 33 , 615 , 33 , 575 ] ,
  [ 115 , 615 , 33 , 615 ] ,
  [ 119 , 619 , 119 , 619 ] ,
  [ 115 , 765 , 54 , 765 ] ,
  [ 119 , 769 , 119 , 769 ] ,
  [ 54 , 773 , 115 , 773 ] ,
  [ 54 , 765 , 49 , 768 ] ,
  [ 507 , 765 , 512 , 768 ] ,
  [ 512 , 768 , 552 , 768 ] ,
  [ 507 , 773 , 446 , 773 ] ,
  [ 442 , 769 , 442 , 769 ] ,
  [ 446 , 765 , 507 , 765 ] ,
  [ 552 , 623 , 446 , 623 ] ,
  [ 442 , 619 , 442 , 619 ] ,
  [ 446 , 615 , 528 , 615 ] ,
  [ 528 , 615 , 528 , 575 ] ,
  [ 507 , 807 , 507 , 773 ] ,
  [ 507 , 20 , 507 , 53 ] ,
  [ 528 , 211 , 528 , 251 ] ,
  [ 446 , 211 , 528 , 211 ] ,
  [ 442 , 207 , 442 , 207 ] ,
  [ 446 , 61 , 507 , 61 ] ,
  [ 442 , 57 , 442 , 57 ] ,
  [ 507 , 53 , 446 , 53 ] ,
  [ 507 , 61 , 512 , 58 ] ,
  [ 241 , 621 , 241 , 631 ] ,
  [ 241 , 767 , 241 , 779 ] ,
  [ 249 , 787 , 313 , 787 ] ,
  [ 321 , 779 , 321 , 767 ] ,
  [ 23 , 565 , 10 , 565 ] ,
  [ 23 , 261 , 9 , 261 ] ,
  [ 538 , 565 , 552 , 565 ] ,
  [ 538 , 261 , 552 , 261 ] ,
  [ 10 , 565 , 9 , 261 ] ,
  [ 256 , 646 , 306 , 646 ] ,
  [ 321 , 631 , 321 , 621 ] ,
  [ 321 , 621 , 321 , 615 ] ,
  [ 321 , 615 , 241 , 615 ] ,
  [ 241 , 615 , 241 , 621 ] ,
  [ 241 , 205 , 241 , 195 ] ,
  [ 256 , 180 , 306 , 180 ] ,
  [ 321 , 195 , 321 , 205 ] ,
  [ 321 , 205 , 321 , 211 ] ,
  [ 321 , 211 , 241 , 211 ] ,
  [ 241 , 211 , 241 , 205 ] ,
  [ 447 , 817 , 497 , 817 ] ,
  [ 114 , 817 , 64 , 817 ] ,
  [ 114 , 10 , 64 , 10 ] ,
  [ 447 , 10 , 497 , 10 ] ,
  [ 990 , 817 , 990 , 837 ] ,
  [ 1095 , 768 , 1115 , 768 ] ,
  ]


  const areastmp =[];
  var index;
  
  
  for (index = 0; index < coordinates.length; index++) { 
    console.log(coordinates[index])
    /*if (coordinates[index][0]==coordinates[index][2]) {
      coordinates[index][2]+=2
      //areastmp.push({name:index.toString(), shape: "rect", coords: coordinates[index], preFillColor: "red"}) 
    }
    else if (coordinates[index][1]==coordinates[index][3]) {
      //areastmp.push({name:index.toString(), shape: "rect", coords: coordinates[index], preFillColor: "red"})
    }*/
    const tmpcood=coordinates[index]
    areastmp.push({name:index.toString(), shape: "poly", coords: [tmpcood[0], tmpcood[1], tmpcood[0]+5, tmpcood[1]+5, tmpcood[2]+5, tmpcood[3]+5, tmpcood[2], tmpcood[3]] , preFillColor: "red"}) 
    
  } 



class Diecutterdetails extends React.Component {

    state = {
        value: '', keyA: '',
        MAP : {
          name: "my-map",
          areas: areastmp
        }
    }
    componentDidMount () {
        
        
        
        this.setState({keyA: sessionStorage.getItem('token')})
        this.setState({value: this.props.match.params.handle});
        console.log(this.props.match.params.handle);
        
        
    }
    

    enterArea(area, index, event) {
      var maptmp= this.state.MAP;
      maptmp.areas[0].preFillColor="blue"
      
      this.setState({MAP: maptmp})
    }
  
    leaveArea(area, index, event) {
      alert("EXITING AREAAA")
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
                <div className="container">
                    <ImageMapper src={cad} map={this.state.MAP} 
                     
                      onMouseEnter={area => this.enterArea(area)}
                      
                      
                    />
                    {
                      this.state.hoveredArea &&
                      <span className="tooltip"
                          style={{ ...this.getTipPosition(this.state.hoveredArea)}}>
                        { this.state.hoveredArea && this.state.hoveredArea.name}
                      </span>
                    }
                </div>
              <div><Link to={"/details/"+this.state.value+"/whatif"} className="btn btn-primary">WHAT-IF ANALYSIS</Link></div>
              </Col>
            </Row>
          </Container>
        
        );
    }
}



export default Diecutterdetails;

