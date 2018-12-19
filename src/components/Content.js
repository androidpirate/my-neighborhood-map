import React, { Component } from 'react';
import Map from './Map'
import List from './List'
import FourSquareAPI from '../API/FourSquareAPI'

class Content extends Component {

  state = {
    venues: [],
    filteredVenues: [],
    query: window.query,
    sidebarOpen: false,
    infoWindowMarker: null,
    infoWindowVenue: ""
  }

  // Uses FourSquareAPI to fetch data then sets venue state to response
  componentDidMount(){
    FourSquareAPI.searchVenues({
      near: "Ann Arbor, MI",
      categoryId: "4d4b7105d754a06372d81259",
      query: "library",
      limit: 15
    }).then(response => {
      this.setState({
        venues: response.response.venues,
        filteredVenues: response.response.venues
      })
    })
  }

  // Handles query input in filter field
  handleInput = (query) => {
    window.query = query
    this.setState({
      query: window.query
    })
    if(query) {
      this.setState({
        filteredVenues: this.filterLocations(query, this.state.venues)
      })
    }
  }

  // Handles opening an InfoWindow for venue
  handleClick = (venueId) => {
    let venue = this.findVenue(venueId)
    for(let i=0; i < window.markers.length; i++) {
      if(venue.name === window.markers[i].title) {
        this.openInfoWindow(window.markers[i], venue)
      }
    }
  }

  // Helper method to find correct venue for clicked list item
  findVenue(venueId) {
    for(let i = 0; i < this.state.filteredVenues.length; i++) {
      if(venueId === this.state.filteredVenues[i].id) {
        return this.state.filteredVenues[i]
      }
    }
  }

  // Filter locations by query
  filterLocations(query, venues) {
    return venues.filter(venue => venue.name.toLowerCase().includes(query.toLowerCase()))
  }

 // Opens an InfoWindow for the marker
  openInfoWindow = (marker, venue) => {
    if(window.infowindow.marker !== marker) {
      window.infowindow.marker = marker
      let windowContent = this.getInfoWindowContent(venue)
      window.infowindow.setContent(windowContent);
      window.infowindow.open(window.map, marker);
      window.isInfoWindowOpen = true
      window.infoWindowMarker = marker
      window.infoWindowVenue = venue
    } else {
      window.infowindow.open(window.map, marker)
    }
    window.google.maps.event.addListener(window.infowindow, 'closeclick', function() {
      window.isInfoWindowOpen = false
      window.infoWindowMarker = null
      window.infoWindowVenue = null
      window.infowindow.marker = null
    })
  }

  // Helper method that generates InfoWindow content
  getInfoWindowContent(venue) {
    return `<div><strong>Name:</strong> ${venue.name}</div>
            <div><strong>Category:</strong> ${venue.categories[0].name}</div>
            <div><strong>Address:</strong> ${venue.location.formattedAddress[0]}</div>
            <div>${venue.location.formattedAddress[1]}</div>`
  }

  // Collapse sidebar
  collapseSideBar = () => {
    let sidebarOpen = this.state.sidebarOpen
    if(sidebarOpen) {
      this.setState({
        sidebarOpen: false
      })
    } else {
      this.setState({
        sidebarOpen: true
      })
    }
  }

  render() {
    return (
      <div id="content-container">
        <div id="hamburger-icon" onClick={() => this.collapseSideBar()}>
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>
        <div id="feature-container">
          {this.state.sidebarOpen ?
          <List id="list"
              filteredVenues={this.state.filteredVenues}
              handleInput={this.handleInput}
              handleClick={this.handleClick}/> : null}
          <Map
              filteredVenues={this.state.filteredVenues}
              openInfoWindow={this.openInfoWindow}/>
        </div>
      </div>
    )
  }
}

export default Content
