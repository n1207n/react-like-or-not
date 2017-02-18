import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {saveAuthData} from '../actions';

import MediaListPage from '../components/MediaListPage';

const mapStateToProps = (state, ownProps) => {
  return {
    accessHash: ownProps.location.hash.split('access_token=')[1] || '',
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({saveAuthData}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MediaListPage);
