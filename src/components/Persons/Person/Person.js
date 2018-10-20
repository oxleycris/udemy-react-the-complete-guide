import React from "react";
import cssclasses from "./Person.css";

// Functional component
// If you do not need state, then use this pattern!
const person = props => {
    // Error boundary stuff
    // const rnd = Math.random();
    // if (rnd > 0.7) {
    //     throw new Error("Something broke :(");
    // }

    return (
        <div className={cssclasses.Person}>
            <p onClick={props.click}>
                I'm {props.name} and I am {props.age} years old.{" "}
                {props.children}
            </p>
            <input type="text" onChange={props.changed} value={props.name} />
        </div>
    );
};

export default person;
