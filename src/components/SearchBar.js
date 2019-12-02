import React from 'react'

class SearchBar extends React.Component{
    state={
        term: ""
    }

    onTermChange = (event) => {
        this.setState({
            term: event.target.value
        })
    }

    onTermSubmit = (event) => {
        event.preventDefault();
        this.props.onTermSubmit(
            this.state.term
        )
    }
    render(){
        return(
            <div className="ui segment" style={{alignContent: "center", display: "block"}}>
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
            </div>
        )
    }
}

export default SearchBar;