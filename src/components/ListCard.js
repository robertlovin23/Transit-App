import React from 'react'
import Schedule from'./Schedule'
import './CardStyle.css'

const ListCard = ({stop,active,selectListItem,listItem}) => {
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
                {/* <Schedule stop={stop} active={active}/> */}
            </div>
        </div>
        )
    }
}

export default ListCard