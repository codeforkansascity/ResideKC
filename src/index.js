import React from 'react';
import ReactDOM from 'react-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';
import { Button, ButtonGroup } from 'reactstrap';

import SearchBox from './components/SearchBox';
import Trashday from './components/TrashDay';
import Stategovernment from './components/Stategovernment';
import ElectedOfficials from './components/FederalLegislative';

let myObject = {"KIVA": "4", "cityCouncilDistrict": "", "trashPickUp": ""};

class App extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            gotData: false,
            councilDistrict : '',
            kivaPIN: '',
            address: '',
            trashDay: '',
            displayInfo: 'trash',
            electedInfo: ''
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setAddress = this.setAddress.bind(this);
        this.updateInfo = this.updateInfo.bind(this);
        this.displayInfo = this.displayInfo.bind(this);
        this.updateElectedO = this.updateElectedO.bind(this);
        
      }
      
      setAddress(address) {
          const alertArray = [address.split(',')[1], address.split(',')[2]];
          //console.log(alertArray);
          if (alertArray[0] !== " Kansas City" || alertArray[1] !== " MO"){
              alert("Please select a Kansas City, Missouri address");
          } else if (alertArray[0] == " Kansas City" && alertArray[1] == " MO"){
              //console.log("If it works this will appear.");
              //The Below text was taken from outside of the if then statement originaly.
              const parsedAddress = address.split(',')[0];
              this.setState({ address: parsedAddress })
              this.handleSubmit(parsedAddress);
          }
      }

      handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      updateInfo(trashDay) {
        this.setState({
            gotData: true,
            trashDay
        });
      }

      updateElectedO(electedInfo) {
          this.setState({
              electedInfo
          });
      }

      displayInfo(displayInfo) {
          this.setState({ displayInfo });
      }

      handleSubmit(address) {
        //let enteredAddress = this.state.value;
        let sentAddress;
        
        let testURL = "http://dev-api.codeforkc.org//address-attributes/V0/1407%20Grand%20blvd?city=Kansas%20City&state=mo";
        if (address === ""){
                sentAddress = testURL;
        } else {
            sentAddress = "http://dev-api.codeforkc.org//address-attributes/V0/" + address + "?city=Kansas%20City&state=mo";
        }
        // THIS RIGHT HEREconsole.log(address);
        //event.preventDefault();
        axios.get(sentAddress).then((response) => {
            let myResponse = response.data;
            myObject.KIVA = myResponse.data.city_id;
            myObject.cityCouncilDistrict =  myResponse.data.city_council_district;
            let myTestKiva = "http://maps.kcmo.org/kcgis/rest/services/external/Tables/MapServer/2/" + myResponse.data.city_id + "?f=json&pretty=true";
            axios.get(myTestKiva).then((response) => {
                //console.log("this part worked");
                let mySubResponse = response.data;
                let trashDay = mySubResponse.feature.attributes.TRASHDAY;
               // THISconsole.log(mySubResponse.feature.attributes);
                // THISconsole.log(mySubResponse.feature.attributes.TRASHDAY);

                this.updateInfo(trashDay);
            });
        });
        //***************HERE IS THE SECOND AXIOS CALL. THIS COULD BE SOMEWHERE ELSE***************
        //var addressInputSecond = "https://www.googleapis.com/civicinfo/v2/representatives?address=3534%20Cherry%20Street%2C%20Kansas%20City%2C%20MO&key=AIzaSyAfUjwu_XWbdnA-vGUWEb2UImFIJri_7Po";
        let addressInputSecond = "https://www.googleapis.com/civicinfo/v2/representatives?address=" + address + "%2C%20Kansas%20City%2C%20MO&key=AIzaSyAfUjwu_XWbdnA-vGUWEb2UImFIJri_7Po"
        //IF this call isn't working look at the address input above.
        let senatorOne, senatorTwo;
        let senateCheck = 0; //This is here because there are 2 US senators if the officials array but only one in the offices array
        axios.get(addressInputSecond).then((response) => {
          var myResponse = response.data;
          var offices = myResponse.offices;
          var officials = myResponse.officials;
          var x = 0;
          var myArray = [];
          while (x < offices.length){
            var y = offices[x - senateCheck].name, z = officials[x].name, p = officials[x].photoUrl;
            if (p === undefined){
              p = "No photo available on google api."
            }
            var xyz = [y, z, p];
            myArray.push(xyz);
            if (y == "United States Senator"){
              senateCheck = 1;
            }
            x++;
          }
         senatorOne = myArray[2][1];
         senatorTwo = myArray[3][1];
         console.log("The Senators are " + senatorOne + " and " +senatorTwo);
         //let electedInfo = myArray[0][1];
         let electedInfo = myArray;
        this.updateElectedO(electedInfo);
        });
        //***************END OF AXIOS CALL***************
      }

      renderSearch() {
        return (
            <div className="centerStuff">
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
                    <Button onClick={() => {this.displayInfo("trash")}}>Trash</Button>
                    <Button onClick={() => {this.displayInfo("State Government")}}>State Officials</Button>
                    <Button onClick={() => {this.displayInfo("electedOfficials")}}>Federal Legislative Officials</Button>
                </ButtonGroup>
                {this.state.displayInfo === "trash" && <Trashday trashDay={this.state.trashDay} />}
                {this.state.displayInfo === "State Government" && <Stategovernment electedInfo={this.state.electedInfo}/>}
                {this.state.displayInfo === "electedOfficials"  && <ElectedOfficials electedInfo={this.state.electedInfo}/>}
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