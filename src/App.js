import React, { useState, useEffect } from "react"
import { MenuItem, FormControl, Select } from "@material-ui/core"

import "./App.css"

function App() {
  const [countries, setCountries] = useState(["USA", "UK"])

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }))

          console.log(countries)

          setCountries(countries)
        })
    }

    getCountriesData()
  }, [])

  return (
    <div className="app">
      {/* Header */}
      <div className="app_header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl className="app_dropdown">
          <Select variant="outlined" value="abc">
            {countries.map((country) => {
              return <MenuItem value={country.value}>{country.name}</MenuItem>
            })}
          </Select>
        </FormControl>
      </div>
    </div>
  )
}

export default App
