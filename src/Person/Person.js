import React from "react";
import cssclasses from "./Person.css";

// Functional component
// If you do not need state, then use this pattern!
const person = props => {
  return (
    <div className={cssclasses.Person}>
      <p onClick={props.click}>
        I'm {props.name} and I am {props.age} years old. {props.children}
      </p>
      {/*       
        value sets the value from the state set in the App.js constructor.
        onChange alters the value and saves state.
        The state values are then passed through as props 
      */}
      <input type="text" onChange={props.changed} value={props.name} />
    </div>
  );
};

export default person;
