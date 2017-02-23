import React from 'react';

import {GridList, GridTile} from 'material-ui/GridList';

import {getRecentMediaUrl} from '../sources/InstagramAPI';

import MediaItem from './MediaItem';

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

    if (!this.props.isAuthenticated) {
      this.context.router.push('/');
    }
  }

  fetchMediaData() {
    this.props.fetchImageList(getRecentMediaUrl, this.props.accessHash);
  }

  render() {
    const {mediaList} = this.props;

    return (
      <div className="flex-container flex-center" style={{
        "margin": "12px",
        "flexWrap": "wrap",
        "justifyContent": "space-around",
      }}>
        <GridList
          cols={3}
          style={{
            "width": "500px",
            "overflowY": "auto",
          }}>
            {mediaList.map(media => {
              return (
                <GridTile key={media.id}>
                  <MediaItem mediaType={media.type} mediaSrcUrl={media.type === "image" ? media.images.low_resolution.url : media.videos.low_resolution.url} />
                </GridTile>
              );
            })}
        </GridList>
      </div>
    );
  }
}

MediaListPage.propTypes = {
  saveAuthData: React.PropTypes.func.isRequired,
  isAuthenticated: React.PropTypes.bool.isRequired,
  mediaList: React.PropTypes.array.isRequired,
  fetchImageList: React.PropTypes.func.isRequired,
  accessHash: React.PropTypes.string.isRequired,
};

MediaListPage.contextTypes = {
  router: React.PropTypes.object.isRequired,
};
