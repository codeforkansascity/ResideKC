import React from 'react';
import ReactDOM from 'react-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';
import { Button, ButtonGroup } from 'reactstrap';
import {Logo} from './components/logo.js';
import SearchBox from './components/SearchBox';
import Trashday from './components/TrashDay';
import Stategovernment from './components/Stategovernment';
import ElectedOfficials from './components/FederalLegislative';
//import 'https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.3.1.min.js';

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
            electedInfo: '',
            electedFeds: '',
            electedState: '',
            electedCity: '',
            electedCounty: '',
			isLoading: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setAddress = this.setAddress.bind(this);
        this.updateInfo = this.updateInfo.bind(this);
        this.displayInfo = this.displayInfo.bind(this);
        this.updateElectedO = this.updateElectedO.bind(this);
        
      }

      setAddress(address) {
		this.setState({isLoading: true});
		console.log("Loading..."); // -------------------------Debug-------------------------

        var addressString = String(address)
        var addressArray = addressString.split("");
        if (isNaN(addressArray[0])){
            alert("Please choose an address that has a numerical address");
        };
        //Check whether addressString contains both "kansas city" && "mo" before query.
        //Convert to lower case before check to avoid false error alerts when capitalization is nonstandard.
        if (!(addressString.toLowerCase().includes("kansas city")) || !(addressString.toLowerCase().includes("mo"))) {

          //Address does not contain both 'kansas city' && 'mo'
          //Show error
          alert("Please choose another address")
		  this.setState({isLoading: false});
        } else {
          const parsedAddress = addressString.split(',')[0];
          this.setState({ address: parsedAddress });
          console.log("Submitting Parsed Address..."); // -------------------------Debug-------------------------

          this.handleSubmit(parsedAddress);
        }
      }

      handleChange(event) {
        this.setState({value: event.target.value});
      }

      updateInfo(trashDay) {
        this.setState({
            gotData: true,
            isLoading: false,
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

	  
	/*var grabbedCityID = String("");
	verifyAddressURL(AddressURL) {
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript">
			$.get('sentAddress', function(response) {
				grabbedCityID = $('#city_id', data).text();
				console.log(From the website we got the City ID: grabbedCityID)
			});
			if (grabbedCityID = "")
				return false;
			return true;
		</script>
	}*/
	  
    handleSubmit(address) {
        //I THINK THIS IS WHERE CURSOR CHANGE STARTS
        //console.log("TEST" + address);  // -------------------------Debug-------------------------
        document.body.style.cursor = "wait";
        //let enteredAddress = this.state.value;
        let sentAddress;
        let hasKIVA = false;

        let testURL = "http://dev-api.codeforkc.org//address-attributes/V0/1407%20Grand%20blvd?city=Kansas%20City&state=mo";
        if (address === ""){
          sentAddress = testURL;
        } else {
            sentAddress = "http://dev-api.codeforkc.org//address-attributes/V0/" + address + "?city=Kansas%20City&state=mo";
        }
        // THIS RIGHT HEREconsole.log(address);
        //event.preventDefault();

        console.log("Sent Address: " + sentAddress); // -------------------------Debug------------------------
        //console.log("City Code = " + http://dev-api.codeforkc.org//address-attributes/V0/ + address + city=Kansas%20City&state=mo)

        console.log("Before the axios.get...");
		
		/*try{
			/*$.get('sentAddress', function(data){ 
				var grabbedCityID = $('#city_id', data).text();
				alert("We got " + grabbedCityID);
			});
			$.get('sentAddress', function(response) {
				console.log(response);
			});
		}
		
		catch(e){
			alert("Could not get a City ID");
		}
		*/
		
		
		
		
		
		
		
		axios.get(sentAddress).then((response) => { // HERE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		console.log("retriving KIVA now..."); // -------------------------Debug-------------------------
		console.log("it's: " + response.data.city_id); // -------------------------Debug-------------------------
		let myResponse = response.data;// console log this ===========================

		//if no KIVA here
		console.log("Before If Statment"); // -------------------------Debug-------------------------
		if (!myResponse.data.city_id){
			console.log("Not in the KCMO Area"); // -------------------------Debug-------------------------
		}
		else { // if a KIVA is found...
			console.log("Is in the KCMO Area"); // -------------------------Debug-------------------------
			hasKIVA = true;
			myObject.KIVA = myResponse.data.city_id;
			myObject.cityCouncilDistrict =  myResponse.data.city_council_district;

			console.log("myObject.KIVA: " + myObject.KIVA); // -------------------------Debug-------------------------
			console.log("myResponse.data.city_id: " + myResponse.data.city_id); // -------------------------Debug-------------------------
			
			let myTestKiva = "http://maps.kcmo.org/kcgis/rest/services/ParcelGeocodes/MapServer/1/" + myResponse.data.city_id + "?f=json&pretty=true";
			//http://maps.kcmo.org/kcgis/rest/services/external/Tables/MapServer/2/ + myResponse.data.city_id + ?f=json&pretty=true
			//http://maps.kcmo.org/kcgis/rest/services/ParcelGeocodes/MapServer/1/255947?f=json&pretty=true
			axios.get(myTestKiva).then((response) => {
			  //console.log("this part worked");
			  let mySubResponse = response.data;
			  let trashDay = mySubResponse.feature.attributes.TRASHDAY;
			  // THISconsole.log(mySubResponse.feature.attributes);
			  // THISconsole.log(mySubResponse.feature.attributes.TRASHDAY);

			  this.updateInfo(trashDay);
			});
		  }
		})
		.catch((error) => {
			console.log("Cought Something");
			alert("Please choose an address that is within the Kansas City, MO area (ie not Gladstone or North Kanasas City)")
		});
		
		/*axios.get('/user?ID=12345')
		.then(function (response) {
			console.log(response);
		})
		.catch(function (error) {
			console.log(error);
		});*/
		
		//	alert("Please choose an address that is within the Kansas City, MO area (ie not Gladstone or North Kanasas City)")
		
			
		
        /*catch (e) {
          console.log("Cought Something"); // -------------------------Debug-------------------------
          alert("Please choose an address that is within the Kansas City, MO area (ie not Gladstone or North Kanasas City)")

        }
        console.log("After Try/Catch"); // -------------------------Debug-------------------------*/

        
        //***************HERE IS THE SECOND AXIOS CALL. THIS COULD BE SOMEWHERE ELSE***************
        if (!hasKIVA){
          this.setState({
            gotData: false,
            isLoading: false
          });
        }
        else {
          
          //var addressInputSecond = "https://www.googleapis.com/civicinfo/v2/representatives?address=3534%20Cherry%20Street%2C%20Kansas%20City%2C%20MO&key=AIzaSyAfUjwu_XWbdnA-vGUWEb2UImFIJri_7Po";
          let addressInputSecond = "https://www.googleapis.com/civicinfo/v2/representatives?address=" + address + "%2C%20Kansas%20City%2C%20MO&key=AIzaSyAfUjwu_XWbdnA-vGUWEb2UImFIJri_7Po"
          //IF this call isn't working look at the address input above.
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
              var abc = { "title": y, "name": z, "photoURL": p, "arrayID": x};
              //console.log(abc);
              myArray.push(abc);
              if (y == "United States Senate"){ //Keep an eye on this. Either I was messing up for a while or they changed United States Senator to United State Senate -Js
                senateCheck = 1;
              }
              x++;
            }
            let testVar = 0;
            let fedArray =[], stateArray = [], cityArray = [], countyArray = [];
            while (testVar < myArray.length){
              if (myArray[testVar].title == "United States Senate" || myArray[testVar].title == "United States House of Representatives MO-05" || myArray[testVar].title == "United States House of Representatives MO-04" || myArray[testVar].title == "United States House of Representatives MO-06"){
                fedArray.push(myArray[testVar]);
              }
              if (myArray[testVar].title == "Governor" || myArray[testVar].title == "Lieutenant Governor"){
                stateArray.push(myArray[testVar]);
              }
              if(myArray[testVar].title.includes("MO State Senate") || myArray[testVar].title.includes("MO State House District") || myArray[testVar].title.includes("State Auditor") ||  myArray[testVar].title.includes("State Treasurer") || myArray[testVar].title.includes("Attorney General") || myArray[testVar].title.includes("Secretary of State")){
                stateArray.push(myArray[testVar]);
              }
              if(myArray[testVar].title.includes("Mayor")){
                cityArray.push(myArray[testVar]);
              }
              if (myArray[testVar].title.includes("Council") && myArray[testVar].title.includes("District At-Large")){
                cityArray.push(myArray[testVar]);
              }
              if (myArray[testVar].title.includes("Sheriff") || myArray[testVar].title.includes("County Executive") || myArray[testVar].title.includes("Prosecuting Attorney") || myArray[testVar].title.includes("County Legislator") || myArray[testVar].title.includes("Assesor") || myArray[testVar].title.includes("Recorder") || myArray[testVar].title.includes("Collector") || myArray[testVar].title.includes("Circuit Clerk") || myArray[testVar].title.includes("County Clerk") || myArray[testVar].title.includes("Public Administrator") || myArray[testVar].title.includes("County Commissioner Chair")){
                countyArray.push(myArray[testVar]);
                //PLEASE NOTE THAT IF THERE IS A COUNTY AUDITOR AS IN CLAY COUNTY IT IS NOT PICKED UP HERE
              }
              testVar++;
            }
            //console.log(fedArray);
            //console.log(stateArray);
            //console.log(cityArray);
            //console.log(countyArray)
            let electedInfo = myArray;
            this.updateElectedO(electedInfo, fedArray, stateArray, cityArray, countyArray);
          });
        }
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
			<div className="mainContainer">
				<Logo />
				<SearchBox setAddress={this.setAddress} address={this.state.address} />
				<ButtonGroup>
					<Button onClick={() => {this.displayInfo("trash")}}>Trash</Button>
					<Button onClick={() => {this.displayInfo("State Government")}}>State Officials</Button>
					<Button onClick={() => {this.displayInfo("electedOfficials")}}>Federal Legislative Officials</Button>
				</ButtonGroup>
				{this.state.displayInfo === "trash" && <Trashday trashDay={this.state.trashDay} />}
				{this.state.displayInfo === "State Government" && <Stategovernment electedState={this.state.electedState}/>}
				{this.state.displayInfo === "electedOfficials"  && <ElectedOfficials electedFeds={this.state.electedFeds}/>}
			</div>
        )
      }
	  
	  renderLoadingInfo() {
        return (
			<div className="mainContainer">
				<Logo />
				<SearchBox setAddress={this.setAddress} address={this.state.address} />
				<ButtonGroup>
					<Button onClick={() => {this.displayInfo("trash")}}>Trash</Button>
					<Button onClick={() => {this.displayInfo("State Government")}}>State Officials</Button>
					<Button onClick={() => {this.displayInfo("electedOfficials")}}>Federal Legislative Officials</Button>
				</ButtonGroup>
				<div className="trashDay">
					<h2>Loading...</h2>
				</div>
			</div>
        )
      }
	  
      render() {
		if (this.state.gotData) {
			if (this.state.isLoading){
				//lets the user know that the address is loading
				return this.renderLoadingInfo();
			} else {
				return this.renderInfo();
			}
            return this.renderInfo();
        } else {
            return this.renderSearch();
        }
      }
	  //*/
	  /*
        if (this.state.gotData) {
            return this.renderInfo();
        } else {
            return this.renderSearch();
        }
      }
	  */
	  
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
