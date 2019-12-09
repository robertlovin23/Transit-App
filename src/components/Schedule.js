import React from 'react'
import stops from '../api/stops'
import Modal from './Modal'

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
    submitSchedule = async () => {
        // console.log(this.props)
        const id = this.props.stop.onestop_id
        // console.log(id)
        const response = await stops.get(`/schedule_stop_pairs?origin_onestop_id=${id}`,{
            params:{
                
            }
        })
        this.setState({
            schedules: response.data.schedule_stop_pairs,
            selectedSchedule: response.data.schedule_stop_pairs
        })
        // console.log(this.state.schedules)
    }
    componentDidMount = () => {
        this.submitSchedule();
    }
    // componentDidUpdate = (schedule) => {
    //     this.selectSchedule(schedule)
    // }
    selectScheduleState = (sched) => {
        this.setState({
            selectSchedule: sched,
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
        const { stop,active,selectListItem } = this.props
        if(!stop){
            return(
                <div>Loading...</div>
            )
        } else {
            return(
                <div>
                    <div className="ui black button" style={{marginTop: '5px',color: 'yellow'}} onClick={() => this.selectScheduleState(this.state.selectSchedule)}>Departure Times</div>
                    <Modal schedules={this.state.schedules} stop={stop} selectListItem={selectListItem} active={active} modal={this.state.modal} handleClose={this.handleClose} activeModal={this.state.activeModal}/>
                </div>
            )
        }
    }
}

export default Schedule;