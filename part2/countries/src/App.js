import { useState, useEffect } from 'react'
import axios from 'axios'

const Search = ({query, onChange}) =>
  <form>
    <h2>search</h2>
    filter countries by name:
    <input type="search"
      value={query}
      onChange={onChange} 
    />
  </form>

const ResultEntry = ({result}) =>
  <li>{result.name.common}</li>

const ResultsList = ({results}) =>
  <ul>
    {results.map(result => <ResultEntry key={result.name.official} result={result} />)}
  </ul>

const ResultInfo = ({result}) =>
  <div>
    <h2>{result.flag} {result.name.common}</h2>
    <h3>{result.name.official}</h3>
    <p>capital: {result.capital[0]}</p>
    <p>area: {result.area} km<sup>2</sup></p>
    <h3>Languages:</h3>
    <ul>
      {Object.entries(result.languages)
        .map(([key, language]) =>
          <li key={key}>{language}</li>
        )
      }
    </ul>
    <img src={result.flags.png} />
  </div>

const ResultsTree = ({results}) => {
  if (results.length > 10) {
    return 'Too many matches, please specify further'
  }
  else if (results.length === 1) {
    return <ResultInfo result={results[0]} />
  }
  else if (results.length === 0) {
    return 'no countries found'
  }
  else {
    return <ResultsList results={results} />
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data))
  }, [])
  console.log('rendered', countries.length, 'countries')

  const countriesToShow = countries.filter( country => 
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <>
      <h1>Countries</h1>
      <Search
        query={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)} 
      />
      <ResultsTree results={countriesToShow} />
    </>
  )
}

export default App