import React from 'react'
import ListCard from './ListCard'
import './CardStyle.css'

class StationList extends React.Component{
    render(){
        const {stops,selectListItem,active,listItem} = this.props
        const response = stops.map((stop,index) => {
        if(!stops && !active){
            return(
                <div className="ui container divided items" style={{width: "308px"}}>
                    Loading...
                </div>
            )
        } else {
            return(
                <div className="ui container divided items" style={{width: "308px"}}>
                    <ListCard stop={stop} key={index} ref={listItem} selectListItem={selectListItem} active={active}/>
                </div>
            )
        }
    })
    return(
        <div  className="listHeight" style={{height: '86vh', overflowY: 'scroll'}}>{response}</div>
    )
    }
}

export default StationList