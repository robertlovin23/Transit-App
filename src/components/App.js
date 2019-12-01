import React from 'react';
import stops from '../api/stops'
import SearchBar from './SearchBar'
import Mapbox from './Mapbox'
import Geocode from 'react-geocode'
import StationList from './StationList'

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
            defaultZoom: 5      
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
               lng: this.state.lng
           })
           console.log(this.state.stops,this.state.lat,this.state.lng)
       }
    userGeolocation = (lat,lng) => {
        navigator.geolocation.getCurrentPosition((position) => {
            //Set user location as lat and lng
            this.setState({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                defaultZoom: 13
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
                defaultZoom: 15
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
        console.log(stop)
        this.setState({
            selectedStop: stop
        })
        console.log(this.state.selectedStop)
    }
    render(){
        return(
                <div className="ui grid">
                    <div className="four wide column">
                        <SearchBar onTermSubmit={this.componentDidMount}/>
                        <StationList stops={this.state.stops} selectListItem={this.selectListItem}/>
                     </div>
                     <div className="twelve wide column">
                     <Mapbox stops={this.state.stops} 
                        lat={this.state.lat} 
                        lng={this.state.lng}
                        selectListItem={this.selectListItem}
                        defaultZoom={this.state.defaultZoom}/>
                    </div>
                </div>
        )
    }
}

export default App;