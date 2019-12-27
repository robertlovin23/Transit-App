import React from 'react'
import ListCard from './ListCard'
import './CardStyle.css'

class StationList extends React.Component{
    constructor(){
        super()
    }
    render(){
        const {stops,selectListItem,active,listItem,term,stop,lat,lng,haversineFormula} = this.props
        const response = stops.map((stop,index) => {
            return(
                <div className="ui container divided items" style={{width: "308px"}} >
                    <ListCard ref={this.scrollRef} scrollIntoView={this.scrollElementOnClick} stop={stop} key={index} ref={listItem} selectListItem={selectListItem} active={active} term={term} lat={lat} lng={lng} haversineFormula={haversineFormula} stops={stops}/>
                </div>
            )
        })
    if(!stop && !active){
        return(
            <div className="ui container divided items" style={{width: "308px"}}>
                    <div class="ui active centered inline text loader" style={{marginTop: "200px",marginBottom: "200px"}}>
                        No Results...
                    </div>
            </div> 
        )
    } else {
        return(
            <div className="listHeight" style={{height: '86vh', overflowY: 'auto'}}>{response}</div>
        )
    }}
}

export default StationList