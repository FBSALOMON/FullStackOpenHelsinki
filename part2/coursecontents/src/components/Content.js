import React from 'react'
import Part from '../components/Part';
import Total from '../components/Total';

const Content = ({ parts }) => {
    const total = parts.reduce((s, p) => s + p.exercises, 0)

    return (
        <div>
            <ul>
                {parts.map(part => <Part key={part.id} part={part} />)}
            </ul>
            <Total total={total} />
        </div>
    )
}

export default Content