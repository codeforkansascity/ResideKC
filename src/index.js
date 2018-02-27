import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

var myObject = {"KIVA": "4"};

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
        var enteredAddress = this.state.value;
        var sentAddress;
        var testURL = "http://dev-api.codeforkc.org//address-attributes/V0/1407%20Grand%20blvd?city=Kansas%20City&state=mo";
       if (enteredAddress === ""){
            sentAddress = testURL;
       } else sentAddress = "http://dev-api.codeforkc.org//address-attributes/V0/" + enteredAddress + "?city=Kansas%20City&state=mo";
        console.log(enteredAddress);
        event.preventDefault();
        axios.get(sentAddress).then(function(response){
            var myResponse = response.data;
            console.log("this is working");
            myObject.KIVA = myResponse.data.city_id;
            console.log(myObject.KIVA);
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
                <div><label><input type="radio" name="myRadio" value="rad1" onChange={this.changeStuff} checked={this.state.doorway === 'rad1'} /><p1>Kiva Pin (not working)</p1></label></div>
                <div><label><input type="radio" name="myRadio" value="rad2" onChange={this.changeStuff} checked={this.state.doorway === 'rad2'}/><p1>Radio2</p1></label></div>
                <div><label><input type="radio" name="myRadio" value="rad3" onChange={this.changeStuff} checked={this.state.doorway === 'rad3'}/><p1>Radio3</p1></label></div>
            </div>
            <div className="centerStuff">
            <DisplayKiva />
            </div>
        </div>
        );
    }

    renderRad2(){
        return(
            <div>
            <div className="menuBar">
            <div><label><input type="radio" name="myRadio" value="rad1" onChange={this.changeStuff} checked={this.state.doorway === 'rad1'} /><p1>Kiva Pin (not working)</p1></label></div>
                <div><label><input type="radio" name="myRadio" value="rad2" onChange={this.changeStuff} checked={this.state.doorway === 'rad2'}/><p1>Radio2</p1></label></div>
                <div><label><input type="radio" name="myRadio" value="rad3" onChange={this.changeStuff} checked={this.state.doorway === 'rad3'}/><p1>Radio3</p1></label></div>
            </div>
            <div className="centerStuff">
            <h1>Here is the Second Radio Button</h1>
            </div>
        </div>
        );
    }

    renderRad3(){
        return(
            <div>
            <div className="menuBar">
            <div><label><input type="radio" name="myRadio" value="rad1" onChange={this.changeStuff} checked={this.state.doorway === 'rad1'} /><p1>Kiva Pin (not working)</p1></label></div>
                <div><label><input type="radio" name="myRadio" value="rad2" onChange={this.changeStuff} checked={this.state.doorway === 'rad2'}/><p1>Radio2</p1></label></div>
                <div><label><input type="radio" name="myRadio" value="rad3" onChange={this.changeStuff} checked={this.state.doorway === 'rad3'}/><p1>Radio3</p1></label></div>
            </div>
            <div className="centerStuff">
        <h1>Here is the Third Radio Button</h1>
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
//This is a test component to display the kiva pin number. In future planning on updating to trashday and/or council district
class DisplayKiva extends React.Component{
    constructor(props){
        super(props);
        this.state = {inputData: myObject.KIVA};
    }
    render(){
        return(
            <div>
                <h1>Hey this part worked {this.state.inputData}</h1>
            </div>
        );
    }
}

ReactDOM.render(<FrontDoor />, document.getElementById('root'));
registerServiceWorker();
