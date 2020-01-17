import React from 'react'
import Schedule from'./Schedule'
import './CardStyle.css'

class ListCard extends React.Component{

    render(){
        const {stop,active,selectListItem,listItem,term,haversineFormula,lat,lng,stops} = this.props
        if(!stop || !stop.operators_serving_stop[0].operator_name || !stop.served_by_vehicle_types[0]) {
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
                {/* Determines whether a stop is wheelchair accessible */}
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
                            //Routes the route names to the specific stop
                                stop.routes_serving_stop.map((route,index) => {
                                    return(
                                        <div key={index} style={{display:"inline-block", marginBottom: '5px', marginRight:'5px',borderRadius: "10px"}} className="routeStyle">{route.route_name}</div>
                                    )
                                })
                            }
                        <br/>
                    <p>Departure Times:</p>
                    <Schedule stop={stop} active={active} selectListItem={selectListItem} term={term} stops={stops}/>
                </div>
                <div className="content">
                    {haversineFormula(lat,lng,stop)}
                </div>
            </div>
        )
    }}
}

export default ListCard