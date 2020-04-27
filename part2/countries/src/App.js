import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';

const Language = ({ language }) => {
    return (
        <li>{language.name}</li>
    )
}

const Flag = ({ flagUrl }) => {
    return (
        <div>
        <img
            src={flagUrl}
            alt="new"
            />
        </div>
    )
}

const Weather = ({ country }) => {
    const [weather, setWeather] = useState('')
    const api_key = process.env.REACT_APP_API_KEY
    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.name}`)
            .then(response => {
                setWeather(response.data)
            })
    }, [])
    console.log(weather)

    if (!weather) {
        return <div>fetching data</div>
    }

    return (
        <div>
            <p>Temperature: {weather.current.temperature}</p>
            <Flag flagUrl={weather.current.weather_icons[0]} />
            <p> wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir} </p>
        </div>
    )
        
}

const Countries = ({ countriesFilter, handleSearch }) => {
    console.log(countriesFilter)
    if (countriesFilter.length === 1) {
        return (
            <div>
                <h3>{countriesFilter[0].name}</h3>
                <p>capital:  {countriesFilter[0].capital}</p>
                <p>population:  {countriesFilter[0].population}</p>
                <h4>languages</h4>
                <ul>
                    {countriesFilter[0].languages.map((language) =>
                        <Language key={language.name} language={language} />
                    )}
                </ul>
                <Flag flagUrl={countriesFilter[0].flag} />
                <Weather country={countriesFilter[0]} />
            </div>
        )
    }

    if (countriesFilter.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    }

    return (
        <ul>
            {countriesFilter.map((country) =>
                <Country key={country.name} country={country} handleSearch={handleSearch} />
             )}
        </ul>
    )
}

const Country = ({ country, handleSearch }) => {
    return (
        <li>{country.name}
            <button value={country.name} onClick={handleSearch}>show</button>
        </li>
    )
}

function App() {
    const [countries, setCountries] = useState([])
    const [search, setSearch] = useState('')
    const [countriesFilter, setCountriesFilter] = useState([])

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                console.log(response.data)
                setCountries(response.data)
            })
    }, [])

    const handleSearch = (event) => {
        setCountriesFilter(countries.filter(contry => contry.name.toUpperCase().includes(event.target.value.toUpperCase())))
        setSearch(event.target.value)
    }

    return (
        <div>
              <div>
                  name:
                  <input
                      value={search}
                      onChange={handleSearch}
                  />
              </div>
            <Countries countriesFilter={countriesFilter} handleSearch={handleSearch} />
        </div>
  );
}

export default App;
