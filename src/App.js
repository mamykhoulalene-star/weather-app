import './App.css';
import React from 'react';
import { useState } from 'react';


function App() {
  const [city,setCity]=useState('');
  const [data,setData]=useState({});
  const [error,setError]=useState('')
  const [loading,setLoading]=useState(false)

async function fetchData(){

  setLoading(true)

try {
  const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`) 
  const data= await response.json()
 

  if (data.cod ==="404") {
  setError('City not found')
  return <h1>City not found</h1>
 }
 
  console.log(data)
  setData(data)
  setError('')
} 


catch (error) {
 setError('Something went wrong') 
} finally{
  setLoading(false)
}

}

function handleKeyPress(e){
if (e.key==='Enter') {
  fetchData()
}
}
   
  return (
    <div className='hero-section'> 
      
      <div className='city'>

  <h1>Discover the Weather in Every City you go</h1>    

      <input onKeyPress={handleKeyPress} type='text' placeholder='enter city name' value={city} onChange={(e)=>setCity(e.target.value)} />

      </div>      

<div className='buttons'>

      <button onClick={fetchData}>search</button>
      <button onClick={()=>{setCity('');setData({});setError('')}}>clear</button>

</div>
  
      {loading && <h1>Loading...</h1>}

{data.main && (

<div className='result'>
<div style={{display:'flex', flexDirection:'row', gap:'20px', alignItems:'center'}}>
 <img 
  src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
  alt="weather icon"
/>
<h2 className='temp'>{Math.round(data.main?.temp)} °C</h2>

<div>
<h2>Humidity: {data.main.humidity}%</h2>
<h2>Wind Speed: {Math.round(data.wind.speed)}m/s</h2>
<h2>Weather: {data.weather?.[0]?.description}</h2>
<h2>Feels Like {Math.round(data.main?.feels_like)} °C</h2>
</div>



</div>
 


</div>)}
    </div>
  );
}

export default App;
