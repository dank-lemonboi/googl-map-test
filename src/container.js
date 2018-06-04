import React, { Component } from 'react'
// import Map from './map'
import {Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react'
import PropTypes from 'prop-types'
import Inputs from './locationInput'
import SearchInput from './placesAutoComplete'

  export class Container extends Component {
      constructor(props) {
          super(props)

          this.state = {
              showingInfoWindow: false,
              activeMarker: {},
              selectedPlace: {},
              markers:[ 
                   {
                name:'DevMountain',
                desc:'THE place to learn and grow as a Developer!',
                url:'https://devmountain.com/',
                lat: 40.2262,
                lng: -111.6609
                   },
                   {
                     name: 'Marker 1',
                     lat: 40.2209,
                     lng: -111.6590
                   },
                   {
                    name: 'Marker 2',
                    lat: 40.2419,
                    lng: -111.6660
                   },
                   {
                    name: 'Marker 3',
                    lat: 40.2400,
                    lng: -111.6388
                   },
                   {
                    name: 'Marker 4',
                    lat: 40.2378,
                    lng: -111.6200
                   },
                   {
                    name: 'Marker 5',
                    lat: 40.2500,
                    lng: -111.63200
                   },
                   {
                    name: 'Marker 6',
                    lat: 40.2455,
                    lng: -111.6377
                   }

                     ]
          }
      }

      onMarkerClick = (props, marker, e) => {
          this.setState({
              selectedPlace: props,
              activeMarker: marker,
              showingInfoWindow: true,
          })
      }

      onMapClicked = (props) => {
          if(this.state.showingInfoWindow) {
              this.setState({
                  showingInfoWindow: false,
                  activeMarker: null
              })
          }
        }

      newLocation = ( name, lat, lng ) => {
          let newPos = {
              name: this.state.name,
              lat: Number(this.state.lat),
              lng: Number(this.state.lng)
          }
         this.setState({
             markers: [...this.state.markers, newPos],
             name: '',
             lat: '',
             lng: ''
         })

      }
   

      render() {
          console.log(this.state)
          const {markers} = this.state

          const style = {
              width: '100vw',
              height: '100vh'
          }

          let displayMarkers = markers.map( (marker, i) => {
              return (
              <Marker key={i} 
                position={{lat: marker.lat, lng: marker.lng } } 
                name={marker.name}
                onClick={this.onMarkerClick}
              /> 
            )
          })

          if(!this.props.loaded) {
              return <div>Loading...</div>
          }

          return (
              <div style={style}>
                <Map
                    google={this.props.google}
                    initialCenter={{
                        lat: 40.2338,
                        lng: -111.6585
                    }}            
                    zoom={14}
                    onClick={this.onMapClicked}
                >
                <div style={{
                    zIndex:'5',
                    position: 'absolute',
                    left: '45%'
                }}>
                    <SearchInput />
                </div>
                
                {/* Default marker... displays at the center of our map when rendered */}
                <Marker />

                {/* Displays 'Marker components' from an array of coordinates. Will render from an unknown array length. */}
                {displayMarkers}

                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                        <h4>{this.state.selectedPlace.desc}</h4>
                        <a href={this.state.selectedPlace.url}><h5>Click here for more information.</h5></a>
                    </div>
                </InfoWindow>
                </Map>
                
                
              </div>
          )
      }
  }

  export default GoogleApiWrapper({
      apiKey: ('AIzaSyAL5r0-LhNUW9LEyd_5ceKbuBDnDYPhg2g')
  })(Container)