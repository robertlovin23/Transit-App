import React from 'react'
import GoogleMapReact from 'google-map-react'
import './CardStyle.css'
import stops from '../api/stops'

const Markers = ({stopMarker, activeItem,selectListItem}) => {
if(activeItem.onestop_id !== stopMarker.onestop_id){
    if(stopMarker.served_by_vehicle_types[0] === "bus"){
        return(
            <div onClick={() => {selectListItem(stopMarker)}}>
                <i className="big bus icon"/>
            </div>
        )
    } else if(stopMarker.served_by_vehicle_types[0] === "rail"){
        return(
            <div onClick={() => {selectListItem(stopMarker)}}>
                <i className="big train icon"/>
            </div>
        )
    } else if(stopMarker.served_by_vehicle_types[0] === "tram"){
        return(
            <div onClick={() => {selectListItem(stopMarker)}} >
                <i className="big subway icon"/>
            </div>
        )
    } else if(stopMarker.served_by_vehicle_types[0] === "metro"){
        return(
            <div onClick={() => {selectListItem(stopMarker)}} >
                <i className="big subway icon"/>
            </div>
        )
    } else if(stopMarker.served_by_vehicle_types[0] === "ferry"){
        return(
            <div onClick={() => {selectListItem(stopMarker)}}>
                <i className="big ship icon"/>
            </div>
        )
    }
} else if(activeItem.onestop_id === stopMarker.onestop_id) {
    if(stopMarker.served_by_vehicle_types[0] === "bus"){
        return(
            <div>
                <i className="big bus icon yellow markerStyle"/>
            </div>
        )
    } else if(stopMarker.served_by_vehicle_types[0] === "rail"){
        return(
            <div>
                <i className="big train icon yellow markerStyle"/>
            </div>
        )
    } else if(stopMarker.served_by_vehicle_types[0] === "tram"){
        return(
            <div>
                <i className="big subway icon yellow markerStyle"/>
            </div>
        )
    } else if(stopMarker.served_by_vehicle_types[0] === "metro"){
        return(
            <div>
                <i className="big subway icon yellow markerStyle"/>
            </div>
        )
    } else if(stopMarker.served_by_vehicle_types[0] === "ferry"){
        return(
            <div>
                <i className="big ship icon yellow markerStyle"/>
            </div>
        )
    } 
}
}
class Mapbox extends React.Component{
    state ={
        routePattern: []
    }
    // componentDidMount = async () => {
    //     const response = await stops.get('/route_stop_patterns')
    //     this.setState({
    //         routePattern: response.data
    //     })
    //     console.log(this.state.routePattern)
    // }
    render(){
    const { stops,lat,lng,defaultZoom,active,selectListItem } = this.props
    console.log(active)
        if(!active){
            return(
            <div className="mapHeight">
                <GoogleMapReact 
                    bootstrapURLKeys={{key: "AIzaSyCr5MR1j9onOL4o82um7Gj1rY7R9W0apWg"}}
                    defaultCenter={{lat: 39.0997, lng: -94.5786}}
                    center={{lat: lat, lng: lng}}
                    zoom={defaultZoom}/>
            </div>
            )
        }  else {

            const  singleLat  = active.geometry.coordinates[1];
            const  singleLng  = active.geometry.coordinates[0];

            return(
                <div className="mapHeight">
                    <GoogleMapReact 
                        bootstrapURLKeys={{key: "AIzaSyCr5MR1j9onOL4o82um7Gj1rY7R9W0apWg"}}
                        defaultCenter={{lat: 39.0997, lng: -94.5786}}
                        center={{lat: singleLat, lng: singleLng}}
                        zoom={defaultZoom}
                    >
                        {
                            stops.map((stop,index) => {
                                return(
                                    <Markers key={index} text="Marker"
                                            stopMarker={stop}
                                            activeItem={active}
                                            selectListItem={selectListItem}
                                            lat={stop.geometry.coordinates[1]}
                                            lng={stop.geometry.coordinates[0]}
        
                                    />
                                )
                            })
                        }
                    </GoogleMapReact>
                </div>
            )
        }

    }
}
export default Mapbox;