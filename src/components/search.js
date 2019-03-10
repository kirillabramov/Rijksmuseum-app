import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchTiles, handleSearchTerm } from '../actions';

class Search extends Component {
  static get propTypes() {
    return {
      fetchTiles: PropTypes.func,
      handleSearchTerm: PropTypes.func,
      term: PropTypes.string.isRequired,
      perpage: PropTypes.number.isRequired,
      page: PropTypes.number.isRequired,
      sorting: PropTypes.string.isRequired
    };
  }

  static get defaultProps() {
    return {
      fetchTiles: () => {},
      handleSearchTerm: () => {}
    };
  }

  handleInput = e => {
    const { handleSearchTerm } = this.props;
    handleSearchTerm(e.target.value);
  };

  handleSubmit = e => {
    e.preventDefault();
    const { fetchTiles, term, perpage, page, sorting } = this.props;
    fetchTiles(perpage, page, term, sorting);
  };

  render() {
    const { term } = this.props;
    return (
      <div>
        <input
          placeholder="Search keyword..."
          type="text"
          value={term}
          onChange={this.handleInput}
        />
        <button type="submit" onClick={this.handleSubmit}>
          Search
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ term, perpage, page, sorting }) => {
  return { term, perpage, page, sorting };
};

export default connect(
  mapStateToProps,
  { fetchTiles, handleSearchTerm }
)(Search);
