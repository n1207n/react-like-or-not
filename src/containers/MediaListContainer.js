import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {saveAuthData, fetchImageList} from '../actions';

import MediaListPage from '../components/MediaListPage';

const mapStateToProps = (state, ownProps) => {
  return {
    accessHash: ownProps.location.hash.split('access_token=')[1] || '',
    isAuthenticated: state.API.isAuthenticated,
    mediaList: state.API.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({saveAuthData, fetchImageList}, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MediaListPage);
