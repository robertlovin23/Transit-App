import React from 'react'
import Schedule from'./Schedule'
import HaversineGeolocation from 'haversine-geolocation'
import './CardStyle.css'

class ListCard extends React.Component{
    deg2rad = (deg) => {
        return deg * (Math.PI/180)
    }
    getMiles(i) {
        return i / 1.6
    }
    haversineFormula = () => {
        const { active,lat,lng,stop } = this.props 
        console.log(active,lat,lng)

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
        var d = R * c;
        return(
            <div style={{display:"inline"}}>
                <p>Distance From Location:</p> 
                {this.getMiles(d).toFixed(2)} Miles
            </div>
        )
    }
    render(){
        const {stop,active,selectListItem,listItem,term} = this.props
        if(!stop && !stop.operators_serving_stop[0].operator_name) {
            return(
                <div>Loading...</div>
            )
        } else {
        return(
        //matches active item with active stop to check which click handler is being handled
         <div className={stop === active ? 'ui card raised yellow' : 'ui card '}
                style={{width: "100%", marginBottom: "15px", marginTop: "10px"}} 
                onClick={() => selectListItem(stop)}
                ref={listItem}
            >
            <div className="content">
            <i className={stop.wheelchair_boarding != null ? "ui wheelchair icon" : ""} style={{float:"right"}}/>
                <div className="header"><h4>{stop.name}</h4></div>
                <div className="meta">
                    Type: {stop.served_by_vehicle_types[0].charAt(0).toUpperCase() + stop.served_by_vehicle_types[0].slice(1)}
                </div>
            </div>
            <div className="content">
                    <h4 className="ui sub header">{stop.operators_serving_stop[0].operator_name}</h4>
                    <br/>
                    <p>Routes:</p>
                {   
                    stop.routes_serving_stop.map((route,index) => {
                        return(
                            <div key={index} style={{display:"inline-block", marginBottom: '5px', marginRight:'5px',borderRadius: "10px"}} className="routeStyle">{route.route_name}</div>
                        )
                     }
                    )
                }
                {/* <Schedule stop={stop} active={active} selectListItem={selectListItem} term={term}/> */}
            </div>
            <div className="content">
                {this.haversineFormula()}
            </div>
        </div>
        )
    }}
}

export default ListCard