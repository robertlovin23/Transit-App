import React from 'react'
import ListCard from './ListCard'
import './CardStyle.css'

class StationList extends React.Component{
    constructor(){
        super()
    }
    render(){
        const {stops,selectListItem,active,listItem,term,stop,lat,lng,haversineFormula} = this.props
        //Maps list of stops to the List View on the left side
        const response = stops.map((stop,index) => {
            return(
                <div className="ui container divided items" style={{width: "308px"}} key={index} >
                    <ListCard ref={this.scrollRef} 
                            scrollIntoView={this.scrollElementOnClick} 
                            stop={stop} 
                            ref={listItem} 
                            selectListItem={selectListItem} 
                            active={active} 
                            term={term} 
                            lat={lat} 
                            lng={lng} 
                            haversineFormula={haversineFormula} 
                            stops={stops}
                    />
                </div>
            )
        })
    //Handler to check in case there are no results
    if(!stop && !active){
        return(
            <div className="ui container divided items" style={{width: "308px"}}>
                    <div className="ui active centered inline text loader" style={{marginTop: "200px",marginBottom: "200px"}}>
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