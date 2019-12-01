import React from 'react'
import './CardStyle.css'

const ListCard = ({stop,selectListItem}) => {
    if(!stop && !stop.operators_serving_stop[0].operator_name) {
        return(
            <div>Loading...</div>
        )
    } else {
    return(
         <div className="ui card card-style" style={{width: "100%", marginBottom: "15px", marginTop: "10px"}} onClick={() => selectListItem(stop)}>
            <div className="content">
                <div className="header">{stop.name}</div>
                <div className="meta">Type: {stop.served_by_vehicle_types[0].charAt(0).toUpperCase() + stop.served_by_vehicle_types[0].slice(1)}</div>
            </div>
            <div className="content">
                <h4 className="ui sub header">{stop.operators_serving_stop[0].operator_name}</h4>
            </div>
        </div>
        )
    }
}

export default ListCard