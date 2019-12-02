import React from 'react';
import stops from '../api/stops'
import SearchBar from './SearchBar'
import Mapbox from './Mapbox'
import Geocode from 'react-geocode'
import StationList from './StationList'
import Header from './Header'
import Footer from './Footer'

//Google Geocode API key, need to secure
Geocode.setApiKey("AIzaSyCr5MR1j9onOL4o82um7Gj1rY7R9W0apWg");

class App extends React.Component{
    constructor(){
        super();
        this.state={
            stops: [],
            selectedStop: null,
            lat: 39.828175,
            lng: -98.579500,
            defaultZoom: 5,
            active: false      
        }
    }
    onUserSubmit = async() => {
        //Sends a request using axios and async/await to return a promise, then sets the state
        const response = await stops.get('/stops', {      
          params: {
                  lat: this.state.lat,
                  lon: this.state.lng,
                  r: 1000
              }
           });
           this.setState({
               stops: response.data.stops,
               lat: this.state.lat,
               lng: this.state.lng,
               selectedStop: response.data.stops[0],
               active: response.data.stops[0]
           })
           console.log(this.state.stops,this.state.lat,this.state.lng)
       }
    userGeolocation = (lat,lng) => {
        navigator.geolocation.getCurrentPosition((position) => {
            //Set user location as lat and lng
            this.setState({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                defaultZoom: 17
            })
            console.log(this.state.lat,this.state.lng)
            this.onUserSubmit(lat,lng)
       })      
    }
    //Geocodes the Address that the user inputs
    geocodeAddress = (term) => {
        Geocode.fromAddress(term).then(
          response => {
            const { lat, lng } = response.results[0].geometry.location;
            this.setState({
                lat: lat,
                lng: lng,
                defaultZoom: 17
            })
            this.onUserSubmit(lat,lng)
          },
          error => {
            console.log(error);
          }
        )    
       }
    // Conditional between User Geolocation and Geocoding an Address
    componentDidMount = (term,lat,lng) => {
        if(!term){
            this.userGeolocation(lat,lng);
        } else {
            this.geocodeAddress(term)
        }
    }
    //TODO: click list item that corresponds to the map
    selectListItem = (stop) => {
        this.setState({
            selectedStop: stop,
            defaultZoom: 17,
            active: !false
        })
    }
    render(){
        return(
            <div>
                <Header/>
                <div className="ui mobile reversed stackable two column grid">
                    <div className="sixteen wide mobile six wide tablet four wide computer column">
                        <SearchBar onTermSubmit={this.componentDidMount}/>
                        <StationList stops={this.state.stops} selectListItem={this.selectListItem} active={this.state.selectedStop}/>
                     </div>
                     <div className="sixteen wide mobile ten wide tablet twelve wide computer column">
                     <Mapbox stops={this.state.stops} 
                        lat={this.state.lat} 
                        lng={this.state.lng}
                        stop={this.state.selectedStop}
                        defaultZoom={this.state.defaultZoom}/>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default App;