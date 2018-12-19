import React, { Component } from 'react';
import './App.css';
import Header from './components/Header'
import Content from './components/Content'

class App extends Component {

  componentDidMount() {
    this.loadScript()
  }

  // Creates and returns a script tag for Google Maps API
  createMapScript() {
    let mapScript = document.createElement("script")
    const API_KEY = "AIzaSyAuh6WJvj8_TW_iwVKyM9n6yedBAMLp06A"
    mapScript.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3&callback=initMap`
    mapScript.async = true
    mapScript.defer = true
    mapScript.onerror = function () {
        document.write("Google Maps can't be loaded");
    };
    return mapScript
  }

  // Loads map script to the body and calls initMap() function to initialize the map
  loadScript() {
    let mapScript = this.createMapScript()
    let firstScriptElement = document.getElementsByTagName("script")[0]
    firstScriptElement.parentNode.insertBefore(mapScript, firstScriptElement)
    window.initMap = this.initMap
  }

  // Initializes a map element using Google Maps API
  initMap() {
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 42.2808, lng: -83.7330 },
      zoom: 14
    })
    window.map = map
    let infowindow = new window.google.maps.InfoWindow()
    window.infowindow = infowindow
    window.isInfoWindowOpen = false
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <Content/>
      </div>
    );
  }
}

export default App;
