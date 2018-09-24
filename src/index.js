import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';
import { Button, ButtonGroup } from 'reactstrap';
import { Logo } from './components/logo.js';
import SearchBox from './components/SearchBox';
import Trashday from './components/TrashDay';
import Stategovernment from './components/Stategovernment';
import ElectedOfficials from './components/FederalLegislative';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            gotData: false,
            councilDistrict: '',
            kivaPIN: '',
            address: '',
            trashDay: '',
            displayInfo: 'trash',
            electedInfo: '',
            electedFeds: '',
            electedState: '',
            electedCity: '',
            electedCounty: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setAddress = this.setAddress.bind(this);
        this.updateInfo = this.updateInfo.bind(this);
        this.displayInfo = this.displayInfo.bind(this);
        this.updateElectedO = this.updateElectedO.bind(this);

    }

    setAddress(address) {
        var addressString = String(address)
        var addressArray = addressString.split("");
        if (isNaN(addressArray[0])) {
            alert("Please choose an address that has a numerical address");
        };
        /**
         * Checks whether addressString contains both "kansas city" && "mo" before query.
         * Converts to lower case before check to avoid false error alerts when capitalization is nonstandard.
         */
        if (!(addressString.toLowerCase().includes("kansas city")) || !(addressString.toLowerCase().includes("mo"))) {

            //Address does not contain both 'kansas city' && 'mo'
            //Show error
            alert("Please choose another address")
        } else {
            const parsedAddress = addressString.split(',')[0];
            this.setState({ address: parsedAddress });
            this.handleSubmit(parsedAddress);
        }
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    updateInfo(trashDay) {
        this.setState({
            gotData: true,
            trashDay
        });
        document.body.style.cursor = "auto";

      }

      updateElectedO(electedInfo, electedFeds, electedState, electedCity, electedCounty) {
          this.setState({
              electedInfo,
              electedFeds,
              electedState,
              electedCity,
              electedCounty
          });
      }

      displayInfo(displayInfo) {
          this.setState({ displayInfo });
      }

      handleSubmit(address) {
        document.body.style.cursor = "wait";
        let sentAddress;

        let testURL = "https://dev-api.codeforkc.org//address-attributes/V0/1407%20Grand%20blvd?city=Kansas%20City&state=mo";

        if (address === ""){
                sentAddress = testURL;

        } else {
            sentAddress = "https://dev-api.codeforkc.org//address-attributes/V0/" + address + "?city=Kansas%20City&state=mo";
        }

        axios.get(sentAddress).then((response) => {
            let myResponse = response.data;

            let myTestKiva = "https://maps.kcmo.org/kcgis/rest/services/ParcelGeocodes/MapServer/1/" + myResponse.data.city_id + "?f=json&pretty=true";
            axios.get(myTestKiva).then((response) => {
                let mySubResponse = response.data;
                let trashDay = mySubResponse.feature.attributes.TRASHDAY;
                this.updateInfo(trashDay);
            });
        });
        //***************HERE IS THE SECOND AXIOS CALL. THIS COULD BE SOMEWHERE ELSE***************
        let addressInputSecond = "https://www.googleapis.com/civicinfo/v2/representatives?address=" + address + "%2C%20Kansas%20City%2C%20MO&key=AIzaSyAfUjwu_XWbdnA-vGUWEb2UImFIJri_7Po"
        let senateCheck = 0; //This is here because there are 2 US senators if the officials array but only one in the offices array
        axios.get(addressInputSecond).then((response) => {

            var myResponse = response.data;
            var offices = myResponse.offices;
            var officials = myResponse.officials;
            var x = 0;
            var myArray = [];
            while (x < offices.length) {
                var y = offices[x - senateCheck].name, z = officials[x].name, p = officials[x].photoUrl;
                if (p === undefined) {
                    p = "No photo available on google api."
                }
                var abc = { "title": y, "name": z, "photoURL": p, "arrayID": x };
                myArray.push(abc);
                if (y == "United States Senate") { //Keep an eye on this. Either I was messing up for a while or they changed United States Senator to United State Senate -Js
                    senateCheck = 1;
                }
                x++;
            }
            let testVar = 0;
            let fedArray = [], stateArray = [], cityArray = [], countyArray = [];
            while (testVar < myArray.length) {
                if (myArray[testVar].title == "United States Senate" || myArray[testVar].title == "United States House of Representatives MO-05" || myArray[testVar].title == "United States House of Representatives MO-04" || myArray[testVar].title == "United States House of Representatives MO-06") {
                    fedArray.push(myArray[testVar]);
                }
                if (myArray[testVar].title == "Governor" || myArray[testVar].title == "Lieutenant Governor") {
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

    renderSearch() {
        return (
            <div className="mainContainer">
                <Logo />
                <form onSubmit={this.handleSubmit}>
                    <label className="mainLabel" >
                        Enter Your Address
                    <SearchBox setAddress={this.setAddress} />
                    </label>
                    <div>
                        <input type="submit" value="Submit" className="redButton" />
                    </div>
                </form>
            </div>
        );
    }

    renderInfo() {
        return (
            <div className="info-page">
                <SearchBox setAddress={this.setAddress} address={this.state.address} />
                <ButtonGroup>
                    <Button onClick={() => { this.displayInfo("trash") }}>Trash</Button>
                    <Button onClick={() => { this.displayInfo("State Government") }}>State Officials</Button>
                    <Button onClick={() => { this.displayInfo("electedOfficials") }}>Federal Legislative Officials</Button>
                </ButtonGroup>
                {this.state.displayInfo === "trash" && <Trashday trashDay={this.state.trashDay} />}
                {this.state.displayInfo === "State Government" && <Stategovernment electedState={this.state.electedState} />}
                {this.state.displayInfo === "electedOfficials" && <ElectedOfficials electedFeds={this.state.electedFeds} />}
            </div>
        )
    }
    render() {
        if (this.state.gotData) {
            return this.renderInfo();
        } else {
            return this.renderSearch();
        }
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();