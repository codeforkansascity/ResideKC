import React from 'react';
import ReactDOM from 'react-dom';
import './scss/base.scss';
import axios from 'axios';
import registerServiceWorker from './registerServiceWorker';
import RenderInfo from './components/RenderInfo';
import RenderSearch from './components/RenderSearch';
import SearchBox from './components/SearchBox';
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
            electedInfo: '',
            electedFeds: '',
            electedState: '',
            electedCity: '',
            electedCounty: ''
    }
        

    //  Take address, parse, set state and submit adress, check if address is valid
    setAddress = address => {
        console.log(address);
        const addressString = String(address);
		
        let addressArray = String(address).split("");


        if (isNaN(addressArray[0])) {
            alert("Please choose an address that has a numerical address");
        };

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
            this.handleSubmit(parsedAddress);
        }
    }

    //  JZ: Convert to arrow fucntion & { Write description of what function does here }
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

      //  Updates state with elected officials
      updateElectedO = (electedInfo, electedFeds, electedState, electedCity, electedCounty) => {
          this.setState({
              electedInfo,
              electedFeds,
              electedState,
              electedCity,
              electedCounty
          });
      }



    //   handleSubmit = async address => {
    //     const response = await kcdata.get('/search', {
    //         params: {
    //             q: term
    //         }
    //     });
    //     this.setState({
    //         videos:response.data.items,
    //         selectedVideo: response.data.items[0]
    //     });
    //    };

      //  Submits address to APIs
      handleSubmit = address => {
        let sentAddress = `https://dev-api.codeforkc.org//address-attributes/V0/${address}?city=Kansas%20City&state=mo`;
        // Call to City API for KIVA pin
        axios.get(sentAddress).then((response) => {
            let myResponse = response.data;
            let cityID = "https://maps.kcmo.org/kcgis/rest/services/ParcelGeocodes/MapServer/1/" + myResponse.data.city_id + "?f=json&pretty=true";

            // Uses KIVA pinn to get trash day info
            axios.get(cityID).then((response) => {
                let mySubResponse = response.data;
                let trashDay = mySubResponse.feature.attributes.TRASHDAY;
                let trashProvider =  mySubResponse.feature.attributes.TRASHPROVIDER;
                let bulkyItems = mySubResponse.feature.attributes.BULKYDAY;

                this.updateInfo(trashDay, trashProvider, bulkyItems);
            });          
        })
		.catch((error) => { // if no address/KIVA is found
			this.setState({
				gotData: false
            });
            
			alert("Please make sure the address you are entering is in the Kansas City area and not in a surrounding area like North Kansas City or Liberty.");
        });

		console.log("Kiva found")


        // Building address string for Google Civic info
        let googleCivicInfoAddress = "https://www.googleapis.com/civicinfo/v2/representatives?address=" + address + "%2C%20Kansas%20City%2C%20MO&key=AIzaSyAfUjwu_XWbdnA-vGUWEb2UImFIJri_7Po"

        let senateCheck = 0; //This is here because there are 2 US senators if the officials array but only one in the offices array

        // Call to Google Civic info API
        axios.get(googleCivicInfoAddress).then((response) => {

            const myResponse = response.data;
            const offices = myResponse.offices;
            const officials = myResponse.officials;
            let x = 0;
            const myArray = [];

            while (x < offices.length) {
                var y = offices[x - senateCheck].name, z = officials[x].name, p = officials[x].photoUrl;
                if (p === undefined) {
                    p = "No photo available on google api."
                }
                var abc = { "title": y, "name": z, "photoURL": p, "arrayID": x };
                myArray.push(abc);
                if (y === "United States Senate") { //Keep an eye on this. Either I was messing up for a while or they changed United States Senator to United State Senate -Js
                    senateCheck = 1;
                }
                x++;
            }

            
            let testVar = 0;
            let fedArray = [], stateArray = [], cityArray = [], countyArray = [];

            while (testVar < myArray.length) {
                if (myArray[testVar].title === "United States Senate" || myArray[testVar].title === "United States House of Representatives MO-05" || myArray[testVar].title === "United States House of Representatives MO-04" || myArray[testVar].title === "United States House of Representatives MO-06") {
                    fedArray.push(myArray[testVar]);
                }
                if (myArray[testVar].title === "Governor" || myArray[testVar].title === "Lieutenant Governor") {
                    stateArray.push(myArray[testVar]);
                }
                if (myArray[testVar].title.includes("MO State Senate") || myArray[testVar].title.includes("MO State House District") || myArray[testVar].title.includes("State Auditor") || myArray[testVar].title.includes("State Treasurer") || myArray[testVar].title.includes("Attorney General") || myArray[testVar].title.includes("Secretary of State")) {
                    stateArray.push(myArray[testVar]);
                }
                if (myArray[testVar].title.includes("Mayor")) {
                    cityArray.push(myArray[testVar]);
                }
                if (myArray[testVar].title.includes("Council") && myArray[testVar].title.includes("District At-Large")) {
                    cityArray.push(myArray[testVar]);
                }
                if (myArray[testVar].title.includes("Sheriff") || myArray[testVar].title.includes("County Executive") || myArray[testVar].title.includes("Prosecuting Attorney") || myArray[testVar].title.includes("County Legislator") || myArray[testVar].title.includes("Assesor") || myArray[testVar].title.includes("Recorder") || myArray[testVar].title.includes("Collector") || myArray[testVar].title.includes("Circuit Clerk") || myArray[testVar].title.includes("County Clerk") || myArray[testVar].title.includes("Public Administrator") || myArray[testVar].title.includes("County Commissioner Chair")) {
                    countyArray.push(myArray[testVar]);
                    //PLEASE NOTE THAT IF THERE IS A COUNTY AUDITOR AS IN CLAY COUNTY IT IS NOT PICKED UP HERE
                }
                testVar++;
            }
           // testVar++;
        // }
            const electedInfo = myArray;
            this.updateElectedO(electedInfo, fedArray, stateArray, cityArray, countyArray);

        });
        //***************END OF AXIOS CALL***************
    }

    render() {
        return (
            <div className="container">
                <img src={logo} alt="ResideKC Logo" className='logo' />

                { this.state.gotData ? <RenderInfo trashInfo={this.state.trashInfo} displayInfo={this.displayInfo} setAddress={this.setAddress} address={this.state.address} electedState={this.state.electedState}  electedFeds={this.state.electedFeds} /> :  <RenderSearch handleSubmit={this.handleSubmit} setAddress={this.setAddress}/> }

            </div>
        ) 
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
