import React from "react";
import Person from "./Person/Person";

// If function assigment is in one line then we can just use brackets
// Important
// The return below is NOT the return of the persons function,
// it is the return of the mapping callback function.
// Therefore we dont use {} after the person arrow assignment, we use
// parentheses.
const persons = props =>
    props.persons.map((person, index) => {
        return (
            <Person
                key={person.id}
                name={person.name}
                age={person.age}
                click={() => props.clicked(index)}
                changed={event => props.changed(event, person.id)}
            />
        );
    });

export default persons;

// Functional components are mainly responsible for presenting JSX - they cannot maintain state.
// In a faunctiona component you have logic, whereas a state based class component has actual methods that can be called, often state changing based

// In stateless components we can NOT access state, and we can NOT access lifecycle hooks too.
// Access props without "this": props.xyz etc

