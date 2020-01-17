import React from 'react'

class SearchBar extends React.Component{
    constructor(){
        super()
        this.state={
            term: "",
            radius: 800
        }
    }
    //The click handler used to change the search term 
    onTermChange = (event) => {
        this.setState({
            term: event.target.value
        })
    }
    // handleRadiusChange = (event) => {
    //     this.setState({
    //         radius: event.target.value
    //     })
    // }

    //The submit function that sets the props of onTermSubmit to the term state
    onTermSubmit = (event) => {
        event.preventDefault();
        this.props.onTermSubmit(
            this.state.term,
            this.state.radius
        )
    }
    render(){
        return(
                <form className="ui form" onSubmit={this.onTermSubmit}>
                    <label>Search for Stops</label>
                    <div className="ui field">
                        <input  type="text"
                                placeholder="Search..."
                                onChange={this.onTermChange}
                                value={this.state.term}
                        />
                    </div>
                    {/* <div className=" ui field filter-section" style={{marginTop:"10px"}}>
                        <p>Distance From Location:</p>
                            <select className="ui search dropdown" value={this.state.radius} onChange={this.handleRadiusChange}>
                                <option value="400">0.25 Miles</option>
                                <option value="800">0.50 Miles</option>
                                <option value="1200">0.75 Miles</option>
                                <option value="1600">1 Mile</option>
                            </select>
                        </div> */}
                </form>
        )
    }
}

export default SearchBar;