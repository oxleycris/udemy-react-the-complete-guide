import React, { Component } from "react";
///////
// The css file below is now scoped soley to this component thanks to the "modules" edit within the webpack.config.dev.js file (and prod) on line272 and 340
// This is pretty cool
// IMPORTANT //
// When using create-react-app v2+ (you can check that by running create-react-app -V), support for CSS modules is already built-in!
// You don't need to eject then (though you still can - that won't be a problem). Instead, you can use CSS modules as described here:
// https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-a-css-modules-stylesheet
///////
import cssclasses from "./App.css";
import Person from "./Person/Person";
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";

// Class componenent, with state.
class App extends Component {
    state = {
        persons: [
            { id: "1", name: "Ox", age: 38 },
            { id: "2", name: "Tracey", age: 42 },
            { id: "3", name: "Kate", age: 45 }
        ],
        showPersons: false
    };

    // This property holds a function that can be executed.
    deletePersonHandler = personIndex => {
        // This does not create a copy of the current state.
        // It creates a refernce to the existing state which is bad when we need to alter the data.
        // Important!
        //const persons = this.state.persons;

        // Using slice without any arguements passed just creates a new copy of the object for us to alter.
        // Important!
        //const persons = this.state.persons.slice();

        // You can use the spread operator to create a new array like the below.
        // This is a more modern appraoch..
        const persons = [...this.state.persons];

        // (index, # to remove, new additions)
        persons.splice(personIndex, 1);
        // Reassign to state
        this.setState({ persons: persons });
    };

    // TODO: Read up more about events.
    nameChangedHandler = (event, id) => {
        // 1. Find the index position within the state.persons array for the id we have recieved.
        // Can use .find() too. Returns the element that matches the true statement.
        const personIndex = this.state.persons.findIndex(p => {
            // returns true when the statement is true, and then returns the index of the element that was true.
            return p.id === id;
        });

        // 2. Use the index position to pull out the person from the array, and copy into a new object.
        // Create a new person object from state by using spread operator
        // to spread a single object and create a new one.
        const person = {
            ...this.state.persons[personIndex]
        };

        // 3. Update the name value every time this method is called - i.e. on every key press.
        person.name = event.target.value;

        // 4. Get a copy of the state.persons array
        const persons = [...this.state.persons];

        // 5. Replace the existing person object with our updated version.
        persons[personIndex] = person;

        // 6. Set the state with the new object.
        this.setState({ persons: persons });

        // Note. This whole set will happen on every key press, and as a result the
        // front end will see the updates as it takes state.persons[i].name through.
    };

    togglePersonsHandler = () => {
        // Gets the existing state value
        const doesShow = this.state.showPersons;
        // Sets it to the opposite of what it currently is - toggles the boolean.
        this.setState({ showPersons: !doesShow });
    };

    render() {
        // // Inline JS styling.
        // // Styling hover state is difficult.
        // // Local styling, not global. Scoped to the component added to.
        // // Doing this allows us to edit CSS for conditional stateemnts etc...
        // const cssStyling = {
        //   backgroundColor: "green",
        //   color: "white",
        //   font: "inherit",
        //   border: "1px solid blue",
        //   padding: "8px",
        //   cursor: "pointer"
        // };

        let persons = null;
        let btnClass = "";

        if (this.state.showPersons) {
            // Set persons to some JSX code..
            persons = (
                <div>
                    {/* Map is like .foreach()*/}
                    {/* Index is the returned value for where in the array the element is.*/}
                    {this.state.persons.map((person, index) => {
                        // Props are passed IN to a component
                        // return (
                        //     // Higher order component - it wraps a component and does something - in this case handles errors.
                        //     // We also move the key prop from Person to ErrorBoundary as this is uppermost element.
                        //     // Assign a unique key to the key prop below
                        //     <ErrorBoundary key={person.id}>
                        //         <Person
                        //             name={person.name}
                        //             age={person.age}
                        //             click={() =>
                        //                 this.deletePersonHandler(index)
                        //             }
                        //             // take the event that is generated by the event handler being fired
                        //             // pass it through to the method we are using.
                        //             changed={event =>
                        //                 this.nameChangedHandler(
                        //                     event,
                        //                     person.id
                        //                 )
                        //             }
                        //         />
                        //     </ErrorBoundary>
                        // );
                        return (
                            // Higher order component - it wraps a component and does something - in this case handles errors.
                            // We also move the key prop from Person to ErrorBoundary as this is uppermost element.
                            // Assign a unique key to the key prop below
                            <ErrorBoundary key={person.id}>
                                <Person
                                    name={person.name}
                                    age={person.age}
                                    click={() =>
                                        this.deletePersonHandler(index)
                                    }
                                    // take the event that is generated by the event handler being fired
                                    // pass it through to the method we are using.
                                    changed={event =>
                                        this.nameChangedHandler(
                                            event,
                                            person.id
                                        )
                                    }
                                />
                            </ErrorBoundary>
                        );
                    })}
                </div>
            );

            // this is case sensitive - cssclasses.red does not work!
            btnClass = cssclasses.Red;
        }

        // Remember: {} is an object, [] is an array.
        // Dont get confused!
        // .join with an empty char: "red bold"
        // let classes = ['red', 'bold'].join(' ');

        const classes = [];
        if (this.state.persons.length <= 2) {
            classes.push(cssclasses.red); // classes = ['red']
        }

        if (this.state.persons.length <= 1) {
            classes.push(cssclasses.bold); // classes = ['red, 'bold']
        }

        return (
            // {/* THIS IS NOT HTML! It looks like HTML, but it actually is JSX.  */}
            // {/* This is important. */}
            <div className={cssclasses.App}>
                <h1>Hi, I am good at this shit.</h1>
                {/* Dynamic class list */}
                <p className={classes.join(" ")}>This is really working!</p>

                {/* Dont call this.switchNameHandler() with brackets because that calls the function as soon as the DOM is rendered.*/}
                {/* Call it without parentheses and then it is executed only when the handler is clicked. */}
                <button
                    className={btnClass}
                    onClick={this.togglePersonsHandler}
                >
                    Toggle Persons
                </button>
                {/* cannot use if block statement, can oly use simple ternery operators, hence using the persons variable */}
                {/* Recommended way of doing this */}
                {persons}
            </div>
        );
    }
}

export default App;
