import React from 'react';
import './App.css';
import Cities from './constants/Cities'
import $ from 'jquery'
import RestDays from './Components/RestDays';
import Today from './Components/Today'
import assets from './constants/assets';
import API_KEY from './constants/Credentials';

class App extends React.Component {  
  constructor(){
    super()
    this.state={
        city:"Sydney",
        cityIndex:0,
        data:[],
    }
    this.handleArrows= this.handleArrows.bind(this)
  }
  handleArrows(event){
   
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
    let cityName =Cities.cityList[newIndex];
    this.setState({city:cityName,cityIndex:newIndex})
    this.changeInfo()

  }
  changeInfo(){
    let city=Cities[this.state.city];
    // as the 3hourly api has descripted to make the app works the same as expected i turned to use this one instead
    $.ajax({
      url: 'http://api.weatherbit.io/v2.0/forecast/daily?lat='+city['lat']+'&lon='+city['lon']+'&key=' + API_KEY
    }).then(res=>{
      let data =res.data.filter((item,key)=>{
        if(key<5){
          return item 
        }
      })
      let data_final = data.map(item=>{
        var date = new Date(item.valid_date);
        const weekdays=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        item.valid_date =weekdays[date.getDay()]
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
        item.temp = parseInt(item.temp)
        item.min_temp = parseInt(item.min_temp)
        item.max_temp =parseInt(item.max_temp)

        return item
      })
      this.setState({data:data_final})
    });
  }
  componentDidMount(){
    this.changeInfo()
  }    
  render (){
    const restDays= this.state.data.map(item=> <RestDays  data={item}/>)
    if(this.state.data.length){
      return (
        <div className="App">
        <div id='upperFloor'>
        <a id='leftBtn' value='right' href='#' onClick={this.handleArrows}><img id='leftBtn' src={assets.leftArrow} alt='pic not found'></img></a>
        <Today data= {this.state.data[0]}
          city ={this.state.city} 
        />
        <a id='rightBtn' value='left' href='#' onClick={this.handleArrows}><img id='rightBtn' src={assets.rightArrow} alt='pic not found'></img></a>
        </div>
        <hr></hr>
     <div id='bottomPart'>
     {restDays}

     </div>
       
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
