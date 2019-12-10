import React from 'react'
import ListCard from './ListCard'
import './CardStyle.css'

class StationList extends React.Component{
    constructor(){
        super()
        this.scrollRef = React.createRef();
    }
    render(){
        const {stops,selectListItem,active,listItem,term,stop,lat,lng,haversineFormula} = this.props
        const response = stops.map((stop,index) => {
        if(!stop && !active){
            return(
                <div className="ui container divided items" style={{width: "308px"}} key={index}>
                    Loading...
                </div>
            )
        } else {
            return(
                <div className="ui container divided items" style={{width: "308px"}} ref={this.scrollRef}>
                    <ListCard stop={stop} key={index} ref={listItem} selectListItem={selectListItem} active={active} term={term} lat={lat} lng={lng} haversineFormula={haversineFormula} stops={stops}/>
                </div>
            )
        }
    })
    return(
        <div  className="listHeight" style={{height: '86vh', overflowY: 'auto'}}>{response}</div>
    )
    }
}

export default StationList