import React from 'react'
import stops from '../api/stops'
import Modal from './Modal'

class Schedule extends React.Component{
    constructor(){
        super()
        this.state={
            schedules: []
        }
    }
    componentDidMount = async () => {
        const id = this.props.stop.routes_serving_stop[0].route_onestop_id
        const response = await stops.get(`/schedule_stop_pairs?route_onestop_id=${id}`,{
            params:{

            }
        })
        this.setState({
            schedules: response.data.schedule_stop_pairs[0]
        })
        console.log(this.state.schedules)
    }
    render(){
        const { stop } = this.props
        if(!stop){
            return(
                <div>Loading...</div>
            )
        } else {
            return(
                <div>
                    <div className="ui primary button">Schedule</div>
                    <Modal schedules={this.state.schedules} stop={this.props.active}/>
                </div>
            )
        }
    }
}

export default Schedule;