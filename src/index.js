import React from 'react';
import ReactDOM from 'react-dom';
import './scss/base.scss';
import axios from 'axios';
import registerServiceWorker from './registerServiceWorker';
import RenderInfo from './components/RenderInfo';
import RenderSearch from './components/RenderSearch';
import logo from './assets/residekc_logo.svg'

class App extends React.Component {
    state = {
        gotData: false,
        councilDistrict: '',
        kivaPIN: '',
        address: '',
        trashInfo: {
            trashDay: '',
            trashProvider: '',
            bulkyItems: ''
        },
        offices: [],
        officials: [],
        latitude: '',
        longitude: ''       
    }
        

    // Take address, parse, set state and submit adress, check if address is valid, start in Searchbox.js
    setAddress = address => {
        const addressString = String(address);

        // Checks to see if first char in string is a number
        let addressArray = String(address).split("");
        if (isNaN(addressArray[0])) { alert("Please choose an address that has a numerical address"); };


        /**
         * Checks whether addressString contains both "kansas city" && "mo" before query.
         * Converts to lower case before check to avoid false error alerts when capitalization is nonstandard.
         */
        if (!(addressString.toLowerCase().includes("kansas city")) || !(addressString.toLowerCase().includes("mo"))) {
            //Address does not contain both 'kansas city' && 'mo'
            alert("Please choose another address")
        } else {
            const parsedAddress = addressString.split(',')[0];
            this.setState({ address: parsedAddress });
            this.handleSubmit(parsedAddress);  //submitting ie: 2515 Holmes Street
        }
    }

    updateInfo = (trashDay, trashProvider, bulkyItems) => {
        this.setState({
            gotData: true,
            trashInfo: {
                trashDay: trashDay,
                trashProvider: trashProvider,
                bulkyItems: bulkyItems
            },
        })
    }

    // Submit Address to KC Data API
    kcDataSubmit = async address => {
        //Below is the line of code that had been working. It stopped working, so we went to the second grouping of line of code
        //await axios.get(`https://dev-api.codeforkc.org//address-attributes/V0/${address}?city=Kansas%20City&state=mo`)
        //Below this line is the testing I am going to see to try and integrate everything
        let editedAddress = address.replace(/ /g, "%20");
        await axios.get('http://dev-api.codeforkc.org//address-attributes/V0/' + editedAddress + '?city=Kansas%20City&state=MO')
        //Below this is the line of code suggest by Paul
        //await axios.get( 'http://dev-api.codeforkc.org/address-attributes/V0/7401%20MAIN%20ST?city=Kansas%20City&state=MO')
        .then( async response => {
            let myResponse = await response.data;
            let myLat = myResponse.data.latitude, myLong = myResponse.data.longitude;
            console.log(myResponse.data);
            console.log (myLat, myLong);
            this.setState({latitude: myResponse.data.latitude, longitude: myResponse.data.longitude});
            let kivaSTRING = await "https://maps.kcmo.org/kcgis/rest/services/ParcelGeocodes/MapServer/1/" + myResponse.data.city_id + "?f=json&pretty=true";
            const returnValue = await this.kcMapsSubmit(kivaSTRING);
            return returnValue
        })
        .catch( error => {
            console.log(error);
        });
    };

    // Submit to KCMO Maps
    kcMapsSubmit = async kivaJSON => {
        axios.get(kivaJSON).then((response) => {
            let mySubResponse = response.data;
            let trashDay = mySubResponse.feature.attributes.TRASHDAY;
            let trashProvider =  mySubResponse.feature.attributes.TRASHPROVIDER;
            let bulkyItems = mySubResponse.feature.attributes.BULKYDAY;
            this.updateInfo(trashDay, trashProvider, bulkyItems);
        })
        .catch((error) => { // if no address/KIVA is found
            this.setState({ gotData: false });
            console.log(error);
            alert("Please make sure the address you are entering is in the Kansas City area and not in a surrounding area like North Kansas City or Liberty.");
        });
    }

    // Google Civic Info API
    googleCivicSubmit = address => {
        let buildString = "https://www.googleapis.com/civicinfo/v2/representatives?address=" + address + "%2C%20Kansas%20City%2C%20MO&key=AIzaSyANGMualu3HzRARJIsPuLM0vHbIxAHVQpE";
        axios.get(buildString).then((response) => {
            let { offices, officials } = response.data;
            offices.splice(3,0,{name: 'United States Sentate'});
            offices.splice(0,2);
            officials.splice(0,2);
            this.setState({ 
                offices,
                officials
            });
        })
        .catch((error) => { 
            console.log(error);
        });
    }


    //  Submits address to APIs
    handleSubmit =  async address => {
        //This worked for a while but right now testing the old way as the new way isn't working right now
        //New way
        //let sentAddress =  await `${address}?city=Kansas%20City&state=mo`;
        //Old Way
        let sentAddress = address;
        //Update: Old way works. leaving new code commented out for posterity
        await this.kcDataSubmit(sentAddress);
        await this.googleCivicSubmit(sentAddress);
    }


    render() {
        return (
            <div className="container">
                <img src={logo} alt="ResideKC" className='logo' />

                { this.state.gotData ? <RenderInfo trashInfo={this.state.trashInfo} displayInfo={this.displayInfo} setAddress={this.setAddress} address={this.state.address} electedState={this.state.electedState}  electedFeds={this.state.electedFeds} offices={this.state.offices} officials={this.state.officials} latitude={this.state.latitude} longitude={this.state.longitude}/> :  <RenderSearch handleSubmit={this.handleSubmit} setAddress={this.setAddress}/> }

            </div>
        ) 
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
