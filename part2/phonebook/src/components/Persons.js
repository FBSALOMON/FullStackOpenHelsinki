import React from 'react'
import Person from './Person'

const Persons = ({ persons, deleteContactById }) => {
    return (
        <ul>
            {persons.map((person) =>
                <Person key={person.name} person={person} deleteContactById={deleteContactById} />
            )}
        </ul>
    )
}

export default Persons