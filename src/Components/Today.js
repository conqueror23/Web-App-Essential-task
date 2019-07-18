import React from 'react'


function Today(props){

    // const dayName;
    console.log(props)
    return (
        <div>
            <h1>{props.city}</h1>
            <img src={props.data.iconUrl} alt='pic not found'></img>
            <p>{props.data.temp}</p>
            <p>{props.data.max_temp}   {props.data.temp}</p>
            <p>{props.data.weather.description}</p>
        </div>
    )
}



export default Today