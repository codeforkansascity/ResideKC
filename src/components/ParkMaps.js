import React from 'react';

//The Longitude and latitude displayed here are in the current form unnecessary. Explained below why I decided to keep them in.
const ParkMap = ({longitude, latitude}) =>  {
    console.log("lat is " + latitude);
    console.log("long is " + longitude);

    
    
    //**********These are the versions that would ideally work. please see below */
    //This gives you the parks but not the local
    //let srcString = `http://maps.google.com/maps?q=${latitude}, ${longitude}&z=14&q=parks+in+kansas+city&output=embed`;
    //This gives you the local but not the parks
    //let srcString = `http://maps.google.com/maps?q=parks+in+kansas+city&q=${latitude}, ${longitude}&z=14&output=embed`;
    //The order of the q=parks... and the lat and long determine result

    //Here is the one I worked out for the time being JS
    let srcString = `https://maps.google.com/maps?q=parks+in+kansas+city&z=11&output=embed`;

    return (
        <div className="trashDay">
            <iframe src={srcString} title="maps" width="600" height="450" frameBorder="0" style={{border:0}}>
            </iframe>
        </div>
    )
}

//Notes
//the initial concept of this component was to create something that would take the input address and
//show a local map centered on that location, pinned, with all kc parks also pinned (potentially different color)
//As it progressed, it became clear that an inbedded iframe was currently unable to show such information
//without using a google API. As google will want a price for extensive api usage, and with the new potential
//code only having a marginal improvement, I (JS) made the decision to make the map city wide and have no pin
//on the users location. I have leaving the code that could make this theorectical possible so that if someone
//comes along and wants to do it, they have the easiest route.

//Also, there is a lot of content security policy alerts when you load this. Time permitting I will go back
//and attempt to fix it.
export default ParkMap;