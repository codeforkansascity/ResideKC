import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

let myObject = {"KIVA": "4", "cityCouncilDistrict": "", "trashPickUp": ""};

class FrontDoor extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            outside: true,
            councilDistrict : '',
            kivaPIN: ''
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
        let enteredAddress = this.state.value;
        let sentAddress;
        let testURL = "http://dev-api.codeforkc.org//address-attributes/V0/1407%20Grand%20blvd?city=Kansas%20City&state=mo";
       if (enteredAddress === ""){
            sentAddress = testURL;
       } else sentAddress = "http://dev-api.codeforkc.org//address-attributes/V0/" + enteredAddress + "?city=Kansas%20City&state=mo";
        console.log(enteredAddress);
        event.preventDefault();
        axios.get(sentAddress).then(function(response){
            let myResponse = response.data;
            myObject.KIVA = myResponse.data.city_id;
            myObject.cityCouncilDistrict =  myResponse.data.city_council_district;
            let myTestKiva = "http://maps.kcmo.org/kcgis/rest/services/external/Tables/MapServer/2/" + myResponse.data.city_id + "?f=json&pretty=true";
            axios.get(myTestKiva).then(function(response){
                //console.log("this part worked");
                let mySubResponse = response.data;
                myObject.trashPickUp = mySubResponse.feature.attributes.TRASHDAY;
                console.log(mySubResponse.feature.attributes);
                console.log(mySubResponse.feature.attributes.TRASHDAY);
            });
        });
        
        this.setState({ outside: false});
      }

      

      renderIn(){
          return(
              <div>
              <InsideHouse />
              </div>
          );
      }

      renderOut(){
        return (
            <div className="centerStuff">
                <form onSubmit={this.handleSubmit}>
                    <label className="mainLabel" >
                    Address
                    <input type="text" value={this.state.value} onChange={this.handleChange} className="mainInput"  />
                    </label>
                    <div>
                    <input type="submit" value="Submit" className="redButton" />
                    </div>
                </form>
            </div>
        );
      }
    
      render() {
        if (this.state.outside) {
            return this.renderOut();
          } else {
            return this.renderIn();
          }
      }
}

// InsideHouse is a component that is the second part of the site. It has the radio buttons and locations of tertiary components
class InsideHouse extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            doorway: "rad1"
        };
        this.changeStuff = this.changeStuff.bind(this);
    }

    changeStuff(changeEvent){
        this.setState({doorway: changeEvent.target.value});
    }

    renderRad1(){
        return(
            <div>
            <div className="menuBar">
                <div><label><input type="radio" name="myRadio" value="rad1" onChange={this.changeStuff} checked={this.state.doorway === 'rad1'} />Recycling Information</label></div>
                <div><label><input type="radio" name="myRadio" value="rad2" onChange={this.changeStuff} checked={this.state.doorway === 'rad2'}/>City Council District</label></div>
                <div><label><input type="radio" name="myRadio" value="rad3" onChange={this.changeStuff} checked={this.state.doorway === 'rad3'}/>Trash Day</label></div>
            </div>
            <div className="centerStuff">
            <DisplayRecycle />
            </div>
        </div>
        );
    }

    renderRad2(){
        return(
            <div>
            <div className="menuBar">
            <div><label><input type="radio" name="myRadio" value="rad1" onChange={this.changeStuff} checked={this.state.doorway === 'rad1'} />Recycling Information</label></div>
                <div><label><input type="radio" name="myRadio" value="rad2" onChange={this.changeStuff} checked={this.state.doorway === 'rad2'}/>City Council District</label></div>
                <div><label><input type="radio" name="myRadio" value="rad3" onChange={this.changeStuff} checked={this.state.doorway === 'rad3'}/>Trash Day</label></div>
            </div>
            <div className="centerStuff">
            <DisplayCouncil />
            </div>
        </div>
        );
    }

    renderRad3(){
        return(
            <div>
            <div className="menuBar">
            <div><label><input type="radio" name="myRadio" value="rad1" onChange={this.changeStuff} checked={this.state.doorway === 'rad1'}/> Recycling Information</label></div>
                <div><label><input type="radio" name="myRadio" value="rad2" onChange={this.changeStuff} checked={this.state.doorway === 'rad2'}/>City Council District</label></div>
                <div><label><input type="radio" name="myRadio" value="rad3" onChange={this.changeStuff} checked={this.state.doorway === 'rad3'}/>Trash Day</label></div>
            </div>
            <div className="centerStuff">
        <DisplayTrash />
        </div>
        </div>
        );
    }

    render(){
        if (this.state.doorway === "rad1"){
            return this.renderRad1();
          } else if (this.state.doorway ==="rad2"){
            return this.renderRad2();
          } else if (this.state.doorway === "rad3"){
            return this.renderRad3();
          }
    }
}

//This is for recycling information in Kansas City, MO
class DisplayRecycle extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="display-text">
                <h1>Some uniform information here, recycling or otherwise</h1>
            </div>
        );
}
}

//This is the component that is going to display the council district
class DisplayCouncil extends React.Component{
    constructor(props){
        super(props);
        this.state = {inputData: myObject.cityCouncilDistrict};
    }
    render(){
        return (
            <div className="display-text">
                <h1>The city council district is {this.state.inputData}.</h1>
            </div>
        );
    }
}

//This is a test component to display the trashDay
class DisplayTrash extends React.Component{
    constructor(props){
        super(props);
        this.state = {inputData: myObject.trashPickUp};
    }
    render(){
        return(
            <div className="display-text">
                <h1>Your trash is normally picked up on {this.state.inputData}.</h1>
            </div>
        );
    }
}

ReactDOM.render(<FrontDoor />, document.getElementById('root'));
registerServiceWorker();