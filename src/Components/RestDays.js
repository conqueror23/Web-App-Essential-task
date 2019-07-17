import React from 'react'

function RestDays (props){

    return (
        <div id='restDays'>
            <p>{props.data.valid_date}</p>
            <img src={props.data.iconUrl} alt='pic not found'></img>
            <p>{props.data.max_temp}/{props.data.temp}</p>

        </div>
    )
}

export default RestDays