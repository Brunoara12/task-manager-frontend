import React, { Component } from 'react';

class Task extends Component {
    render() {
        return (
            <p>
                TESTING//{this.props.task.description}
            </p>
        );
    }
}

export default Task;