import React from 'react'

const Header = () => {
    return(
        <div className="ui inverted menu">
            <div className="header item" style={{color:"yellow"}}>
                <div >TransitGo</div>
            </div>
            <div className="right menu" >
               <div className="item" style={{color:"yellow"}}>Robert Lovin</div>
               <div className="item" style={{color:"yellow"}}> Copyright: 2019</div>
            </div>
        </div>
    )
}

export default Header;