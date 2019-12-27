import React from 'react'
import stops from '../api/stops'
import Modal from './Modal'
import _ from 'lodash'

class Schedule extends React.Component{
    constructor(){
        super()
        this.state={
            schedules: [],
            modal: false,
            activeModal: 0,
            selectedSchedule: null
        }
    }
    //C
    submitSchedule = async () => {
        const id = this.props.stop.onestop_id

        // console.log(id)
        const response = await stops.get(`/schedule_stop_pairs?origin_onestop_id=${id}`)
        this.setState({
            schedules: response.data.schedule_stop_pairs,
            selectedSchedule: response.data.schedule_stop_pairs[0]
        })
        // console.log(this.state.schedules)
    }
    componentDidMount = () => {
        this.submitSchedule();
    }
    componentDidUpdate = (prevProps) => {
        if(this.props.stops[0].onestop_id !== prevProps.stops[0].onestop_id){
            this.submitSchedule(this.props.stops[0].onestop_id);
        }
    }
    // componentWillUnmount = () => {
    //     console.log()
    // }
    selectScheduleState = (schedule) => {
        this.setState({
            selectedSchedule: schedule,
            modal: true,
            activeModal: 1
        })
        // console.log(this.state.selectedSchedule)
    }
    handleClose = () => {
        this.setState({
            modal: false,
            activeModal: 0
        })
    }
    render(){
        const { stop,active } = this.props
        if(!stop){
            return(
            <div className="ui container">
                <div className="ui active inverted dimmer">
                    <div className="ui text loader">Loading...</div>
                </div>
          </div>
            )
        } else {
            return(
                <div>
                    <div className="ui black button" style={{color: 'yellow'}} onClick={this.selectScheduleState}>Departure Times</div>
                    <Modal schedules={this.state.schedules} 
                        active={active} 
                        stop={stop} 
                        modal={this.state.modal} 
                        handleClose={this.handleClose} 
                        activeModal={this.state.activeModal}/>
                </div>
            )
        }
    }
}

export default Schedule;