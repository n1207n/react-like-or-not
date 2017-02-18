import React from 'react';

import store from '../index';
import InstagramAPI from '../sources/InstagramAPI';

export default class MediaListPage extends React.Component {
  constructor(props) {
    super(props);

    this.checkAuthentication = this.checkAuthentication.bind(this);
  }

  componentDidMount() {
    this.checkAuthentication();
  }

  checkAuthentication() {
    this.props.saveAuthData(this.props.accessHash);

    if (this.props.accessHash === '') {
      this.context.router.push('/');
    }
  }

  render() {
    return (
      <div className="flex-container" style={{
        "marginLeft": "24px",
      }}>
        <h1>Eyyy authenticated</h1>
      </div>
    );
  }
}

MediaListPage.propTypes = {
  saveAuthData: React.PropTypes.func.isRequired,
  accessHash: React.PropTypes.string.isRequired,
};

MediaListPage.contextTypes = {
  router: React.PropTypes.object.isRequired,
};
