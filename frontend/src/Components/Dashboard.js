import React, {Component} from 'react';
import Chart from "react-apexcharts";
import './css/Dashboard.css';
import "react-datepicker/dist/react-datepicker.css";
import SensorService from './api/SensorService';
import { ClipLoader } from 'react-spinners';

class Dashboard extends Component
{
    constructor(props) {
        super(props);
        this.state = {

            mydata: [],
            loading: false,
            maxValue: null,
            avgValue: null,
            values:[],
            timestamp:[],
            sensorAddress:''
        }
    }

    componentDidMount(){
        this.setState({loading:true})

        SensorService.getTimestampForToday()
        .then(res => {
            for(let key in res.data)
            {
                this.state.values.push(parseFloat(res.data[key].value))
                this.state.timestamp.push(parseInt(res.data[key].timestamp) * 1000)

                this.state.mydata[key] = [
                  parseInt(res.data[key].timestamp * 1000), parseFloat(res.data[key].value)
                ]
            }
            
            //var date = new Date( this.state.timestamp[95] * 1000);
            //var hours = date.getHours();
            //var minutes = "0" + date.getMinutes();
            //var seconds = "0" + date.getSeconds();
            
            //var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

            // Geocode.fromLatLng(res.data[0].locationlat,res.data[0].locationlong).then(
            //   (response) => {
            //     this.setState({sensorAddress:response.results[0].formatted_address})
            //     console.log(this.state.sensorAddress)
            //   }
            // )

            this.setState({loading:false})

            this.setState({maxValue:Math.max(...this.state.values)})

            const arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length

            this.setState({avgValue:arrAvg(this.state.values).toFixed(2)})
        })
        .catch(error => {
            console.log(error)
        })
    }


    render() {

      // TO-DO: de modificat TOOLTIP-ul

      var lineOptions = {
          chart: {
            height: 350,
            zoom: {
              autoScaleYaxis: true
            }
          },
          title: {
            text: 'Valorile senzorului inregistrate azi',
            align: 'left'
          },
          xaxis: {
            tickAmount: 6,
            type: "datetime",
            labels:{
              datetimeUTC: false
            }
          },
          tooltip: {
            x: {
              format: "dd.MM.yyyy HH:mm",
            },
            enabled:true,
            //theme: 'dark',
          },
          legend: {
            position: 'top',
            horizontalAlign: 'left'
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            curve: 'smooth',
            lineCap: 'butt',
            colors: undefined,
            width: 3,
            dashArray: 0,      
          },
          series: [
            {
              total:5,
              name: "Radiation Exposure",
              data: this.state.mydata
            }
          ]
        };

        var barOptions = {
          series: [{
          name: 'Inflation',
          data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
        }],
          chart: {
          height: 350,
          type: 'bar',
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            dataLabels: {
              position: 'top', // top, center, bottom
            },
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val + "%";
          },
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ["#304758"]
          }
        },
      
        xaxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          position: 'top',
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          crosshairs: {
            fill: {
              type: 'gradient',
              gradient: {
                colorFrom: '#D8E3F0',
                colorTo: '#BED1E6',
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              }
            }
          },
          tooltip: {
            enabled: true,
          }
        },
        yaxis: {
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
            formatter: function (val) {
              return val + "%";
            }
          }
        
        },
        title: {
          text: 'Gradul de expunere la radiatii lunar',
          floating: true,
          offsetY: 330,
          align: 'center',
          style: {
            color: '#444'
          }
        }
      };

      return (
        <>

          {this.state.loading ?
          
          <ClipLoader
          as="span"
          variant="warning"
          size="50px"
          role="status"
          aria-hidden="true"
          animation="grow"
          color="orange"/>

          :

          <div>
              <div className="greatest-sensor-value-container">
                  
                  <div className="sensor-text">Valoarea maxima inregistrata azi</div>

                  <div className="sensor-value">{this.state.maxValue}</div>
                  <div className="sensor-measurement">uSv</div>

              </div>

              <div className="lowest-sensor-value">

              </div>

              <div className="average-sensor-value-container">
                  
                  <div className="sensor-text">Valoarea medie a senzorului</div>

                  <div className="sensor-value">{this.state.avgValue}</div>
                  <div className="sensor-measurement">uSv</div>

              </div>

              <div className="lowest-sensor-value">

              </div>

              <div className="exposure-level-container">
                  
                  <div className="sensor-text">Grad de expunere la radiatii</div>

                  <div className="sensor-value">Scazut</div>

              </div>

              <div className="sensor-location-container">
                  
                  <div className="sensor-location-text">Locatia senzorului</div>

                  <div className="sensor-location-value">Campina</div>

              </div>

              <div className="line-chart">
                  <Chart
                  options={lineOptions}
                  series={lineOptions.series}
                  type="area"
                  width="800"
                  height="350"
                  />
              </div>

              <div className="bar-chart">
                  <Chart
                  type='bar'
                  options={barOptions}
                  series={barOptions.series}
                  width="750"
                  height="350"
                  />
              </div>
          </div>   
        }
        </>
      );
    }

}

export default Dashboard;