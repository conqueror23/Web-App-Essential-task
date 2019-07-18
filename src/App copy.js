import React from 'react';
import './App.css';
import Cities from './Data/Cities'
import $ from 'jquery'
import RestDays from './Components/RestDays';
import Today from './Components/Today'
import assets from './Data/assets';
import API_KEY from './Data/Credentials'
import electron from 'electron'

console.log(electron)

    // const CITIES = {
    //   sydney: { lat: '-33.8688', lon:'151.2093' },
    //   brisbane: { lat: '-27.4698', lon:'153.0251' },
    //   melbourne: { lat: '-37.8136', lon:'144.9631' },
    //   snowyMountains: {lat: '-36.5000', lon: '148.3333' },
    // };  

class App extends React.Component {  
  constructor(){
    super()
    this.state={
        cityIndex:0,
        data:[],
    }
    this.handleArrows= this.handleArrows.bind(this)
  }
  handleArrows(event){
    const cityList =['sydney','brisbane','melbourne','snowyMountains'];
   
    let index =this.state.cityIndex;
    let newIndex;
    switch(event.target.id){
      case 'rightBtn':
        newIndex=index+1;
        break;
      case 'leftBtn':
        newIndex=index-1;
        break;
      default:
        newIndex=index;
    }
    if(newIndex>3 || newIndex <0){
      newIndex= Math.abs(4)-Math.abs(newIndex)
    }
    this.setState({cityIndex:newIndex})

    let cityName =cityList[newIndex];
    //  let lat =Cities[cityName]['lat']
    //  let lon =Cities[cityName]['lon']

    // 
    console.log(cityName);
    // return cityName

  }
  componentDidMount(){

    let city=Cities['sydney'];
    $.ajax({
      url: 'http://api.weatherbit.io/v2.0/forecast/daily?lat='+city['lat']+'&lon='+city['lon']+'&key=' + API_KEY
    }).then(res=>{
      let data =res.data.filter((item,key)=>{
        if(key<5){
          return item 
        }
      })
      let data_final = data.map(item=>{
        var gsday = new Date(item.valid_date);
        const daynames=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        item.valid_date =daynames[gsday.getDay()]
        var code =item.weather.code
        switch(code){
          case (code<=233):
            item.iconUrl =assets.assets.WeatherIcons.thunderStorm;
            break;
          case(code>233 &&code <=522):
            item.iconUrl =assets.WeatherIcons.rain;
            break;
          case(code>522 && code <=623):
            item.iconUrl=assets.WeatherIcons.snow;
            break;
          case 800:
            item.iconUrl=assets.WeatherIcons.sunny;
            break;
          default:
            item.iconUrl=assets.WeatherIcons.cloudy;
        }

        return item
      })
      this.setState({data:data_final})
      // console.log(this.state.data);

    });
  }
  render (){
    const restDays= this.state.data.map(item=> <RestDays  data={item}/>)
    if(this.state.data.length){
      return (
        <div className="App">
        <div id='upperFloor'>
        <a id='leftBtn' value='right' href='#' onClick={this.handleArrows}><img id='leftBtn' src={assets.leftArrow} alt='pic not found'></img></a>
        <Today data= {this.state.data[0]} 
        />
        <a id='rightBtn' value='left' href='#' onClick={this.handleArrows}><img id='rightBtn' src={assets.rightArrow} alt='pic not found'></img></a>
        </div>

        <hr></hr>
    
        {restDays}
        </div>
      );
    }
    return (
      <div> 
      Loading..
      </div>
    )
    }
 

}

export default App;
