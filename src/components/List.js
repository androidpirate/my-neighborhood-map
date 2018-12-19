import React, { Component } from 'react';

class List extends Component {

  // Handle click events using props method
  handleClick(venueId) {
    this.props.handleClick(venueId)
  }

  render() {
    return(
      <div id="list-container">
        <p id="list-header">List of College Libraries</p>
        <input
          id="filter-input"
          type="text"
          role='form'
          aria-labelledby='filter'
          tabIndex="0"
          value={this.props.query}
          placeholder="Filter Venues"
          onChange={(event) => this.props.handleInput(event.target.value)}
          onKeyDown={(event) => this.props.handleInput(event.target.value)}/>
        <div id="venue-list">
          <ul>
            {this.props.filteredVenues.map(venue => (
              <li id="venue-name" key={venue.id}>
                <div>
                  <button id="venue-list-item" role="button"
                          onClick={() => this.props.handleClick(venue.id)}
                          onKeyPress={() => this.props.handleClick(venue.id)}
                          tabIndex="0">{venue.name}</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default List
