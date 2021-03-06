import React from 'react';

import store from '../store/configureStore';

import FontIcon from 'material-ui/FontIcon';

import {oAuthUrl} from '../sources/InstagramAPI';

import InstagramSignIn from './InstagramSignIn';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.checkAuthentication = this.checkAuthentication.bind(this);
  }

  componentDidMount() {
    this.checkAuthentication();
  }

  checkAuthentication() {
    if (store.getState().API.token !== '') {
      this.context.router.push(`/list/#access_token=${store.getState().API.token}`);
    }
  }

  render() {
    return (
      <div className="flex-container flex-center login-container">
        <FontIcon className="fa fa-instagram" style={{
          "fontSize": "5em",
        }} />
        <h2>Please continue to Instagram login page first ;)</h2>
        <InstagramSignIn oAuthUrl={oAuthUrl} />
      </div>
    );
  }
}

HomePage.propTypes = {
};

HomePage.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default HomePage;
