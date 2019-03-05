import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';


const bounds = new window.google.maps.LatLngBounds(
  new window.google.maps.LatLng(54.69726685890506, -2.7379201682812226),
  new window.google.maps.LatLng(55.38942944437183, -1.2456105979687226)
)
const searchOptions = {
  bounds,
  strictBounds: true
}

class SearchBar extends React.Component {
  state = {
    address: this.props.address ? this.props.address : '',
    searchOptions
  }

  handleSelect = address => {
    this.setState({ address });
    this.props.setAddress(address);
  }

  handleChange = address => {
    this.setState({ address })
  }

  render() {
    return (
      <div className="searchbox">
        <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      </div>
    )
  }
}

export default SearchBar;