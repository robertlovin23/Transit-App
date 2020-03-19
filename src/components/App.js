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
            transport: "Transportation",
            selectedStop: null,
            lat: 39.828175,
            lng: -98.579500,
            defaultZoom: 5,
            active: false,
            distance: [],
            // radius: 800
        }

    }

    onUserSubmit = async(radius) => {
        //Sends a request using axios and async/await to return a promise, then sets the state
            const response = await stops.get('/stops', {      
            params: {
                    lat: this.state.lat,
                    lon: this.state.lng,
                    r: 800
                }
            });
        //Sets the state of the latitude, longitude, stops, and which stop is actively selected by the user
           this.setState({
               stops: response.data.stops,
               lat: this.state.lat,
               lng: this.state.lng,
               selectedStop: response.data.stops[0],
               active: response.data.stops[0]
           })
           console.log(radius)
       }
    //Find's users current location 
    userGeolocation = (lat,lng) => {
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };
        navigator.geolocation.getCurrentPosition((position,options) => {
            //Set user location as lat and lng
            this.setState({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                defaultZoom: 17,
            });
            this.onUserSubmit(lat,lng)
       })      
    }
    // handleRadiusChange = (event) => {
    //     this.setState({
    //         radius: event.target.value
    //     })
    // }
    // radiusSubmit = (event) => {
    //     event.preventDefault();
    //     this.props.radiusSubmit(
    //         this.state.radius
    //     )
    // }
    
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
            this.geocodeAddress(term);
        }
    }
    //Degrees to radians conversion
    deg2rad = (deg) => {
        return deg * (Math.PI/180)
    }
    //KM to Miles calculation
    getMiles(i) {
        return i / 1.6
    }
    //Haverisne Calculation that allows you to measure the distance between a map marker and the currently marked location
    haversineFormula = (lat,lng,stop) => {

        var R = 6371;

        var lat1 = lat
        var lng1 = lng
        var lat2 = stop.geometry.coordinates[1]
        var lng2 = stop.geometry.coordinates[0]

        var dLat = this.deg2rad(lat2 - lat1);
        var dLng = this.deg2rad(lng2 - lng1);
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
                Math.sin(dLng/2) * Math.sin(dLng/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var distanceObject = R * c;
        return(
            <div style={{display:"inline"}}>
                <p>Distance From Location:</p> 
                {this.getMiles(distanceObject).toFixed(2)} Miles
            </div>
        )
    }
    //TODO: click list item that corresponds to the map
    selectListItem = (stop) => {
        this.setState({
            selectedStop: stop,
            defaultZoom: 18,
            active: !false
        });
    }
    render(){
        return(
            <div>
                <Header/>
                <div className="ui mobile reversed stackable two column grid">
                    <div className="sixteen wide mobile six wide tablet four wide computer column">
                        <div className="ui segment">
                        <SearchBar onTermSubmit={this.componentDidMount} style={{alignContent: "center", display: "block"}}/>
                            {/* <div className=" ui field filter-section" style={{marginTop:"10px"}}>
                                <p>Distance From Location:</p>
                                    <select className="ui search dropdown" value={this.state.radius} onChange={this.handleRadiusChange} onSubmit={this.radiusSubmit}>
                                        <option value={400}>0.25 Miles</option>
                                        <option value={800}>0.50 Miles</option>
                                        <option value={1200}>0.75 Miles</option>
                                        <option value={1600}>1 Mile</option>
                                    </select>
                                </div> */}
                        </div>
                        <StationList stops={this.state.stops} 
                            selectListItem={this.selectListItem} 
                            active={this.state.selectedStop} 
                            lat={this.state.lat} 
                            lng={this.state.lng} 
                            haversineFormula={this.haversineFormula}/>
                     </div>
                     <div className="sixteen wide mobile ten wide tablet twelve wide computer column">
                        <Mapbox stops={this.state.stops} 
                            lat={this.state.lat} 
                            lng={this.state.lng}
                            active={this.state.selectedStop}
                            selectListItem={this.selectListItem}
                            defaultZoom={this.state.defaultZoom}
                     />
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default App