import './App.css';
import { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { VscDebugRestart } from "react-icons/vsc";

function App() {

const [city, setCity] = useState("");
const [info, setInfo] = useState([]);
//state for whether a city was inputted
const [inputted, setInputted] = useState(false);
const [error, setError]= useState(false)


const submitHandler = (e) => {
  setInputted(true);
e.preventDefault();
let url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + 
"&APPID=230d57a1b12cb9cabcdba44be440b353"

fetch(url, {mode: 'cors'})
.then(function(response) {
  return response.json();
})
.then(function(response) {
  let temp = response.main.temp;
  let condition = response.weather[0].description;
  let feelsLike = response.main.feels_like;
  let humidity = response.main.humidity;
  let high = response.main.temp_max;
  let low = response.main.temp_min;

  let info = 
  [
  <div key={city}>city: {city}</div>,
  <div key={temp}>temperature: {temp}</div>,
  <div key={condition}>condition: {condition}</div>,
<div key={feelsLike}>feels like: {feelsLike}</div>,
<div key={humidity}>humidity: {humidity}</div>,
<div key={high}>high: {high}</div>,
<div key={low}>low: {low}</div>]
  setInfo(info)


})
.catch(function(error){
setError(true)
  console.log("ERROR")
})
}

const cityHandler = (e) => {
let inputCity = e.target.value;
setCity(inputCity);
console.log(inputCity)

}

const restartHandler = () => {
  setError(false);
  setInputted(false);
}

let theForm = <form className="form" onSubmit={(e) => submitHandler(e)}>
<input type="text" placeholder="Enter City Here" onChange={(e) => cityHandler(e)}/><br/>
<button type="submit">{<FaSearch/>}</button>
</form>

let theResult = <div>
  {info} <br/>
  <button onClick={restartHandler}><VscDebugRestart/></button>

</div>


  return (
    <div className="App">
<h1>Weather Checker</h1>
{inputted ? theResult : theForm}
{(error) && <div>
  
  <h2>ERROR: no such city exists</h2>
  
  <button onClick={restartHandler}><VscDebugRestart/></button>
  
  </div>}

    </div>
  );
}

export default App;
