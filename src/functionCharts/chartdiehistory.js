
import {factory1} from '../fakedata/data';
import {diecutters} from '../fakedata/data';
import {factories} from '../fakedata/data';
import Chart from 'chart.js';
import {Line} from 'react-chartjs-2';
//import {cycles} from '../fakedata/cycles'


const data = {
    labels: [],
    datasets: [
      {
        label: 'cardboards produced',
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
      }
    ]
  };

/*function chartdiehistory() {
    var tmpvalue=data;
    //console.log(tmpvalue);
    //console.log(tmpvalue.labels);
    
    
    for (var i=0; i<cycles.length; i++) {
        tmpvalue.labels.push(new Date(cycles[i].year, cycles[i].month, cycles[i].day, cycles[i].hour, cycles[i].minute));
        //tmpvalue.labels.push(cycles[i].day + "/"+cycles[i].month+"/"+cycles[i].year+ " " +cycles[i].hour+":"+cycles[i].minute);
        //console.log(cycles[i].day + "/"+cycles[i].month+"/"+cycles[i].year+ " " +cycles[i].hour+":"+cycles[i].minute+ "  value:"+ cycles[i].value);
        tmpvalue.datasets[0].data.push(cycles[i].value);
        
        
        
    }
    console.log(tmpvalue);
    return tmpvalue;
   
}*/

function chartdiehistory(diecutterId) {
  var tmpvalue
  const headers = { 'username': '123', 'key': 'chiave elegante' };
  fetch("https://localhost:5002/v1/diecutters/D1/cycles", { headers })
              .then(res => res.json())
              .then(
                (result) => {
                  var cycles = result;
                  //alert('A name was submitted: ' + this.state.items);
                  console.log("CYCLES PERVENUTI");
                  console.log(cycles);
                  
                  tmpvalue=data;
                  //console.log(tmpvalue);
                  //console.log(tmpvalue.labels);
                  
                  
                  for (var i=0; i<cycles.length; i++) {
                      tmpvalue.labels.push(new Date(cycles[i].createdAt));
                      console.log(new Date(cycles[i].createdAt));
                      //tmpvalue.labels.push(new Date(cycles[i].year, cycles[i].month, cycles[i].day, cycles[i].hour, cycles[i].minute));
                      //tmpvalue.labels.push(cycles[i].day + "/"+cycles[i].month+"/"+cycles[i].year+ " " +cycles[i].hour+":"+cycles[i].minute);
                      //console.log(cycles[i].day + "/"+cycles[i].month+"/"+cycles[i].year+ " " +cycles[i].hour+":"+cycles[i].minute+ "  value:"+ cycles[i].value);
                      tmpvalue.datasets[0].data.push(cycles[i].humidity);
                      
                      
                      
                  }
                  console.log(tmpvalue);
                  //return tmpvalue;

                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                  alert("ERRORE!" + error);
                }
        )
  console.log("NUOVO VALORE TMPVALUE")
  console.log(tmpvalue);
  return tmpvalue;
  
}

export default chartdiehistory;