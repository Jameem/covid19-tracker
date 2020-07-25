import React, { useState, useEffect } from "react"
import { MenuItem, FormControl, Select } from "@material-ui/core"
import InfoBox from "./InfoBox"

import "./App.css"

function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState("worldwide")

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }))

          setCountries(countries)
        })
    }

    getCountriesData()
  }, [])

  const onCountryChange = (event) => {
    const countryCode = event.target.value
    setCountry(countryCode)
  }

  return (
    <div className="app">
      <div className="app_header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl className="app_dropdown">
          <Select variant="outlined" onChange={onCountryChange} value={country}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map((country) => {
              return <MenuItem value={country.value}>{country.name}</MenuItem>
            })}
          </Select>
        </FormControl>
      </div>

      <div className="app_stats">
        <InfoBox title="Covid-19 Cases" cases={1000} total={2000}></InfoBox>
        <InfoBox title="Recovered" cases={1000} total={2000}></InfoBox>
        <InfoBox title="Deaths" cases={1000} total={2000}></InfoBox>
      </div>
    </div>
  )
}

export default App
