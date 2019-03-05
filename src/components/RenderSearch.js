import React from 'react';
import SearchBox from './SearchBox';

const RenderSearch = (props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <label>Search and click on your address below.</label>    
                <SearchBox setAddress={props.setAddress} />
            </form>
        </div>
    )
}

export default RenderSearch;