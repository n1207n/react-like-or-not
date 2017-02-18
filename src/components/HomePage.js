import React from 'react';

import {oAuthUrl} from '../sources/InstagramAPI';

import FontIcon from 'material-ui/FontIcon';

import InstagramSignIn from './InstagramSignIn';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
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


export default HomePage;
