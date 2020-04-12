import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ header }) => <h1> {header} </h1>

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const Statistic = ({ text, qnt, symbol }) => {
    return (
        <tr>
            <td> {text} </td>
            <td> {qnt} {symbol} </td>
        </tr>
    ) 
}

const Statistics = ({ good, neutral, bad}) => {
    const allFeedback = good + neutral + bad;
    const avgScore = (good - bad) / allFeedback;
    const avgGoodScore = 100 * good / allFeedback + "%";

    if (allFeedback === 0) {
        return <div>No feedback given</div>
    }

    return (
        <table>
            <tbody>
                <Statistic text="Good" qnt={good} />
                <Statistic text="Neutral" qnt={neutral} />
                <Statistic text="Bad" qnt={bad} />
                <Statistic text="All" qnt={allFeedback} />
                <Statistic text="Avarage" qnt={avgScore} />
                <Statistic text="Positive" qnt={avgGoodScore}/>
            </tbody>
        </table>
    ) 
}



const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGoodClick = () => setGood(good + 1)
    const handleNaturalClick = () => setNeutral(neutral + 1)
    const handleBadClick = () => setBad(bad + 1)

    return (
        <div>
            <Header header="Give feedback" />
            <Button onClick={handleGoodClick} text="good" />
            <Button onClick={handleNaturalClick} text="neutral" />
            <Button onClick={handleBadClick} text="bad" />
            <Header header="Statistics" />
            <Statistics good={good} neutral={neutral} bad={bad}/>
            
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)