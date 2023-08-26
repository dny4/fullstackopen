import { useState } from "react"
import { ShowCountry } from "./ShowCountry"
import { ShowCountryList } from "./ShowCountryList"

const DisplayCountries = ({countries }) => {
  const [showCountry, setShowCountry] = useState([])

  const handleShow = (e) => {
    const selectedCountry = countries.filter(c =>
      c.name.common === e.target.id)
    setShowCountry(selectedCountry)
  }

  // little directions
  if (countries.length === 0) {
    return <div>Nothing of like that exists, search for something else</div>
  }
  // perfect match
  if (countries.length === 1) {
    return <ShowCountry country={countries[0]} />
  }
  // when show button is clicked 
  if (showCountry.length === 1) {
    return <ShowCountry country={showCountry[0]} />
  }
  // list matching options
  return <ShowCountryList countries={countries} handleShow={handleShow} />
  // from ShowCountryList when event is triggered the handleShow will
  // update the state showCountry, and this will trigger the <re-render,
  // component, now this time countries.length != 1 but showCountry.length is 
  // so good, this seems like hack, may be I don't understand something
}

export default DisplayCountries
