import { useState, useEffect } from 'react'
import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY
//console.log("API key:", api_key)

const getCountries = () => {
  const request = axios.get('https://restcountries.com/v3.1/all')
  return request.then(response => response.data).catch(error => {console.log('fail')})
}

const getCapitalCoordinates = country => {
  const request = axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${country.capital},${country.cca2}&limit=1&appid=${api_key}`)
  return request.then(response => response.data).catch(error => {console.log('fail')})
}

const getCapitalWeather = (coords) => {
  const lat = coords[0].lat
  const lon = coords[0].lon
  const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`)
  return request.then(response => response.data).catch(error => {console.log('fail')})
}

const Finder = ({newFinder, handleFinderChange}) => {
  return (
    <form>
      find countries <input value={newFinder} onChange={handleFinderChange}/>
    </form>
  )
}

const Weather = ({country}) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    console.log("starting useEffect")
    getCapitalCoordinates(country).then(cData => {
      console.log("cData", cData)
      getCapitalWeather(cData).then(wData => {
        console.log("wData", wData)
        setWeatherData(wData)
      })
    })}, [country])
  
  if (weatherData === null) {
    console.log("now loading")
    return (
      <div>
        <p>Loading weather data...</p>
      </div>
    )
  } else {
    console.log("weatherData", weatherData)
    console.log("after useEffet:")
    const x = weatherData
    if (x !== undefined) {
      console.log("x:",x)
      return (
        <div>
          <h3>Weather in {country.capital}</h3>
          <p>temperature {x.main.temp} Celcius</p>
          <img src={`http://openweathermap.org/img/wn/${x.weather[0].icon}@2x.png`}/>
          <p>wind {x.wind.speed} m/s</p>
        </div>
      )
    }
  }
}

const Country = ({country}) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <b>languages:</b>
      <ul>
        {Object.values(country.languages).map((language, i) => <li key={i}>{language}</li>)}
      </ul>
      <img src={country.flags.png}/>
      <Weather country={country}/>
    </div>
  )
}

const CountryName = ({country, selectCountry}) => {
  return (
    <div>
      {country.name.common} <button onClick={selectCountry}>show</button>
    </div>
  )
}

const Countries = ({countries, setNewFinder}) => {
  if (countries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (countries.length === 1) {
    return (
      <Country country={countries[0]}/>
    )
  } else {
    return (
      countries.map(country => 
        <CountryName key={country.name.common} country={country} selectCountry={() => setNewFinder(country.name.common)}/>
      )
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState(null) 
  const [newFinder, setNewFinder] = useState('')

  useEffect(() => {
    getCountries()
    .then(initialCountries => {
      setCountries(initialCountries)
    })
  }, [])

  if (countries === null) {
    return (
      <div>
        <p>Loading countries...</p>
      </div>
    )
  }
  
  const handleFinderChange = (event) => {
    console.log(event.target.value)
    setNewFinder(event.target.value)
  }

  const filteredCountries = countries
                            .filter(country => 
                              country.name.common.toLowerCase()
                              .includes(newFinder.toLowerCase())
                              );

  return (
    <div>
      <Finder newFinder={newFinder} handleFinderChange={handleFinderChange}/>
      <Countries countries={filteredCountries} setNewFinder={setNewFinder}/>
    </div>
  )
}

export default App