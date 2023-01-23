import { useState, useEffect } from 'react'
import axios from "axios";

const getAll = () => {
  const request = axios.get('https://restcountries.com/v3.1/all')
  return request.then(response => response.data).catch(error => {console.log('fail')})
}

const Finder = ({newFinder, handleFinderChange}) => {
  return (
    <form>
      filter shown with <input value={newFinder} onChange={handleFinderChange}/>
    </form>
  )
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
  const [countries, setCountries] = useState([]) 
  const [newFinder, setNewFinder] = useState('')

  useEffect(() => {
    getAll()
    .then(initialCountries => {
      setCountries(initialCountries)
    })
  }, [])

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