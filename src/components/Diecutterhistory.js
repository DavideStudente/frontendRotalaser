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



var options= {
    responsive: true,
    //maintainAspectRatio: false,
    scales: {
        xAxes: [{
            type: 'time',
            time: {
                unit: 'minute', 
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


var data=chartdiehistory();

class Diecutterhistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {options: options, inputdate: ''};
    this.changeResolution = this.changeResolution.bind(this);
    this.changeStartDate = this.changeStartDate.bind(this);
    this.handlechangeStartDate=this.handlechangeStartDate.bind(this);
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
          <Line  redraw={true} ref="chart" data={data} options={options} />
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