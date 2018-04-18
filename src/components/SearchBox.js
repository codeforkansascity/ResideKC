import React from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import './SearchBox.css';

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

    this.state = {
      address: props.address ? props.address : ''
    };

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
      <div class="searchbox">
        <PlacesAutocomplete
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          onSelect={this.handleSelect}
          onEnterKeyDown={this.handleSelect}
          shouldFetchSuggestions={shouldFetchSuggestions}
        />
      </div>
    )
  }
}