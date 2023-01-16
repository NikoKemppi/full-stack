import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = (props) => {
  if (props.good == 0 && props.neutral == 0 && props.bad == 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  const all = props.good + props.neutral + props.bad
  const average =  all > 0 ? (props.good - props.bad) / all : 0
  const positive = all > 0 ? 100 * props.good / all : 0
  return (
    <div>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>positive {positive} %</p>
    </div>
  )
}

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

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGoodCount(good + 1)} text="good" />
      <Button handleClick={() => setNeutralCount(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBadCount(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App