
import {factory1} from '../fakedata/data';
import {diecutters} from '../fakedata/data';
import {factories} from '../fakedata/data';
import Chart from 'chart.js';
import {Line} from 'react-chartjs-2';
import {cycles} from '../fakedata/cycles'




function predictchart() {
  var data = {
    labels: ["1 giorno", "1 settimana", "2 settimane", "1 mese", "3 mesi", "6 mesi", "9 mesi", "1 anno"],
    datasets: [
      {
        label: 'cardboards correct',
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
          label: 'threshold',
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
          pointHoverBackgroundColor: 'orange',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: []
        }
      ]
  };

var counter=100;
for (var i=0; i<data.labels.length; i++) {
  data.datasets[0].data.push(counter);
  counter=counter-(1.25);
  data.datasets[1].data.push(96);
}
return <div style={{width: '750px', height:'450px'}}>
        <div><Line  redraw={true} ref="chartpred" data={data} /></div>
        <div> DETECTED REMAINING USEFUL LIFE IN CONSTANT CONDITIONS: <b>1 MONTH</b></div>
      </div>
}

export default predictchart;