import React from 'react'
import ListCard from './ListCard'

const StationList = ({stops,selectListItem}) => {
    const response = stops.map((stop,index) => {
        if(!stops){
            return(
                <div>Loading...</div>
            )
        } else {
            return(
                <div className="ui container divided items" style={{width: "308px"}}>
                    <ListCard stop={stop} key={index} selectListItem={selectListItem}/>
                </div>
            )
        }
    })
    return(
        <div  style={{height: '89vh', overflow: 'scroll'}}>{response}</div>
    )
}

export default StationList