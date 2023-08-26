import { useEffect, useState } from 'react'
import restCountries from './services/restCountries'
import DisplayCountries from './components/DisplayCountries'

function App() {
  const [countries, setCountries] = useState([])
  const [matches, setMatches] = useState([])

  const handleSearch = e => {
    const search = e.target.value
    const matched = countries.filter(c => {
      const match = c.name.common.toLowerCase()
        .match(search.toLowerCase())
      return match ? true : false
    })
    setMatches(matched)
  }

  useEffect(() => {
    restCountries
      .getAll()
      .then(response => {
        setCountries(response)
      })
  }, [])


  return (
    <>
      <h1>Countries Data</h1>
      <div>
        <label htmlFor="search">find countries </label>
        <input id='search' onChange={handleSearch} />
      </div>
      {
        (matches.length > 10)
          ?
          <div>please be more specific</div>
          :
          <DisplayCountries countries={matches} />
      }
    </>
  )
}

export default App
