import React, {Component} from 'react'
import DeckGL from '@deck.gl/react';
import {H3ClusterLayer} from '@deck.gl/geo-layers';
import {StaticMap} from 'react-map-gl';
import {geoToH3} from "h3-js";

import MapsService from '../api/MapsService'

class ClusterLayer extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      actualLocationLat: null,
      actualLocationLong: null,
      sum: null,
      coordinates: [],
      clusterData: [],
      layer : new H3ClusterLayer({
        id: 'H3ClusterLayer',
        extruded: false,
        filled: true,
        data: [],
        getFillColor: data => [3, (1 - data.mean / 500) * 255, 73],
        getHexagons: data => data.hexIds,
        getLineColor: [255, 255, 255],
        lineWidthMinPixels: 2,
        stroked: true,
        pickable: true
      })
    }
  }

  componentDidMount()
  {
    MapsService.getDataByTodaysTimestamp()
    .then(response => {
      if(response.status === 200)
      {
        this.state.actualLocationLat = response.data[0].locationlat;
        this.state.actualLocationLong = response.data[0].locationlong;
        let coordinatesConverterToHex = 0;
        let key = 0;
        let dataClusterIndex = 0;
        let Avg = 0;

        for(key in response.data)
        {
          if(this.state.actualLocationLat === response.data[key].locationlat && this.state.actualLocationLong === response.data[key].locationlong)
          {
            this.state.sum += response.data[key].value
            
            if(key == response.data.length - 1)
            {
              Avg = ((this.state.sum / key) * 1000).toFixed(2)

              coordinatesConverterToHex = geoToH3(this.state.actualLocationLat,this.state.actualLocationLong, 10)
            
              this.state.coordinates[dataClusterIndex] = coordinatesConverterToHex

              for(dataClusterIndex in this.state.clusterData + 1)
              {
                this.state.clusterData.push( { mean:Avg , hexIds:[this.state.coordinates[dataClusterIndex]] } )
              }

              console.log(response.data)

              if(Avg >= 2000)
              {
                this.setState({
                  layer : new H3ClusterLayer({
                    ...this.state.layer.props,
                    getFillColor: data => [200, 30, 30],
                    data: this.state.clusterData
                  })
                })
              }
              else if(Avg >= 1000)
              {
                this.setState({
                  layer : new H3ClusterLayer({
                    ...this.state.layer.props,
                    getFillColor: data => [209, 198, 48],
                    data: this.state.clusterData
                  })
                })
              }
              else
              {
                this.setState({
                  layer : new H3ClusterLayer({
                    ...this.state.layer.props,
                    getFillColor: data => [3, (1 - data.mean / 500) * 255, 73],
                    data: this.state.clusterData
                  })
                })
              }

              console.log(this.state.layer.props.data)

              dataClusterIndex++;

            }
          }
          else if(this.state.actualLocationLat != response.data[key].locationlat && this.state.actualLocationLong != response.data[key].locationlong)
          {
            Avg = this.state.sum / key

            coordinatesConverterToHex = geoToH3(this.state.actualLocationLat,this.state.actualLocationLong)
            
            this.state.coordinates[key] = coordinatesConverterToHex

            for(dataClusterIndex in this.state.clusterData)
            {
              this.state.clusterData[dataClusterIndex] = [ {mean: Avg, hexIds: [this.state.coordinates[dataClusterIndex]] } ] 
            }

            this.setState({
              layer : new H3ClusterLayer({
                ...this.state.layer.props,
                data: this.state.clusterData
              })
            })

            this.state.actualLocationLat = response.data[key].locationlat
            this.state.actualLocationLong = response.data[key].locationlong
          } 
          else if(this.state.actualLocationLat === 0 && this.state.actualLocationLong === 0){}
        }

      }
    })
    .catch(error => {
      console.log(error)
    })
  }

  render() 
  {


    const INITIAL_VIEW_STATE = {
      longitude: 25.7324,
      latitude: 45.1251,
      zoom: 14,
      maxZoom:20,
      pitch: 0,
      bearing: 0
    };

    // let layer = new H3ClusterLayer({
    //   id: 'H3ClusterLayer',
    //   extruded: false,
    //   filled: true,
    //   data: this.state.clusterData,
    //   getFillColor: data => [3, (1 - data.mean / 500) * 255, 73],
    //   getHexagons: data => data.hexIds,
    //   getLineColor: [255, 255, 255],
    //   lineWidthMinPixels: 2,
    //   stroked: true,
    //   pickable: true
    // })

    const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoic2FiaW5zajA3IiwiYSI6ImNrdXF3ejhxMDJsbXIyd282eGZxMHNwdmEifQ.cva-Ejcp-lyywMVzUpz8zg';

    return (
        <DeckGL initialViewState={INITIAL_VIEW_STATE}  controller={true} layers={[this.state.layer]} getTooltip={({object}) => object && `Valoarea medie a senzorului: ${object.mean} nSv/h`}>
            <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
        </DeckGL>
    )
  }

}

export default ClusterLayer