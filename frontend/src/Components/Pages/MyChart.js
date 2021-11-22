import React, { Component } from "react";
import ApexCharts from "react-apexcharts";
import SensorService from "../api/SensorService";
import DatePicker from "react-datepicker";

import "../css/MyChart.css"

class MyChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDateSet:false,
      date:'',
      options :
      {
        chart: {
          foreColor: '#fff',
          zoom: {
            autoScaleYaxis: true
          }
        },
        title: {
          text: 'Valorile senzorului inregistrate pe data de ...',
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
          //lineCap: 'butt',
          colors: undefined,
          width: 3,
          dashArray: 0,      
        },
        noData: {
          text: 'Loading...',
          align: 'center',
          verticalAlign: 'middle',
          offsetX: 0,
          offsetY: 0,
          style: {
            color: undefined,
            fontSize: '14px',
            fontFamily: undefined
          }
        },
        series: [
          {
            total:5,
            name: "Radiation Exposure",
            data: []
          }
        ]
      },
      monthlyLineOptions : {
        chart: {
         foreColor: '#fff',
          zoom: {
            autoScaleYaxis: true
          }
        },
        title: {
          text: 'Valorile senzorului inregistrate in luna ...',
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
          enabled: false
        },
        stroke: {
          show: true,
          curve: 'smooth',
          colors: undefined,
          width: 3,
          dashArray: 0,      
        },
        noData: {
          text: 'Loading...',
          align: 'center',
          verticalAlign: 'middle',
          offsetX: 0,
          offsetY: 0,
          style: {
            color: undefined,
            fontSize: '14px',
            fontFamily: undefined
          }
        },
        series: [
          {
            total:5,
            name: "Radiation Exposure",
            data: []
          }
        ]
      },
      maxValueOfTheDay: 0,
      avgValueTheDay: 0,
      maxValueOfTheMonth: 0,
      avgValueTheMonth: 0,
      startDate: new Date(),
      dayValues: [],
      monthValues: [],
      timestamp: [],
      mydata: [],
      monthlyData: [],
      loading: false
    };

    this.sendDate = this.sendDate.bind(this);
  }

  sendDate()
  {
    this.setState({isDateSet:true})
    this.setState({values:[]})
    this.setState({timestamp:[]})
    this.setState({mydata:[]})

    const month = this.state.startDate.getMonth() + 1;
    this.setState({date : this.state.startDate.getDate() + "." + month + "." + this.state.startDate.getFullYear()});

    this.setState({loading:true})

    SensorService.getDataByTimestampsForChartByChoosingDay(this.state.startDate.getDate(), month, this.state.startDate.getFullYear())
    .then(res => {

      for(let key in res.data)
      {
        this.state.values.push(parseFloat(res.data[key].value) * 1000);
        this.state.timestamp.push(parseInt(res.data[key].timestamp * 1000));

        this.state.mydata[key] = [
          this.state.timestamp[key], this.state.values[key]
        ];
      }

      this.setState({maxValueOfTheDay:Math.max(...this.state.values)})

      const arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length

      this.setState({avgValueOfTheDay:arrAvg(this.state.values).toFixed(2)})

      this.setState({
        options: {
          ...this.state.options,
          title: {
            text: 'Valorile senzorului inregistrate pe data de ' + this.state.date,
            ...this.state.options.text
          },
          series: [{
            ...this.state.options.series,
            data: this.state.mydata
          }]
        }
      })

    })
    .catch(error => {
      console.log(error)
    })

    SensorService.getDataByTimestampsForChartByChoosingMonth(this.state.startDate.getDate(), month, this.state.startDate.getFullYear())
    .then(monthRes => {
      for(let key in monthRes.data)
      {
        this.state.monthValues.push(parseFloat(monthRes.data[key].value) * 1000);

        this.state.monthlyData[key] = [
          parseInt(monthRes.data[key].timestamp * 1000), parseFloat(monthRes.data[key].value * 1000)
        ]
      }

      this.setState({maxValueOfTheMonth:Math.max(...this.state.monthValues)})

      const arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length

      this.setState({avgValueOfTheMonth:arrAvg(this.state.monthValues).toFixed(2)})

      var months = [ "Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", 
           "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie" ];

      var selectedMonthName = months[month-1];

      this.setState({
        monthlyLineOptions: {
          ...this.state.monthlyLineOptions,
          title: {
            text: 'Valorile senzorului inregistrate in luna ' + selectedMonthName,
            ...this.state.options.text
          },
          series: [{
            ...this.state.monthlyLineOptions.series,
            data: this.state.monthlyData
          }]
        }
      })

      console.log(this.state.monthlyData)

      this.setState({loading:false});
    })
    .catch(error => {
      console.log(error)
    }) 

  }


  render() {

    return (
      <>

      <nav className = "chart-control-panel">
        <ul className = 'chart-control-panel-menu'>

          <li className = 'chart-nav-item'>
            <div className="col-text-secondary">
              Acest panou de control ajuta la afisarea datelor dintr-o zi anume
            </div>
          </li>

          <li className = 'chart-nav-item'>
            <div className="chart-date-picker">
              <DatePicker selected={this.state.startDate} dateFormat="dd/MM/yyyy" onChange={(date) => this.setState({ startDate : date})} />
            </div>
          </li>

          <li className = 'chart-nav-item'>
            <button className = 'chart-nav-submit' onClick={this.sendDate}>
                Trimite
            </button>
          </li>
        </ul>
      </nav>
      
      <div className="day-chart-boxes">
        <div className="chart-greatest-sensor-value-container">       
          <div className="chart-sensor-text">Valoarea maxima din ziua aleasa</div>

          <div className="chart-sensor-value">{this.state.maxValueOfTheDay}</div>
          <div className="chart-sensor-measurement">nSv/h</div>
        </div>

        <div className="chart-average-sensor-value-container">
            <div className="chart-sensor-text">Valoarea medie a senzorului</div>

            <div className="chart-sensor-value">{this.state.avgValueOfTheDay}</div>
            <div className="chart-sensor-measurement">nSv/h</div>
        </div>
      </div>

        <div className="day-line-chart">
          <ApexCharts
            options={this.state.options}
            series={this.state.options.series}
            type="area"
            width="900"
            height="300"
          />
        </div>

        <div className="month-chart-boxes">

          <div className="chart-greatest-sensor-value-container">
                      
            <div className="chart-sensor-text">Valoarea maxima din luna aleasa</div>

            <div className="chart-sensor-value">{this.state.maxValueOfTheMonth}</div>
            <div className="chart-sensor-measurement">nSv/h</div>

          </div>

          <div className="chart-average-sensor-value-container">
              
              <div className="chart-sensor-text">Valoarea medie a senzorului</div>

              <div className="chart-sensor-value">{this.state.avgValueOfTheMonth}</div>
              <div className="chart-sensor-measurement">nSv/h</div>

          </div>

        </div>

        <div className="month-line-chart">
          <ApexCharts
            options={this.state.monthlyLineOptions}
            series={this.state.monthlyLineOptions.series}
            type="area"
            width="900"
            height="300"
          />
        </div>

      </>

    );
  }
}

export default MyChart;