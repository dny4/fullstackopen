import { useState } from 'react'

const Button = ({ handleClick, text }) => 
  <button onClick={handleClick}> {text} </button>

const StatisticLine = ({ text, value }) =>  <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = ({good, neutral, bad }) => {

  //scroes: good*1, bad*-1, neutral*0
  const averageFeedback = () => (good - bad)/(good + bad + neutral)
  const positiveFeedback = () => good/(good+bad+neutral) * 100
  
  const noFeedback = (good + bad + neutral) === 0
  if (noFeedback){
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <h1>statistics</h1> 
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <tr>
            <td>all</td><td>{good + neutral + bad}</td>
          </tr>
          <tr>
            <td>average</td><td>{averageFeedback()}</td>
          </tr>
          <tr>
            <td>positive</td><td>{positiveFeedback()} %</td>
          </tr>
        </tbody>  
      </table>
    </div>
  )
}


function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)


  return (
    <>
      <h1>give feedback</h1>

      <Button handleClick={handleGood} text='good' />
      <Button handleClick={handleNeutral} text='neutral' />
      <Button handleClick={handleBad} text='bad' />
      
      <Statistics good={good} neutral={neutral} bad={bad}/> 
    </>
  )
}

export default App
