import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundry extends Component {
  state = {
    hasError: false
  };

  static get propTypes() {
    return {
      children: PropTypes.instanceOf(Object)
    };
  }

  static get defaultProps() {
    return {
      children: {}
    };
  }

  componentDidCatch() {
    this.setState({
      hasError: true
    });
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError)
      return (
        <div className="error">
          <h3>Something went wrong...</h3>
          <p>We will fix it as soon as possible 4 you :)</p>
        </div>
      );

    return children;
  }
}

export default ErrorBoundry;
