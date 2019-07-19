import React from 'react'

function Today(props){
    return (
        <div id='today'>
            <h1>{props.city}</h1>
            <img src={props.data.iconUrl} alt='pic not found'></img>
            <p>{props.data.temp+'\xB0'}</p>
            <p>{props.data.max_temp+'\xB0'}   {props.data.min_temp+'\xB0'}</p>
            <p>{props.data.weather.description}</p>
        </div>
    )
}



export default Today