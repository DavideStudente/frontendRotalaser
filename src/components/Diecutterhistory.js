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
import Diecutterlist from './Diecutterlist';
import Chart from 'chart.js';
import {Line} from 'react-chartjs-2';
import {cycles} from '../fakedata/cycles'
import chartdiehistory from '../functionCharts/chartdiehistory';
import {refreshToken} from '../utils/refreshToken';



var options= {
    responsive: true,
    //maintainAspectRatio: false,
    scales: {
        xAxes: [{
            type: 'time',
            time: {

                //unit: 'minute', 
                unitStepSize: 30, //THIS IS THE RESOLUTION
                displayFormats: {
                    'millisecond': 'h:mm MMM DD',
                    'second': 'h:mm MMM DD',
                    'minute': 'h:mm MMM DD',
                    'hour': 'h:mm MMM DD',
                    'day': 'h:mm MMM DD',
                    'week': 'h:mm MMM DD',
                    'month': 'h:mm MMM DD',
                    'quarter': 'h:mm MMM DD',
                    'year': 'h:mm MMM DD',
                 }
            },
          ticks : {
              max : '',
              min : ''
          }
        }]
    }
}

const data = {
  labels: [],
  datasets: [
    {
      label: 'humidity',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: []
    },
    {
      label: 'temperature',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'orange',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'orange',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: []
    },
    {
      label: 'errors',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'red',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'red',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: []
    }
  ]
};


class Diecutterhistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {options: options, inputdate: '', diecutter: '', data: '', keyA: ''};
    this.changeResolution = this.changeResolution.bind(this);
    this.changeStartDate = this.changeStartDate.bind(this);
    this.handlechangeStartDate=this.handlechangeStartDate.bind(this);
  }

  componentDidMount() {
      this.setState({diecutter: this.props.diecutter});
      this.setState({keyA: sessionStorage.getItem('token')});
      const headers = {'key': sessionStorage.getItem('token') };
      fetch("https://localhost:5002/v1/diecutters/"+this.props.diecutter, { headers })
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
                  this.setState({
                    isLoaded: true,
                    diecutter: result
                  });
                  //alert('A name was submitted: ' + this.state.items);
                  console.log("DIE CUTTER SELEZIONATA");
                  console.log(this.state.diecutter.id);
                  //var data=chartdiehistory(this.state.diecutter.id);
                  //this.setState({data: data});
                  
                  

                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                  console.log("ERRORE!" + error);
                }
              )
            
              fetch("https://localhost:5002/v1/diecutters/"+ this.props.diecutter +"/cycles", { headers })
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
                              var cycles = result;
                              //alert('A name was submitted: ' + this.state.items);
                              console.log("CYCLES PERVENUTI");
                              console.log(cycles);
                              
                              var tmpvalue= {
                                labels: [],
                                datasets: [
                                  {
                                    label: 'humidity',
                                    fill: false,
                                    lineTension: 0.1,
                                    backgroundColor: 'rgba(75,192,192,0.4)',
                                    borderColor: 'rgba(75,192,192,1)',
                                    borderCapStyle: 'butt',
                                    borderDash: [],
                                    borderDashOffset: 0.0,
                                    borderJoinStyle: 'miter',
                                    pointBorderColor: 'rgba(75,192,192,1)',
                                    pointBackgroundColor: '#fff',
                                    pointBorderWidth: 1,
                                    pointHoverRadius: 5,
                                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                                    pointHoverBorderWidth: 2,
                                    pointRadius: 1,
                                    pointHitRadius: 10,
                                    data: []
                                  },
                                  {
                                    label: 'temperature',
                                    fill: false,
                                    lineTension: 0.1,
                                    backgroundColor: 'rgba(75,192,192,0.4)',
                                    borderColor: 'orange',
                                    borderCapStyle: 'butt',
                                    borderDash: [],
                                    borderDashOffset: 0.0,
                                    borderJoinStyle: 'miter',
                                    pointBorderColor: 'orange',
                                    pointBackgroundColor: '#fff',
                                    pointBorderWidth: 1,
                                    pointHoverRadius: 5,
                                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                                    pointHoverBorderWidth: 2,
                                    pointRadius: 1,
                                    pointHitRadius: 10,
                                    data: []
                                  },
                                  {
                                    label: 'errors',
                                    fill: false,
                                    lineTension: 0.1,
                                    backgroundColor: 'rgba(75,192,192,0.4)',
                                    borderColor: 'red',
                                    borderCapStyle: 'butt',
                                    borderDash: [],
                                    borderDashOffset: 0.0,
                                    borderJoinStyle: 'miter',
                                    pointBorderColor: 'red',
                                    pointBackgroundColor: '#fff',
                                    pointBorderWidth: 1,
                                    pointHoverRadius: 5,
                                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                                    pointHoverBorderWidth: 2,
                                    pointRadius: 1,
                                    pointHitRadius: 10,
                                    data: []
                                  }
                                ]
                              };
                              //console.log(tmpvalue);
                              //console.log(tmpvalue.labels);
                              
                              var preverror=0
                              for (var i=0; i<cycles.length; i++) {
                                  tmpvalue.labels.push(new Date(cycles[i].createdAt));
                                  //console.log(new Date(cycles[i].createdAt));
                                  //tmpvalue.labels.push(new Date(cycles[i].year, cycles[i].month, cycles[i].day, cycles[i].hour, cycles[i].minute));
                                  //tmpvalue.labels.push(cycles[i].day + "/"+cycles[i].month+"/"+cycles[i].year+ " " +cycles[i].hour+":"+cycles[i].minute);
                                  //console.log(cycles[i].day + "/"+cycles[i].month+"/"+cycles[i].year+ " " +cycles[i].hour+":"+cycles[i].minute+ "  value:"+ cycles[i].value);
                                  tmpvalue.datasets[0].data.push(cycles[i].humidity);
                                  tmpvalue.datasets[1].data.push(cycles[i].temperature);
                                  tmpvalue.datasets[2].data.push(cycles[i].errors-preverror);
                                  preverror=cycles[i].errors
                                  
                              }
                              console.log(tmpvalue);
                              this.setState({data: tmpvalue});
                              //return tmpvalue;
            
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
  if (this.state.keyA!=sessionStorage.getItem('token')) {
    this.setState({keyA: sessionStorage.getItem('token')});
    const headers = {'key': sessionStorage.getItem('token') };
    fetch("https://localhost:5002/v1/diecutters/"+this.props.diecutter, { headers })
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
                this.setState({
                  isLoaded: true,
                  diecutter: result
                });
                //alert('A name was submitted: ' + this.state.items);
                console.log("DIE CUTTER SELEZIONATA");
                console.log(this.state.diecutter.id);
                //var data=chartdiehistory(this.state.diecutter.id);
                //this.setState({data: data});
                
                

              },
              // Note: it's important to handle errors here
              // instead of a catch() block so that we don't swallow
              // exceptions from actual bugs in components.
              (error) => {
                console.log("ERRORE!" + error);
              }
            )
            //TODO fix why diecutter isn't read
            fetch("https://localhost:5002/v1/diecutters/"+ this.props.diecutter +"/cycles", { headers })
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
                            var cycles = result;
                            //alert('A name was submitted: ' + this.state.items);
                            console.log("CYCLES PERVENUTI");
                            console.log(cycles);
                            
                            var tmpvalue= {
                              labels: [],
                              datasets: [
                                {
                                  label: 'humidity',
                                  fill: false,
                                  lineTension: 0.1,
                                  backgroundColor: 'rgba(75,192,192,0.4)',
                                  borderColor: 'rgba(75,192,192,1)',
                                  borderCapStyle: 'butt',
                                  borderDash: [],
                                  borderDashOffset: 0.0,
                                  borderJoinStyle: 'miter',
                                  pointBorderColor: 'rgba(75,192,192,1)',
                                  pointBackgroundColor: '#fff',
                                  pointBorderWidth: 1,
                                  pointHoverRadius: 5,
                                  pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                                  pointHoverBorderColor: 'rgba(220,220,220,1)',
                                  pointHoverBorderWidth: 2,
                                  pointRadius: 1,
                                  pointHitRadius: 10,
                                  data: []
                                },
                                {
                                  label: 'temperature',
                                  fill: false,
                                  lineTension: 0.1,
                                  backgroundColor: 'rgba(75,192,192,0.4)',
                                  borderColor: 'orange',
                                  borderCapStyle: 'butt',
                                  borderDash: [],
                                  borderDashOffset: 0.0,
                                  borderJoinStyle: 'miter',
                                  pointBorderColor: 'orange',
                                  pointBackgroundColor: '#fff',
                                  pointBorderWidth: 1,
                                  pointHoverRadius: 5,
                                  pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                                  pointHoverBorderColor: 'rgba(220,220,220,1)',
                                  pointHoverBorderWidth: 2,
                                  pointRadius: 1,
                                  pointHitRadius: 10,
                                  data: []
                                },
                                {
                                  label: 'errors',
                                  fill: false,
                                  lineTension: 0.1,
                                  backgroundColor: 'rgba(75,192,192,0.4)',
                                  borderColor: 'red',
                                  borderCapStyle: 'butt',
                                  borderDash: [],
                                  borderDashOffset: 0.0,
                                  borderJoinStyle: 'miter',
                                  pointBorderColor: 'red',
                                  pointBackgroundColor: '#fff',
                                  pointBorderWidth: 1,
                                  pointHoverRadius: 5,
                                  pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                                  pointHoverBorderColor: 'rgba(220,220,220,1)',
                                  pointHoverBorderWidth: 2,
                                  pointRadius: 1,
                                  pointHitRadius: 10,
                                  data: []
                                }
                              ]
                            };
                            //console.log(tmpvalue);
                            //console.log(tmpvalue.labels);
                            
                            var preverror=0;
                            
                            for (var i=0; i<cycles.length; i++) {
                                tmpvalue.labels.push(new Date(cycles[i].createdAt));
                                //console.log(new Date(cycles[i].createdAt));
                                //tmpvalue.labels.push(new Date(cycles[i].year, cycles[i].month, cycles[i].day, cycles[i].hour, cycles[i].minute));
                                //tmpvalue.labels.push(cycles[i].day + "/"+cycles[i].month+"/"+cycles[i].year+ " " +cycles[i].hour+":"+cycles[i].minute);
                                //console.log(cycles[i].day + "/"+cycles[i].month+"/"+cycles[i].year+ " " +cycles[i].hour+":"+cycles[i].minute+ "  value:"+ cycles[i].value);
                                tmpvalue.datasets[0].data.push(cycles[i].humidity);
                                tmpvalue.datasets[1].data.push(cycles[i].temperature);
                                tmpvalue.datasets[2].data.push(cycles[i].errors-preverror);
                                preverror=cycles[i].errors
                                
                                
                                
                            }
                            console.log(tmpvalue.datasets)
                            console.log(tmpvalue);
                            this.setState({data: tmpvalue});
                            //return tmpvalue;
          
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


  
  //TODO fare meglio
  changeResolution(event) {
    var tmpopt=this.state.options;
    if (event.target.value=="30 minutes") {
      tmpopt.scales.xAxes[0].time.unit='minute';
      tmpopt.scales.xAxes[0].time.unitStepSize=30;
      this.setState({options: tmpopt});
    }
    else if(event.target.value=="15 minutes") {
      tmpopt.scales.xAxes[0].time.unit='minute';
      tmpopt.scales.xAxes[0].time.unitStepSize=15;
      this.setState({options: tmpopt});
    }
    else if(event.target.value=="1 hour") {
      tmpopt.scales.xAxes[0].time.unit='hour';
      tmpopt.scales.xAxes[0].time.unitStepSize=1;
      this.setState({options: tmpopt});
    }
    else if(event.target.value=="2 hours") {
      tmpopt.scales.xAxes[0].time.unit='hour';
      tmpopt.scales.xAxes[0].time.unitStepSize=2;
      this.setState({options: tmpopt});
    }
  }
 

  //TODO Aggiungere qualche forma di controllo su input
  handlechangeStartDate(event) {
    //this.setState({inputdate: event.target.value});
    this.state.inputdate=event.target.value;
  }
  changeStartDate(event) {
    var tmpopt=this.state.options;
    var tmpdate=new Date(this.state.inputdate);
    tmpopt.scales.xAxes[0].ticks.min=tmpdate;
    this.setState({options: tmpopt});
  }

 
  //TODO se premo invio il form ricarica la pagina
  render() {
    return (
        <div style={{width: '750px', height:'450px'}}>
          <div >
          <Line  redraw={true} ref="chart" data={this.state.data} options={options} />
          </div>
          <form> 
            Resolution: 
            <input list="browsers" onChange={this.changeResolution}/>
            <datalist id="browsers">
                <option value="15 minutes"/>
                <option value="30 minutes"/>
                <option value="1 hour"/>
                <option value="2 hours"/>
            </datalist>
            </form>
            Start Date:
            <input type="datetime-local" id="myTime" onChange={this.handlechangeStartDate}/>
            <button onClick={this.changeStartDate}>Confirm</button>
        </div>
    );
  }
}




export default Diecutterhistory;