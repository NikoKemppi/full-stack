import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

/*
const StatisticLine = (props) => {
  if (props.text == "positive") {
    return (
      <div>
        <p>{props.text} {props.value} %</p>
      </div>
    )
  } else {
    return (
      <div>
        <p>{props.text} {props.value}</p>
      </div>
    )
  }
}

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
      <StatisticLine text="good" value ={props.good} />
      <StatisticLine text="neutral" value ={props.neutral} />
      <StatisticLine text="bad" value ={props.bad} />
      <StatisticLine text="all" value ={all} />
      <StatisticLine text="average" value ={average} />
      <StatisticLine text="positive" value ={positive} />
    </div>
  )
}*/

const StatisticsTableData = (props) => {
  if (props.name == "positive") {
    return (
      <tr>
        <td>{props.name}</td>
        <td>{props.value} %</td>
      </tr>
    )
  }
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const StatisticsTable = (props) => {
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
    <table>
      <tbody>
        <StatisticsTableData name={"good"} value={props.good} />
        <StatisticsTableData name={"neutral"} value={props.neutral} />
        <StatisticsTableData name={"bad"} value={props.bad} />
        <StatisticsTableData name={"all"} value={all} />
        <StatisticsTableData name={"average"} value={average} />
        <StatisticsTableData name={"positive"} value={positive} />
      </tbody>
    </table>
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
      <StatisticsTable good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App