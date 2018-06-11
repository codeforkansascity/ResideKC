import React from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

const renderSuggestion = ({suggestion}) => (
  <div>{suggestion}</div>
);

const shouldFetchSuggestions = ({ value }) => value.length > 2;

const onError = (status, clearSuggestions) => {
  console.log(
    'Error while fetching suggestions from API',
    status
  )
  clearSuggestions();
}

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    const bounds = new window.google.maps.LatLngBounds(
      new window.google.maps.LatLng(54.69726685890506,-2.7379201682812226),
      new window.google.maps.LatLng(55.38942944437183, -1.2456105979687226)
    );
    console.log(bounds);
    const searchOptions = { 
      bounds,
      strictBounds: true
    }

    this.state = {
      address: props.address ? props.address : '',
      searchOptions
    };
    console.log(this.state);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSelect(address) {
    this.setState({ address });
    console.log(address);
    this.props.setAddress(address);
  }

  handleChange(address) {
    this.setState({ address })
  }

  render() {
    const inputProps = {
      type: 'text',
      value : this.state.address,
      onChange: this.handleChange,
      autoFocus: true,
      placeholder: 'Search Places'
    }

    return (
      <div className="searchbox">
        <PlacesAutocomplete
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          onSelect={this.handleSelect}
          onEnterKeyDown={this.handleSelect}
          shouldFetchSuggestions={shouldFetchSuggestions}
          searchOptions={this.state.searchOptions}
        />
      </div>
    )
  }
}