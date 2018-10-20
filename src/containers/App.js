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
import Persons from "../components/Persons/Persons";
import Cockpit from "../components/Cockpit/Cockpit";

// A stateful component can be looked at as a container. Contains state, and methods that interact with that state.
// In stateful component we can access state, and we can access lifecycle hooks.
// Access state and props via"this": this.state.... this.props....
// OInly use stateful components if you need to access state or lifecycle hooks.

// This is a container of sorts - its supposed to really just manage the state and manipulate the state.
class App extends Component {
    state = {
        persons: [
            { id: "1", name: "Ox", age: 38 },
            { id: "2", name: "Tracey", age: 42 },
            { id: "3", name: "Kate", age: 45 }
        ],
        showPersons: false
    };

    // Property of this class
    deletePersonHandler = personIndex => {
        // This does not create a copy of the current state.
        // It creates a reference to the existing state which is bad when we need to alter the data.
        // Important!
        // const persons = this.state.persons;

        // Using slice without any arguements passed just creates a new copy of the object for us to alter.
        // Important!
        // const persons = this.state.persons.slice();

        // You can use the spread operator to create a new array like the below.
        // This is a more modern appraoch..
        const persons = [...this.state.persons];

        // (index, # to remove, new additions(if any))
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
        // to spread a single OBJECT and create a new one.
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
        // TODO: Read up on that prevState thing - itsnt that better approach here?
        this.setState({ showPersons: !doesShow });
    };

    render() {
        // // Inline JS styling.
        // // Styling hover state is difficult.
        // // Local styling, not global. Scoped to the component added to.
        // // Doing this allows us to edit CSS for conditional statements etc...
        // const cssStyling = {
        //   backgroundColor: "green",
        //   color: "white",
        //   font: "inherit",
        //   border: "1px solid blue",
        //   padding: "8px",
        //   cursor: "pointer"
        // };

        let persons = null;

        if (this.state.showPersons) {
            // Props are passed IN to a component
            // return (
            //     // Higher order component - it wraps a component and does something (uses props.children) - in this case handles errors.
            //     // We also move the key prop from Person to ErrorBoundary as this is uppermost element.
            //     // Assign a unique key to the key prop below
            //     <ErrorBoundary key={person.id}>
            //         <Person
            //             name={person.name}
            //             age={person.age}
            //             click={() => this.deletePersonHandler(index)}
            //             // take the event that is generated by the event handler being fired
            //             // pass it through to the method we are using.
            //             changed={event => this.nameChangedHandler(event, person.id)}
            //         />
            //     </ErrorBoundary>
            // );
            persons = (
                <Persons
                    persons={this.state.persons}
                    clicked={this.deletePersonHandler}
                    changed={this.nameChangedHandler}
                />
            );
        }

        // Remember: {} is an object, [] is an array.
        // Dont get confused!

        return (
            // {/* THIS IS NOT HTML! It looks like HTML, but it actually is JSX.  */}
            // {/* This is important. */}
            <div className={cssclasses.App}>
                <Cockpit
                    appTitle={this.props.title}
                    showPersons={this.state.showPersons}
                    persons={this.state.persons}
                    // Dont call this.switchNameHandler() with brackets because that calls the function as soon as the DOM is rendered.
                    // Call it without parentheses and then it is executed only when the handler is clicked.
                    clicked={this.togglePersonsHandler}
                />
                {persons}
            </div>
        );
    }
}

export default App;
