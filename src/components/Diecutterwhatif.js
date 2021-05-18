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
            temperature: 'default',
            humidity: 'default',
            rotationspeed:'default',
            cycles: 'default',
            ruldetected: "calculating...",
            keyA: '', diecutterparts: '', image: '', diecutterdetail: '', diecutterpartselected: '',
            MAP : {
                name: "my-map",
                areas: []
            }
        };

        this.handleClickCalculate = this.handleClickCalculate.bind(this);
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
        this.handleClickCalculate();
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
    

    handleClickCalculate() {

      const requestOptions = {
          method: 'POST',
          headers: {'key': sessionStorage.getItem('token'), 'Content-Type': 'application/json'},
          body: JSON.stringify({ temperature: this.state.temperature, humidity: this.state.humidity, 
            speed: this.state.rotationspeed, cycles:this.state.cycles})
          
        };
        console.log(requestOptions)
        fetch('https://localhost:5002/v1/predictrulwhatif/'+this.props.match.params.handle, requestOptions)
            .then(response => {
              
              if (response.status == 200) {
                //this.setState({ruldetected: response.json()});
                return(response.json())
              }
              else {
                alert("c'è stato un errore")
              }
            }).then(
              (result) => {
                
                this.setState({ruldetected: result.toString()});

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
          /*
            if (event.target.value==0) {
                this.setState({temperature:" same as prev period "});
            }
            else if (event.target.value<0) {
                this.setState({temperature: (event.target.value )});
            }
            else {
                this.setState({temperature: (event.target.value)});
            }*/
            this.setState({temperature: (event.target.value)})
            
        }
        else if (event.target.id=="humidity") {
            /*if (event.target.value==0) {
                this.setState({humidity:" same as prev period "});
            }
            else if (event.target.value<0) {
                this.setState({humidity: (event.target.value )});
            }
            else {
                this.setState({humidity: (event.target.value)});
            }*/
            this.setState({humidity: (event.target.value)});
            
        }
        else if (event.target.id=="rotationspeed") {
            /*if (event.target.value==0) {
                this.setState({rotationspeed:" same as prev period "});
            }
            else if (event.target.value<0) {
                this.setState({rotationspeed: (event.target.value)});
            }
            else {
                this.setState({rotationspeed: (event.target.value)});
            }*/
            this.setState({rotationspeed: (event.target.value)}); 
        }
        else if (event.target.id=="cycles") {
          /*
          if (event.target.value==0) {
              this.setState({cycles:1});
          }
          else if (event.target.value<0) {
              this.setState({cycles: (event.target.value)});
          }
          else {
              this.setState({cycles: (event.target.value)});
          }
          */
          this.setState({cycles: (event.target.value)});

        }
        
    }

    clickArea(area) {
        this.setState({diecutterpartselected: JSON.parse(area.name)});
        
      }

    valuemiddlerange(min,max,value) {
      if(value=='default') {
        return max/2
      }
      else {
        return value
      }
    }

    render() {
        return (
            <Container fluid >
            <Row>
              <Col  style={{backgroundColor: '#BDB76B',  border:'1px solid black'}}> 
                <Row style={{border:'1px solid black'}}><Col><Row>{performancechartpred()} </Row><Row><b>  RUL DETECTED: {this.state.ruldetected}</b></Row></Col></Row>
                <Row><b>ANALYSIS PARAMETERS</b></Row>
                <Row>
                        <label for="points"> Temperature: </label>
                        <input type="range"  id="temperature" name="points" min="0" max="40" value={this.valuemiddlerange(0,40,this.state.temperature)} onChange={this.handlechangeStartDate}/>
                        <label> {this.state.temperature}</label>
                </Row>
                <Row>
                        <label for="points"> Humidity: </label>
                        <input type="range"  id="humidity" name="points" min="0" max="100" value={this.valuemiddlerange(0,100,this.state.humidity)} onChange={this.handlechangeStartDate}/>
                        <label> {this.state.humidity}</label>
                </Row>
                <Row>
                        <label for="points"> Rotation Speed: </label>
                        <input type="range"  id="rotationspeed" name="points" min="2" max="9" value={this.valuemiddlerange(2,10,this.state.rotationspeed)} onChange={this.handlechangeStartDate}/>
                        <label> {this.state.rotationspeed}</label>
                </Row>
                
                <Row>
                        <label for="points"> Cycles Number: </label>
                        <input type="range"  id="cycles" name="points" min="1" max="20" value={this.valuemiddlerange(1,20,this.state.cycles)} onChange={this.handlechangeStartDate}/>
                        <label> {this.state.cycles}</label>
                </Row>
                <Row>
                        <button onClick={this.handleClickCalculate}>
                          Calculate RUL
                        </button>
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