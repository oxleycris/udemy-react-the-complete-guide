import React from "react";
import cssclasses from "./Cockpit.css";

const cockpit = props => {
    const classes = [];
    let btnClass = props.showPersons ? cssclasses.Red : "";

    if (props.persons.length <= 2) {
        classes.push(cssclasses.red); // classes = ['red']
    }

    if (props.persons.length <= 1) {
        classes.push(cssclasses.bold); // classes = ['red, 'bold']
    }

    return (
        <div className={cssclasses.Cockpit}>
            <h1>{props.appTitle}</h1>

            {/* .join with an empty char: "red bold" etc */}
            <p className={classes.join(" ")}>This is really working!</p>

            <button className={btnClass} onClick={props.clicked}>
                Toggle Persons
            </button>
        </div>
    );
};

export default cockpit;
