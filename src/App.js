import React from 'react';
import './App.css';
import Cities from './Data/Cities'
import $ from 'jquery'
import RestDays from './Components/RestDays';
import Today from './Components/Today'
import assets from './Data/assets';
import API_KEY from './Data/Credentials';
import './App.css'
import { Col,Container,Row } from 'react-bootstrap'





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
    console.log(this.state.city)

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
        <Container fluid>
        <Row fluid>
        <Col xs={2} sm={4}>
        {restDays}
        </Col>
        </Row>
        </Container>
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
