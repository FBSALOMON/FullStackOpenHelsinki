import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ text }) => <h1> {text} </h1>

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const Anecdote = ({ anecdote, votes }) => (
    <div>
        <div>
            {anecdote}
        </div>
        <div>
            has {votes} points.
        </div>
    </div>
)

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [points, setPoints] = useState(Array(props.anecdotes.length).fill(0))
    const maxPointsIndex = points.indexOf(Math.max(...points));

    const handleClick = () => {
        let newSelected = Math.floor(Math.random() * (anecdotes.length));
        while (selected === newSelected) {
            newSelected = Math.floor(Math.random() * (anecdotes.length));
        }
        setSelected(newSelected)
    }

    const handlePoints = () => {
        const copy = [...points]
        copy[selected] += 1
        setPoints(copy)
    }

    return (
        <div>
            <Header text="Anecdote of the day" />
            <Anecdote anecdote={props.anecdotes[selected]} votes={points[selected]} />
            <div>
                <Button onClick={handlePoints} text="vote" />
                <Button onClick={handleClick} text="next anecdote" />
            </div>
            <Header text="Anecdote with most votes" />
            <Anecdote anecdote={props.anecdotes[maxPointsIndex]} votes={points[maxPointsIndex]} />
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)