import React from 'react';

import {getRecentMediaUrl} from '../sources/InstagramAPI';

export default class MediaListPage extends React.Component {
  constructor(props) {
    super(props);

    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.fetchMediaData = this.fetchMediaData.bind(this);
  }

  componentDidMount() {
    this.checkAuthentication();
    this.fetchMediaData();
  }

  checkAuthentication() {
    this.props.saveAuthData(this.props.accessHash);

    if (this.props.accessHash === '') {
      this.context.router.push('/');
    }
  }

  fetchMediaData() {
    this.props.fetchImageList(getRecentMediaUrl, this.props.accessHash);
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
  fetchImageList: React.PropTypes.func.isRequired,
  accessHash: React.PropTypes.string.isRequired,
};

MediaListPage.contextTypes = {
  router: React.PropTypes.object.isRequired,
};
