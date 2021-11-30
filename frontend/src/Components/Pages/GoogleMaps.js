import React, {useState} from 'react';
import HeatMap from '../Maps/HeatMap';
import ClusterLayer from '../Maps/ClusterLayer';
import DatePicker from "react-datepicker";
import MapsService from "../api/MapsService";
import Draggable from 'react-draggable'; // The default

import '../css/Maps.css';
import gear from '../images/gear.png'

function Maps()
{

  const draggable = useState(React.Draggable);

  const [clusterLayer,seClusterLayerMap] = useState(false);
  const [heatMapLayer,setheatMapLayer] = useState(false);

  const [values,setValues] = useState([])
  const [mydata,setMyData] = useState([])
  const [timestamp,setTimestamp] = useState([])
  const [isMenuActivated, setMenuActivated] = useState(false)

  function clusterLayerHandleClick() {
    seClusterLayerMap(true);
     setheatMapLayer(false);
  }

  function heatMapLayerHandleClick(){
    seClusterLayerMap(false);
    setheatMapLayer(true);
  }

  function settingsClick()
  {
    if(!isMenuActivated)
      setMenuActivated(true)
    else
      setMenuActivated(false)
  }

  function sendDate(){
    const month = startDate.getMonth() + 1;

    MapsService.getTrackingDataByDay(sessionStorage.getItem("USER_SESSION_NAME"),startDate.getDate(),month,startDate.getFullYear())
    .then(res => {

      console.log(res.data)

      // for(let key in res.data)
      // {
      //   values.push(parseFloat(res.data[key].value));
      //   this.state.timestamp.push(parseInt(res.data[key].timestamp * 1000));

      //   mydata[key] = [
      //     this.state.timestamp[key], this.state.values[key]
      //   ];
      // }

      // this.setState(this.state.mydata)


      // console.log(this.state.mydata)

    })
    .catch(error => {
      console.log(error)
    })

  }

  const [startDate, setStartDate] = useState(new Date());

  return (
    <>
    
    <img className="settings-btn" src={gear} alt="setari" onClick={settingsClick}/>

    {
    
    isMenuActivated ?
    
    <Draggable>
      <nav className = "control-panel">
        <ul className = 'control-panel-menu'>
          <li className = 'nav-item'>

            <div className="col-text-secondary">
              Alegeti o mapa
            </div>
          </li>

          <li className = 'nav-item'>
            <button className = 'nav-button' onClick={clusterLayerHandleClick}>
              Hexagon Layer
            </button>
          </li>

          <li className = 'nav-item'>
            <button className = 'nav-button' onClick={heatMapLayerHandleClick}>
              HeatMap Layer
            </button>
          </li>

          <li className = 'nav-item'>
            <div className="col-text-secondary">
              Alege o zi
            </div>
          </li>

          <li className = 'nav-item'>
            <div className="date-picker">
              <DatePicker selected={startDate} dateFormat="dd/MM/yyyy" onChange={(date) => setStartDate(date)} />
            </div>
          </li>

          <li className = 'nav-item'>
            <button className = 'nav-submit' onClick={sendDate}>
                Trimite
            </button>
          </li>
        </ul>
      </nav>
    </Draggable>

    :

    <div></div>
    }

      <div className="map">
        { !clusterLayer && !heatMapLayer && <ClusterLayer />}
        { clusterLayer && <ClusterLayer /> }
        { heatMapLayer && <HeatMap /> }
      </div>
    
    </>
  )
}

export default Maps