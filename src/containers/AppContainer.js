import {connect} from 'react-redux';

import App from '../components/App';

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.API.isAuthenticated,
    profileData: state.API.data.length !== 0 ? state.API.data[0].user : null,
  };
};

export default connect(
  mapStateToProps,
)(App);
