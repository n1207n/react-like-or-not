import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {saveAuthData, fetchImageList, pushMediaToFavorites} from '../actions';

import MediaListPage from '../components/MediaListPage';

const mapStateToProps = (state, ownProps) => {
  return {
    accessHash: ownProps.location.hash.split('access_token=')[1] || '',
    token: state.API.token,
    mediaList: state.API.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({saveAuthData, fetchImageList, pushMediaToFavorites}, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MediaListPage);
