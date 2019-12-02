import React from 'react'
import ListCard from './ListCard'
import './CardStyle.css'

const StationList = ({stops,selectListItem,active}) => {
    console.log(active)
    const response = stops.map((stop,index) => {
        if(!stops && !active){
            return(
                <div>Loading...</div>
            )
        } else {
            return(
                <div className="ui container divided items" style={{width: "308px"}}>
                    <ListCard stop={stop} key={index} selectListItem={selectListItem} active={active}/>
                </div>
            )
        }
    })
    return(
        <div  className="listHeight" style={{height: '88.5vh', overflow: 'scroll'}}>{response}</div>
    )
}

export default StationList