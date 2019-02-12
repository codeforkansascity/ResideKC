import React from 'react';
import SearchBox from './SearchBox';

const RenderSearch = (props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit}>

                <label className="mainLabel">Search and click on your address below.</label>    
                <SearchBox setAddress={props.setAddress} />
                
                <div>
                    <input type="submit" value="Submit" className="redButton" />
                </div>
            </form>
        </div>
    );
}

export default RenderSearch;