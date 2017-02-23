import React from 'react';

import Dialog from 'material-ui/Dialog';
import {GridList, GridTile} from 'material-ui/GridList';
import FlatButton from 'material-ui/FlatButton';

import {getRecentMediaUrl} from '../sources/InstagramAPI';

import MediaItem from './MediaItem';

export default class MediaListPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mediaDialogIsOpened: false,
      selectedMediaItem: null,
    };

    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.fetchMediaData = this.fetchMediaData.bind(this);
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
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

  handleOpenDialog(media) {
    this.setState({
      mediaDialogIsOpened: true,
      selectedMediaItem: media,
    });
  }

  handleCloseDialog() {
    this.setState({
      mediaDialogIsOpened: false,
    });
  }

  render() {
    const {mediaList} = this.props;

    const dialogActions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.handleCloseDialog}/>,
    ];

    let dialog = null;

    if (this.state.selectedMediaItem !== null) {
      dialog = (
        <Dialog
          open={this.state.mediaDialogIsOpened}
          actions={dialogActions}
          ref={(element) => {this.dialogElement = element;}}
          onRequestClose={this.handleCloseDialog}
          autoScrollBodyContent={true}>
          <MediaItem
            mediaType={this.state.selectedMediaItem.type}
            mediaSrcUrl={this.state.selectedMediaItem.type === "image" ? this.state.selectedMediaItem.images.standard_resolution.url : this.state.selectedMediaItem.videos.standard_resolution.url} />
        </Dialog>
      );
    }

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
                <GridTile
                  key={media.id}
                  onTouchTap={this.handleOpenDialog.bind(this, media)}>
                  <MediaItem
                    mediaType={media.type}
                    mediaSrcUrl={media.type === "image" ? media.images.low_resolution.url : media.videos.low_resolution.url} />
                </GridTile>
              );
            })}
        </GridList>

        {dialog}
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
