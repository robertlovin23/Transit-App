import React from 'react'

class SearchBar extends React.Component{
    state={
        term: "",
        distance: 0
    }

    onTermChange = (event) => {
        this.setState({
            term: event.target.value
        })
    }

    onDistanceChange = (event) => {
        this.setState({
            distance: event.target.value
        })
    }

    onTermSubmit = (event) => {
        event.preventDefault();
        this.props.onTermSubmit(
            this.state.term,
            this.state.distance
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
                </form>
        )
    }
}

export default SearchBar;