import React, { Component } from 'react';

class ProgressRing extends Component {

    constructor(props) {
        super(props);


    }

    render() {

        return (
          <svg
            height="40"
            width="40"
            >
            <circle
              stroke={this.props.completed ? "green" : "#e6e600"}
              fill="transparent"
              strokeWidth= "3"
              r="14"
              cx="20"
              cy="20"
              />
          </svg>
        );
      }
}

export default ProgressRing;