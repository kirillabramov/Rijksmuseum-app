import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTiles, handleSorting } from '../actions';

class Sorting extends Component {
  static get propTypes() {
    return {
      fetchTiles: PropTypes.func,
      handleSorting: PropTypes.func,
      term: PropTypes.string.isRequired,
      sorting: PropTypes.string.isRequired,
      perpage: PropTypes.number.isRequired,
      page: PropTypes.number.isRequired
    };
  }

  static get defaultProps() {
    return {
      fetchTiles: () => {},
      handleSorting: () => {}
    };
  }

  handleChange = e => {
    const { fetchTiles, handleSorting, term, perpage, page, sorting } = this.props;
    handleSorting(e.target.value);
    fetchTiles(perpage, page, term, sorting);
  };

  render() {
    const { sorting } = this.props;
    return (
      <div>
        <label htmlFor="select">
          Order by:
          <select id="select" value={sorting} onChange={this.handleChange}>
            <option value="relevance">relevance</option>
            <option value="objecttype">objecttype</option>
            <option value="chronologic">chronologic</option>
            <option value="achronologic">achronologic</option>
            <option value="artist">artist</option>
            <option value="artistdesc">artistdesc</option>
          </select>
        </label>
      </div>
    );
  }
}
const mapStateToProps = ({ term, perpage, page, sorting }) => {
  return { term, perpage, page, sorting };
};

export default connect(
  mapStateToProps,
  { fetchTiles, handleSorting }
)(Sorting);
