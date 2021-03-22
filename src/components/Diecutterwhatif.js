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
import ImageMapper from 'react-image-mapper';


class Diecutterwhatif extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            value: this.props.match.params.handle,
            periodofanalysis: "",
            temperature: "  same as prev period ",
            humidity: "  same as prev period ",
            rotationspeed:"  same as prev period ",
            cardboardperday: "  same as prev period ",
            keyA: '', diecutterparts: '', image: '', diecutterdetail: '', diecutterpartselected: '',
            MAP : {
                name: "my-map",
                areas: []
            }
        };

        this.handlechangeStartDate=this.handlechangeStartDate.bind(this);
      }
    

      displayImage(result) {
        const areastmp =[];
        var index;
        var i;
        
        
        
        for (index = 0; index < result.length; index++) { 
        //console.log(coordinates[index])
          var tmpcood = JSON.parse(result[index].coords)
          if (result[index].shape=="LINE") {
            
            
            //const tmpcood=coordinates[index]
            if (result[index].kind == "taglio") {
              areastmp.push({name:JSON.stringify(result[index]), shape: "poly", coords: [tmpcood.x1, tmpcood.y1, tmpcood.x1+5, tmpcood.y1+5, tmpcood.x2+5, tmpcood.y2+5, tmpcood.x2, tmpcood.y2] , preFillColor: "blue"}) 
            }
            else if (result[index].kind == "piega") {
              areastmp.push({name:JSON.stringify(result[index]), shape: "poly", coords: [tmpcood.x1, tmpcood.y1, tmpcood.x1+5, tmpcood.y1+5, tmpcood.x2+5, tmpcood.y2+5, tmpcood.x2, tmpcood.y2] , preFillColor: "yellow"}) 
            }
          }
          //"{"center_x":566,"center_y":251,"radius":10,"start_angle":0,"end_angle":89}"
          else if (result[index].shape == "ARC") {
            var anglestart=tmpcood.start_angle;
            var angleend=tmpcood.end_angle;
            var center_x=tmpcood.center_x;
            var center_y=tmpcood.center_y;
            var radius = tmpcood.radius;
            var fragments= 32;
            var frag= (anglestart-angleend)/fragments;
            var allpp = [];
            for (i=0; i<=fragments; i++) {
              var radiant =((anglestart-(frag*i))* (Math.PI / 180));
              var coordToFind_x = radius * Math.cos(radiant);
              var coordToFind_y = radius * Math.sin(radiant);
              if (i%2==0) {
                allpp.push(center_x + coordToFind_x);
                allpp.push(center_y + coordToFind_y);
                allpp.push(center_x + coordToFind_x+2);
                allpp.push(center_y + coordToFind_y+2);
              }
              else {
                
                allpp.push(center_x + coordToFind_x+2);
                allpp.push(center_y + coordToFind_y+2);
                allpp.push(center_x + coordToFind_x);
                allpp.push(center_y + coordToFind_y);
              }
              if (result[index].kind == "taglio") {
                areastmp.push({name:JSON.stringify(result[index]), shape: "poly", coords: allpp , preFillColor: "red"})
              }
              else if (result[index].kind == "piega") {
                areastmp.push({name:JSON.stringify(result[index]), shape: "poly", coords: allpp , preFillColor: "red"})
              }
              
            }
          }
        } 
        this.setState({
          MAP : {
            name: "my-map",
            areas: areastmp
          }
  
        })
        
      }
  
      componentDidMount () {
  
        this.setState({keyA: sessionStorage.getItem('token')})
          this.setState({value: this.props.match.params.handle});
          console.log(this.props.match.params.handle);
          
          //const headers = {'key': this.props.location.state };
        const headers = {'key': sessionStorage.getItem('token') };
        fetch("https://localhost:5002/v1/diecutters/"+ this.props.match.params.handle +"/diecutterparts", { headers })
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
                    console.log(result);
                    this.displayImage(result);
                    this.setState({
                      
                      diecutterparts: result
                    });
                    
                    
  
                  },
                  // Note: it's important to handle errors here
                  // instead of a catch() block so that we don't swallow
                  // exceptions from actual bugs in components.
                  (error) => {
                    console.log("ERRORE!" + error);
                  }
                )
          
                fetch("https://localhost:5002/v1/diecutters/"+ this.props.match.params.handle, { headers })
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
                      
                      diecutterdetail: result
                    });
                    //displayImage();
                    
  
                  },
                  // Note: it's important to handle errors here
                  // instead of a catch() block so that we don't swallow
                  // exceptions from actual bugs in components.
                  (error) => {
                    console.log("ERRORE!" + error);
                  }
                )
          
          
          
          
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

    clickArea(area) {
        this.setState({diecutterpartselected: JSON.parse(area.name)});
        
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
                <div className="container">
                        <ImageMapper src={"data:image/png;base64,"+this.state.diecutterdetail.cadimage } map={this.state.MAP} 
                        
                        onClick={area => this.clickArea(area)}
                        
                        
                        />
                        {
                        this.state.hoveredArea &&
                        <span className="tooltip"
                            style={{ ...this.getTipPosition(this.state.hoveredArea)}}>
                            { this.state.hoveredArea && this.state.hoveredArea.name}
                        </span>
                        }
                    </div>
              <div><Link to={"/details/"+this.state.value} className="btn btn-primary">BACK</Link></div>
              </Col>
            </Row>
          </Container>
        
        );
    }
}



export default Diecutterwhatif;