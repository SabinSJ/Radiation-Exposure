import React, {Component} from 'react';
import Chart from "react-apexcharts";
import Geocode from "react-geocode";
import './css/Dashboard.css';
import "react-datepicker/dist/react-datepicker.css";
import SensorService from './api/SensorService';
import { ClipLoader } from 'react-spinners';
import DarkModeLightModeService from './api/DarkModeLightModeService';
import AuthenticationService from "../Components/api/AuthenticationService"

class Dashboard extends Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      dailyData : [],
      monthlyData: [],
      avgValuesMonths: [],
      values: [],
      exposureRateText: "",
      avgValues: [],
      timestamp: [],
      //loading: false,
      maxValue: null,
      avgValue: null,
      nightMode:false,

      dailyLineOptions : {
        chart: {
          foreColor: '#fff',
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
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left'
        },
        dataLabels: {
          enabled: false,
          colors:["#FFF"]
        },
        stroke: {
          show: true,
          curve: 'smooth',
          lineCap: 'butt',
          colors: undefined,
          width: 3,
          dashArray: 0,      
        },
        colors: ["#26b7c7"],
        series: [
          {
            name: "Valoarea senzorului: ",
            data: []
          }
        ]
      },
      monthLineOptions : {
        chart: {
          foreColor: '#fff',
          zoom: {
            autoScaleYaxis: true
          }
        },
        title: {
          text: 'Valorile senzorului inregistrate luna aceasta',
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
            format: "dd.MM.yyyy",
          },
          enabled:true,
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left'
        },
        dataLabels: {
          enabled: false,
          colors:["#FFF"]
        },
        stroke: {
          show: true,
          curve: 'smooth',
          lineCap: 'butt',
          colors: undefined,
          width: 3,
          dashArray: 0,      
        },
        colors: ["#26b7c7"],
        series: [
          {
            name: "Valoarea senzorului: ",
            data: []
          }
        ]
      },

      barOptions : {
        series: [{
        foreColor: '#fff',
        name: 'Inflation',
        data: []
        }],
        colors: ["#26b7c7"],
        chart: {
        type: 'bar',
        },
        plotOptions: {
        bar: {
            dataLabels: {
              position: 'center', // top, center, bottom
            },
          }
        },
        dataLabels: {
          enabled: true,
          // formatter: function (val) {
          //   return val + "%";
          // },
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ["#FFF"]
          }
        },
        xaxis: {
          categories: [],
          position: 'top',
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          tooltip: {
            enabled: true,
          },
          labels: {
            show: true,
            rotate: -45,
            rotateAlways: false,
            hideOverlappingLabels: true,
            showDuplicates: false,
            trim: false,
            minHeight: undefined,
            maxHeight: 120,
            style: {
                colors: "#FFF",
                fontSize: '12px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 400,
                cssClass: 'apexcharts-xaxis-label',
            },
            offsetX: 0,
            offsetY: 0,
            format: undefined,
            formatter: undefined,
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
          text: 'Media valorilor lunar',
          floating: true,
          offsetY: 330,
          align: 'center',
          style: {
            color: '#FFF'
          }
        }
      },
      userLocation: "",
      userLatitude: null,
      userLongitude: null
    };
  }



  componentDidMount(){


    AuthenticationService.getUserData(sessionStorage.getItem("USER_SESSION_NAME"))
    .then(response => {
      if(response.status === 200){
          this.setState({userLocation: response.data.address})
          console.log(this.state.userLocation)

          Geocode.setApiKey("AIzaSyAFTrJnDeXYupuNvh6AdO9fXaG68IQnx60");
          Geocode.setLanguage("en");
          Geocode.setRegion("ro");

          Geocode.fromAddress(this.state.userLocation).then(
            (response) => {
              this.setState({userLatitude: response.results[0].geometry.location.lat, userLongitude: response.results[0].geometry.location.lng})
              console.log(this.state.userLatitude)
              console.log(this.state.userLongitude)


            },
            (error) => {
              console.error(error);
            }
          );

      }
    })
    .catch(error => {
        console.log(error)
    })

    SensorService.getDataByTimestampForToday(this.state.userLatitude, this.state.userLongitude)
    .then(dailyRes => {
      for(let key in dailyRes.data)
      {
          this.state.values.push(parseFloat(dailyRes.data[key].value) * 1000)
          this.state.timestamp.push(parseInt(dailyRes.data[key].timestamp) * 1000)

          this.state.dailyData[key] = [
            parseInt(dailyRes.data[key].timestamp * 1000), parseFloat(dailyRes.data[key].value * 1000)
          ]
      }

      this.setState({
        dailyLineOptions: {
          ...this.state.dailyLineOptions,
          series: [{
            ...this.state.dailyLineOptions.series,
            data: this.state.dailyData
          }]
        }
      })

      this.setState({maxValue:Math.max(...this.state.values)})

      if(this.state.maxValue < 1000)
      {
        this.setState({exposureRateText : "Scazut"})
      }
      else if(this.state.maxValue > 1000)
      {
        this.setState({exposureRateText : "Critic"})
      }

      const arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length

      this.setState({avgValue:arrAvg(this.state.values).toFixed(2)})
    })
    .catch(error => {
        console.log(error)
    })

    SensorService.getTimestampForMonth()
    .then(monthRes => {
      for(let key in monthRes.data)
      {
        this.state.monthlyData[key] = [
          parseInt(monthRes.data[key].timestamp * 1000), parseFloat(monthRes.data[key].value * 1000)
        ]
      }
      
      this.setState({
        monthLineOptions: {
          ...this.state.monthLineOptions,
          series: [{
            ...this.state.monthLineOptions.series,
            data: this.state.monthlyData
          }]
        }
      })
      
      //this.setState({loading:false});
    })
    .catch(error => {
      console.log(error)
    }) 

    SensorService.getAverageValuesMonthToMonth()
    .then(avgRes => {
      for(let key in avgRes.data){
        for(let i in avgRes.data[key].buckets){
          this.state.avgValuesMonths[i] = [avgRes.data[key].buckets[i].keyAsString]
          this.state.avgValues[i] = parseFloat((avgRes.data[key].buckets[i].aggregations.asMap.avg.value * 1000).toFixed(2))
        }
      }

      this.setState({
        barOptions: {
          ...this.state.barOptions,
          series: [{
            ...this.state.barOptions.series,
            data: this.state.avgValues
          }],
          xaxis: {
            ...this.state.barOptions.xaxis,
            categories: this.state.avgValuesMonths
          }
        }
      })

    })
    .catch(error => {
      console.log(error)
    })
  }

  componentWillReceiveProps()
  {
    if(!DarkModeLightModeService.isDarkModeActivated())
    {
      //document.getElementsByClassName("dashboard-line-chart")[0].style.backgroundColor = "#2b2d3e";
      console.log("darked");
    }else{
      //document.getElementsByClassName("dashboard-line-chart")[0].style.backgroundColor = "#FFF";
      console.log("not darked")
    }
  }


  // TO-DO: de modificat TOOLTIP-ul

  render(){

    return (
      <>
  
      {/* {this.state.loading ?
      
      <ClipLoader
      as="span"
      variant="warning"
      size="50px"
      role="status"
      aria-hidden="true"
      animation="grow"
      color="orange"/>

      : */}

        <div>
          <div className="greatest-sensor-value-container">
              
              <div className="sensor-text">Valoarea maxima inregistrata azi</div>

              <div className="value">{this.state.maxValue} nSv/h</div>

          </div>

          <div className="average-sensor-value-container">
              
              <div className="sensor-text">Valoarea medie a senzorului</div>

              <div className="value">{this.state.avgValue} nSv/h</div>

          </div>

          <div className="exposure-level-container">
              
              <div className="sensor-text">Grad de expunere la radiatii</div>

              <div className="value">{this.state.exposureRateText}</div>

          </div>

          <div className="sensor-location-container">
              
              <div className="sensor-location-text">Locatia senzorului</div>

              <div className="value">Campina</div>

          </div>

          {/* {this.state.nightMode
          
          &&
          

          <div className="dashboard-line-chart" style={{backgroundColor:'#fff'}}>
              <Chart
              options={this.state.dailyLineOptions}
              series={this.state.dailyLineOptions.series}
              type="area"
              height="350px"
              />
          </div>

          } */}

          <div className="daily-dashboard-line-chart">
              <Chart
              options={this.state.dailyLineOptions}
              series={this.state.dailyLineOptions.series}
              type="area"
              height="300"
              />
          </div>


          <div className="monthly-dashboard-line-chart">
              <Chart
              options={this.state.monthLineOptions}
              series={this.state.monthLineOptions.series}
              type="area"
              height="300"
              />
          </div>

          <div className="monthly-avg-dashboard-bar-chart">
              <Chart
              options={this.state.barOptions}
              series={this.state.barOptions.series}
              type="bar"
              height="350"
              />
          </div>

      </div>   
    {/* } */}
    </>
    );
  }
}

export default Dashboard;