import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchDetails, fetchTiles } from '../actions';

class Details extends Component {
  static get propTypes() {
    return {
      id: PropTypes.string,
      fetchDetails: PropTypes.func,
      fetchTiles: PropTypes.func,
      details: PropTypes.instanceOf(Object),
      history: PropTypes.instanceOf(Object)
    };
  }

  static get defaultProps() {
    return {
      id: '',
      fetchDetails: () => {},
      fetchTiles: () => {},
      details: {},
      history: {}
    };
  }

  componentDidMount() {
    const { fetchDetails, id } = this.props;
    fetchDetails(id);
  }

  handleSearch = term => {
    const { fetchTiles, history } = this.props;
    history.push('/Rijksmuseum-app/');
    fetchTiles(10, 1, term);
  };

  render() {
    const { details } = this.props;
    if (details.length === 0) return <div>loading...</div>;
    return (
      <div>
        <Link to="/">Home</Link>
        <div className="description">
          <div className="description-img">
            <img src={details.artObject.webImage.url} />
          </div>
          <div className="description-text">
            <h1>{details.artObject.title}</h1>

            {details.artObject.description}
            {details.artObjectPage.tags.length !== 0
              ? `tags: ${details.artObjectPage.tags.map(tag => <span>{tag}</span>)}`
              : null}
            <div className="collections">
              {details.artObject.objectCollection.length !== 0 ? (
                <React.Fragment>
                  <span>collection:</span>
                  <button
                    type="button"
                    onClick={e => this.handleSearch(e.currentTarget.textContent)}
                  >
                    {details.artObject.objectCollection}
                  </button>
                </React.Fragment>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ details }) => {
  return { details };
};

export default withRouter(
  connect(
    mapStateToProps,
    { fetchDetails, fetchTiles }
  )(Details)
);
