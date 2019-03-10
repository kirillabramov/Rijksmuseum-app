import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { fetchTiles, fetchDetails } from '../actions';
import '../css/main.css';

const Modal = ({ handleClose, show, children, history, id }) => {
  const showHideClassName = show ? 'modal active' : 'modal';

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <div className="modal-buttons">
          <button
            type="button"
            className="btn btn-outline-warning btn-small"
            onClick={() => {
              history.push(`/details/${id}`);
            }}
          >
            View more details
          </button>
          <button type="button" onClick={handleClose}>
            Close
          </button>
        </div>
      </section>
    </div>
  );
};

class Items extends Component {
  state = { show: false };

  static get propTypes() {
    return {
      fetchTiles: PropTypes.func,
      fetchDetails: PropTypes.func,
      error: PropTypes.bool.isRequired,
      loading: PropTypes.bool.isRequired,
      posts: PropTypes.instanceOf(Object),
      details: PropTypes.instanceOf(Object),
      history: PropTypes.instanceOf(Object)
    };
  }

  static get defaultProps() {
    return {
      fetchTiles: () => {},
      fetchDetails: () => {},
      posts: {},
      details: {},
      history: {}
    };
  }

  componentDidMount() {
    const { fetchTiles } = this.props;
    fetchTiles();
  }

  handleClose = () => {
    this.setState({ show: false });
  };

  handlePost = post => {
    const { fetchDetails } = this.props;
    this.setState({ show: true });
    fetchDetails(post.objectNumber);
  };

  renderItems = post => {
    return (
      <div className="tile" key={post.id} onClick={() => this.handlePost(post)}>
        <img src={post.headerImage.url} />
        <div className="tile__description">{post.longTitle}</div>
      </div>
    );
  };

  render() {
    const { error, loading, posts, details, history } = this.props;
    const { show } = this.state;
    if (error) return <div>Something went wrong...</div>;
    /* eslint no-nested-ternary: 0 */
    {
      return loading ? (
        <div className="loader"> loading... </div>
      ) : posts.length === 0 ? (
        <div>No art object could be found by your query</div>
      ) : (
        <React.Fragment>
          {details.length !== 0 ? (
            <Modal
              handleClose={this.handleClose}
              show={show}
              id={details.artObject.objectNumber}
              history={history}
            >
              <div className="description">
                <div className="description-img">
                  <img src={details.artObject.webImage.url} />
                </div>
                <div className="description-text">
                  <h1>{details.artObject.title}</h1>

                  {details.artObject.description}
                </div>
              </div>
            </Modal>
          ) : (
            <Modal>loading...</Modal>
          )}

          <div className="tiles">{posts.map(this.renderItems)}</div>
        </React.Fragment>
      );
    }
  }
}

Modal.propTypes = {
  children: PropTypes.string || PropTypes.instanceOf(Object),
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  history: PropTypes.instanceOf(Object),
  id: PropTypes.string
};

Modal.defaultProps = {
  children: [],
  handleClose: () => {},
  history: {},
  id: '',
  show: false
};

const mapStateToProps = ({ loading, posts, error, details }) => {
  return { loading, posts, error, details };
};

export default withRouter(
  connect(
    mapStateToProps,
    { fetchTiles, fetchDetails }
  )(Items)
);
