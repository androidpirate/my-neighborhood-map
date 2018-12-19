import React, { Component } from 'react';

class Map extends Component {
  markers = []

  state = {
    venues: []
  }

  // Creates markers for each venue in the list
  createMarker() {
    this.props.filteredVenues.map(venue => {
      let marker = new window.google.maps.Marker({
        position: {lat: venue.location.lat, lng: venue.location.lng},
        map: window.map,
        title: venue.name
      })
      this.markers.push(marker)
      marker.addListener("click", () => {
        this.props.openInfoWindow(marker, venue)
      })
    })
    window.markers = this.markers
  }

  // Removes markers from the map
  removeMarkers() {
    if(this.markers.length !== 0) {
      for(let i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null)
      }
    }
  }

  render() {
    this.removeMarkers()
    this.createMarker()
    if(window.isInfoWindowOpen) {
      console.log("Function called")
      this.props.openInfoWindow(window.infoWindowMarker, window.infoWindowVenue)
    }
    return (
      <div id="map"></div>
    )
  }
}

export default Map
