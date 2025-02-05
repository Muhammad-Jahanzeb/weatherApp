import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [location,setLocation]=useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=7a6101a2fd8f9fd216385684b247c52c`
 
  const [data,setData]=useState({})

  const searchLocation=(event)=>{
    if (event.key ==='Enter'){
      axios.get(url).then((response)=>{
        setData(response.data)
        console.log(response.data)
      }).catch(err=>{console.log(err)})

      setLocation('')
    }
  }


  return (
    <div className="app">
      <div className='search'>
        <input value={location}
        onChange={event=> setLocation(event.target.value)}
        onKeyDown={searchLocation}
        type='text'
        placeholder='Enter Location'/>

      </div>


      <div className='container'>
        <div className='top'>
          <div className='location'>
           <p>{data.name}</p>
           </div>
          <div className='temp'>
            {data.main?<h1>{data.main.temp.toFixed()} °F</h1>:null}
          </div>
          <div className='description'>
            {/* <p>Clouds</p> */}
            {data.weather?<p>{data.weather[0].main}</p>:null}
          </div>
        </div>

        {data.name!=undefined && <div className='bottom'>
        <div className='feels'>
          {data.main?<p className='bold'>{data.main.feels_like.toFixed()} °F</p>:null}
          {/* <p className='bold'>65F</p> */}
          <p style={{fontSize:'1.3rem'}}>Feels Like</p>
        </div>
        <div className='humidity'>
          {data.main?<p className='bold'>{data.main.humidity}%</p>:null}
          {/* <p className='bold'>20%</p> */}
          <p style={{fontSize:'1.3rem'}}>Humidity</p>
        </div>
        <div className='wind'>
          {data.wind?<p className='bold'>{data.wind.speed} MPH</p>:null}
          {/* <p className='bold'>12 MPH</p> */}
          <p style={{fontSize:'1.3rem'}}>Wind Speed</p>
        </div>
      </div>}
    </div>
  </div>
  );
}

export default App;
