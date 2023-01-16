import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setGoodCount = newValue => {
    console.log('good now', newValue)
    setGood(newValue)
  }
  const setNeutralCount = newValue => {
    console.log('neutral now', newValue)
    setNeutral(newValue)
  }
  const setBadCount = newValue => {
    console.log('bad now', newValue)
    setBad(newValue)
  }

  const allCount = good + neutral + bad
  const average =  allCount > 0 ? (good - bad) / allCount : 0
  const positive = allCount > 0 ? 100 * good / allCount : 0

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGoodCount(good + 1)} text="good" />
      <Button handleClick={() => setNeutralCount(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBadCount(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {allCount}</p>
      <p>average {average}</p>
      <p>positive {positive} %</p>
    </div>
  )
}

export default App