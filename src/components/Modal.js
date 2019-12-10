import React from 'react'
import ReactDOM from 'react-dom'
import haversine from 'haversine'
import './CardStyle.css'

const Modal = ({schedules,active,handleClose,modal,activeModal,stop}) => {
        if(!schedules){
            return(
                <div>Loading...</div>
            )
        } else {
            const showClassName = modal ? "ui dimmer visible active dim" : " ui dimmer"
            const showHideClassName = activeModal ? "ui standard modal visible active activeModal" : "displayModal";
                if(active){
                return ReactDOM.createPortal(
                <div className={showClassName} onClick={handleClose}>
                    <div className={showHideClassName} onClick={(e) => e.stopPropagation()}>
                        <div className="ui header" modal={modal}>
                            <i className="ui big yellow close icon" onClick={handleClose} activeModal={activeModal} style={{float:'right',display:"inline-block"}}></i>
                            <h3 style={{display:"inline"}}>Departure Times - {active.name}</h3>
                        </div>
                        <div className="content">
                            <div className="ui relaxed divided list">
                            {
                            schedules.map((schedule,index) => {
                                // console.log(active.onestop_id === schedule.origin_onestop_id)
                                // console.log(active.onestop_id, schedule.origin_onestop_id)
                                var time = schedule.origin_departure_time;
                                time = time.split(':');
                                var hours = Number(time[0]);
                                var minutes = Number(time[1]);
                                var timeValue;
                                if(hours > 0 && hours <= 12 && hours < 24){
                                    timeValue= "" + hours;
                                } else if (hours > 12){
                                    timeValue= "" + (hours - 12)
                                } else if (hours == 0){
                                    timeValue= '12'
                                }

                                timeValue += (minutes < 10) ? ":0" + minutes : ':' + minutes;
                                timeValue += (hours >= 12) ? " PM" : ' AM'

                                if(active.onestop_id === schedule.origin_onestop_id){
                                    return(                  
                                        <div className="item" key={index}>
                                            <b>{schedule.trip_headsign}</b> - {timeValue}
                                        </div>
                                    ) 
                                } else {
                                    return(
                                        <div className="item" key={index}>
                                            <b>Loading...</b>
                                        </div>
                                    )
                                }
                            })}
                            </div>
                        </div>
                    </div>
                </div>, document.querySelector('#modal')
            )}

        }

    }


export default Modal;