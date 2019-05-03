import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import AnArticle from '../components/AnArticle';
import Comments from '../components/Comments';
import { fetchAnArticle, fetchArticleComments } from '../store/actions/commentsActions';

export class GetAnArticle extends Component {
  componentDidMount() {
    const { fetchTheArticle, fetchTheArticleComments, match } = this.props;
    const { slug } = match.params;
    fetchTheArticle(slug);
    fetchTheArticleComments(slug);
  }

  render() {
    const {
      isFetchingArticle,
      isFetchingComments,
      errors, isLoggedIn,
    } = this.props;
    let username = false;

    if (isLoggedIn && username === false) {
      username = localStorage.getItem('username');
    }
    if (isFetchingArticle) {
      return (<div className="article-loading">Loading...</div>);
    }
    if (errors) {
      return (<div className="article-errors">Return 404...</div>);
    }
    if (isFetchingComments) {
      return (<div className="comments-loading">Loading...</div>);
    }
    const { article, comments } = this.props;

    return (
      <div className="container an-article">
        <div className="auth">
          <ToastContainer />
          <AnArticle data={article} />
          <br />
          <hr />
          <br />
          <Comments data={comments} />
        </div>
      </div>
    );
  }
}

GetAnArticle.propTypes = {
  isFetchingArticle: PropTypes.bool.isRequired,
  isFetchingComments: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.func.isRequired,
  article: PropTypes.shape({}),
  match: PropTypes.shape({}).isRequired,
  errors: PropTypes.string,
  comments: PropTypes.shape({}),
  fetchTheArticle: PropTypes.func,
  fetchTheArticleComments: PropTypes.func,
};

GetAnArticle.defaultProps = {
  article: {},
  errors: null,
  comments: [],
  fetchTheArticle: () => {},
  fetchTheArticleComments: () => {},
};

export const mapStateToProps = state => ({
  article: state.getCommentsReducer,
  comments: state.getCommentsReducer,
  isLoggedIn: state.loginUser.loggedIn,
  errors: state.getCommentsReducer.errors,
  author: state.getCommentsReducer.author,
  isFetchingArticle: state.getCommentsReducer.isFetchingArticle,
  isFetchingComments: state.getCommentsReducer.isFetchingComments,
});

export const mapDispatchToProps = dispatch => ({
  fetchTheArticle: (slug) => {
    dispatch(fetchAnArticle(slug));
  },
  fetchTheArticleComments: (slug) => {
    dispatch(fetchArticleComments(slug));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(GetAnArticle);
