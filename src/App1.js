import React from 'react';
import './App.css';
import Cities from './Data/Cities'
import $ from 'jquery'
import { log } from 'util';
import RestDays from './Components/RestDays';
// make your request and send to each part 
const API_KEY ="deb43fa6d29348de9f6378b984b0a2b4";
    // const CITIES = {
    //   sydney: { lat: '-33.8688', lon:'151.2093' },
    //   brisbane: { lat: '-27.4698', lon:'153.0251' },
    //   melbourne: { lat: '-37.8136', lon:'144.9631' },
    //   snowyMountains: {lat: '-36.5000', lon: '148.3333' },
    // };

    // assets 
    // // background
    // background: "https://bit.ly/webApp_Assets_background",
  
    // // arrows
    // leftArrow: "https://bit.ly/webApp_Assets_leftArrow",
    // rightArrow: "https://bit.ly/webApp_Assets_rightArrow",
  
    // // weather icons
    // cloudy: "https://bit.ly/webApp_Assets_cloudy",
    // rain: "https://bit.ly/webApp_Assets_rain",
    // snow: "https://bit.ly/webApp_Assets_snow",
    // sunny: "https://bit.ly/webApp_Assets_sunny",
    // thunderStorm: "https://bit.ly/webApp_Assets_thunderStorm"
 

class App extends React.Component {
  
  constructor(){
    super()
    this.state={
          temp:"",
          max_temp:'',
          min_temp:'',
          description:'',
          code:'',
    }
  }


  
  render (){
    let lat=Cities['sydney']['lat'];
    let lon=Cities['sydney']['lon'];
    $.ajax({
      url: 'http://api.weatherbit.io/v2.0/forecast/daily?lat='+lat+'&lon='+lon+'&key=' + API_KEY,
      // url: 'https://api.weatherbit.io/v2.0/forecast/hourly?lat='+lat+'&lon='+lon+'&key=' + API_KEY,
      success: function (res) 
      {
        const data = res.data;
        // var arr=[];
    //dayName 
    const daynames=[
      'Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'
      ];
      
       const data1 =data.filter(function (value,key){
          if(key<5){
            return value
          }
        })
        const Show =data1.map(item=> <RestDays data={item}

          /> 
          )
        console.log(data1);
        
      },

      error: function (err) { 
        console.log(err);
       },
      
    });

    return (
      <div className="App">
      <button onClick={this.requestWeather}>before</button>
      <h1>{this.state.temp}</h1>
      <button onClick={this.requestWeather}>next</button>
      <hr></hr>
      </div>
    );
  }

 
}

export default App;
