import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchTiles, handlePage, handlePerPage } from '../actions';

class Pagination extends Component {
  static get propTypes() {
    return {
      fetchTiles: PropTypes.func,
      handlePage: PropTypes.func,
      handlePerPage: PropTypes.func,
      term: PropTypes.string.isRequired,
      perpage: PropTypes.number.isRequired,
      page: PropTypes.number.isRequired,
      sorting: PropTypes.string.isRequired
    };
  }

  static get defaultProps() {
    return {
      fetchTiles: () => {},
      handlePage: () => {},
      handlePerPage: () => {}
    };
  }

  handlePagination = i => {
    const { fetchTiles, term, perpage, sorting, handlePage } = this.props;
    handlePage(i);
    fetchTiles(perpage, i, term, sorting);
  };

  displayPerPage = value => {
    const { fetchTiles, term, page, sorting, handlePerPage } = this.props;
    handlePerPage(value);
    fetchTiles(value, page, term, sorting);
  };

  renderPagination = () => {
    const pages = Array.from({ length: 9 }, (v, i) => (
      <button
        type="button"
        onClick={() => {
          this.handlePagination(i + 1);
        }}
        key={i}
      >
        {i + 1}
      </button>
    ));

    return pages;
  };

  render() {
    return (
      <div className="pagination">
        <div className="pagination-pages">{this.renderPagination()}</div>
        <div className="pagination-perpage">
          <button type="button" onClick={() => this.displayPerPage(10)}>
            10 |
          </button>
          <button type="button" onClick={() => this.displayPerPage(50)}>
            50 |
          </button>
          <button type="button" onClick={() => this.displayPerPage(100)}>
            100
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ term, perpage, page, sorting }) => {
  return { term, perpage, page, sorting };
};

export default connect(
  mapStateToProps,
  { fetchTiles, handlePage, handlePerPage }
)(Pagination);
