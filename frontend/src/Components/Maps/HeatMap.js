import React, {Component} from 'react'
import DeckGL from '@deck.gl/react';
import {HeatmapLayer} from '@deck.gl/aggregation-layers';
import {StaticMap} from 'react-map-gl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthenticationService from "../api/AuthenticationService"

import MapsService from '../api/MapsService'

class HeatMap extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
        data: [],
        arr: []
    }
  }

  componentDidMount()
  {
    if(AuthenticationService.isUserLoggedIn())
    {
      MapsService.getTrackingData(sessionStorage.getItem("USER_SESSION_NAME"))
      .then(response => {
        if(response.status === 200)
        {

          for(var i = 0; i < response.data.length; i++)
          {
            this.state.arr[i] = { 'COORDINATES' : [response.data[i].longitude,response.data[i].latitude] }

            this.setState({data:this.state.arr})    
          }

          console.log("data",this.state.data)
        }
      })
      .catch(error => {
        console.log(error)
      })

    }else{
      toast.error('Trebuie sa fii logat ca sa poti accesa aceasta mapa', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
    }
  }

  render() 
  {
    const INITIAL_VIEW_STATE = {
      latitude: 45.13,
      longitude: 25.73,
      zoom: 13,
      pitch: 0,
      bearing: 0
    };

    const layer = new HeatmapLayer({
      id: 'heatmapLayer',
      data: this.state.data,
      getPosition: d => d.COORDINATES,
      radiusPixels: 25,
      intensity: 1,
      colorRange: [[122, 219, 110],[122, 219, 110]]
    });

    const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoic2FiaW5zajA3IiwiYSI6ImNrdXF3ejhxMDJsbXIyd282eGZxMHNwdmEifQ.cva-Ejcp-lyywMVzUpz8zg';

    return (
      <>
      <div>
        <ToastContainer />

        <DeckGL initialViewState={INITIAL_VIEW_STATE} controller={true} layers={[layer]} >
            <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
        </DeckGL>
      </div>
      </>
    )
  }

}

export default HeatMap