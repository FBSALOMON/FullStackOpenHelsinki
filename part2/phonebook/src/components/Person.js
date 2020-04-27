import React from 'react'

const Person = ({ person, deleteContactById }) => {
    return (
        <li>
            {person.name} {person.number}
            <button onClick={() => deleteContactById(person)}>Delete</button>
        </li>
    )
}

export default Person