import React from 'react'
import GoogleMapReact from 'google-map-react'

const Markers = ({text,stops}) => {
    return(
        <div>
            <i className="big bus icon"/>
        </div>
    )
}
const Mapbox = ({stops,lat,lng,selectListItem,defaultZoom}) => {
        return(
        <div style={{height: "100vh", width: "100%"}}>
            <GoogleMapReact 
                bootstrapURLKeys={{key: "AIzaSyCr5MR1j9onOL4o82um7Gj1rY7R9W0apWg"}}
                defaultCenter={{lat: 39.0997, lng: -94.5786}}
                center={{lat: lat, lng: lng}}
                zoom={defaultZoom}
            >
                {
                    stops.map((stop,index) => {
                        return(
                            <Markers key={index} text="Marker"
                                    lat={stop.geometry.coordinates[1]}
                                    lng={stop.geometry.coordinates[0]}
                                    onClick={() => selectListItem(stop)}
                            />
                        )
                    })
                }
            </GoogleMapReact>
        </div>
        )
    }

export default Mapbox;