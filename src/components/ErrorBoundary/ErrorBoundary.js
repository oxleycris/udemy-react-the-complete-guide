import React, { Component } from "react";

class ErrorBoundary extends Component {
    state = {
        hasError: false,
        errorMessage: ""
    };

    componentDidCatch = (error, errorInfo) => {
        // errorMessage becomes equal to the error that has throw, and the error message that we prescribed within it.
        this.setState({ hasError: true, errorMessage: error });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <h1>{this.state.errorMessage}</h1>
                    <details>{this.state.errorInfo}</details>
                </div>
            );
        } else {
            // this.props.children is the children elements inside the <ErroBoundary> component when we use the component within App.js (or wherever we use it).</ErroBoundary>
            return this.props.children;
        }
    }
}

export default ErrorBoundary;
