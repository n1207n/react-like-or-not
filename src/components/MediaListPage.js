import React from 'react';

import Dialog from 'material-ui/Dialog';
import {GridList, GridTile} from 'material-ui/GridList';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

import config from 'config';
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
    this.handleFavorite = this.handleFavorite.bind(this);
  }

  componentDidMount() {
    this.checkAuthentication();
    this.fetchMediaData();
  }

  checkAuthentication() {
    this.props.saveAuthData(this.props.accessHash);

    if (this.props.token === '') {
      this.context.router.push('/');
    }
  }

  fetchMediaData() {
    this.props.fetchImageList(getRecentMediaUrl, this.props.accessHash);
  }

  handleFavorite(media, e) {
    e.stopPropagation();

    if (this.state.mediaDialogIsOpened) {
      this.handleCloseDialog();
    }
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
      selectedMediaItem: null,
    });
  }

  render() {
    const {mediaList} = this.props;

    const dialogActions = [
      <FlatButton
        label="Like"
        primary={true}
        onTouchTap={this.handleCloseDialog}/>,
      <FlatButton
        label="Dislike"
        secondary={true}
        onTouchTap={this.handleCloseDialog}/>,
    ];

    let dialog = null;

    if (this.state.selectedMediaItem !== null) {
      const media = this.state.selectedMediaItem;
      const date = new Date(parseInt(media.created_time) * 1000);
      const title = media.caption !== null ? `${media.caption.text} on ${date.toLocaleString()}` : `${media.user.full_name} on ${date.toLocaleString()}`;
      let locationMap = null;

      if (media.location !== null) {
        locationMap = (
          <div>
            <h3>{media.location.name}</h3>

            <ReactMapboxGl
              style="mapbox://styles/mapbox/streets-v8"
              accessToken={config.MAPBOX_TOKEN}
              containerStyle={{
                height: "50vh",
                width: "480px"
              }}
              scrollZoom={false}
              zoom={[14]}
              center={[media.location.longitude, media.location.latitude]}>
                <Layer
                  type="symbol"
                  id="marker"
                  layout={{ "icon-image": "marker-15", "icon-size": 1 }}>
                  <Feature coordinates={[media.location.longitude, media.location.latitude]}/>
                </Layer>
            </ReactMapboxGl>
          </div>
        );
      }

      dialog = (
        <Dialog
          open={this.state.mediaDialogIsOpened}
          actions={dialogActions}
          ref={(element) => {this.dialogElement = element;}}
          onRequestClose={this.handleCloseDialog}
          autoScrollBodyContent={true}
          title={title}
          contentStyle={{
            "width": '540px',
            "maxWidth": '768px',
          }}
          bodyStyle={{
            "padding": "16px",
            "display": "flex",
            "flexDirection": "column",
            "alignItems": "center",
          }}>
          {media.type === "image" ?
            <MediaItem
              mediaType={media.type}
              mediaSrcUrl={media.images.standard_resolution.url}
              width={480}
              height={270} /> :
            <MediaItem
              mediaType={media.type}
              mediaSrcUrl={media.videos.standard_resolution.url}
              width={480}
              height={270}
              videoMuted={false} />
          }

          <h2>{`${media.likes.count} likes`} <FontIcon className="fa fa fa-heart" style={{marginLeft: "4"}} /></h2>
          <p>{`Taken with ${media.filter} filter ;)`}</p>
          {locationMap}
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
          cellHeight={200}
          padding={1}
          style={{
            "width": "480px",
            "heigth": "480px",
            "overflowY": "auto",
          }}>
            {mediaList.map(media => {
              return (
                <GridTile
                  key={media.id}
                  actionIcon={<IconButton onTouchTap={this.handleFavorite.bind(this, media)}><StarBorder color="white" /></IconButton>}
                  actionPosition="left"
                  title={`${media.likes.count} likes`}
                  titleStyle={{
                    "textAlign": "start",
                  }}
                  onTouchTap={this.handleOpenDialog.bind(this, media)}>
                  <MediaItem
                    mediaType={media.type}
                    mediaSrcUrl={media.type === "image" ? media.images.low_resolution.url : media.videos.low_resolution.url}
                    width={159}
                    height={200} />
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
  token: React.PropTypes.string.isRequired,
  mediaList: React.PropTypes.array.isRequired,
  fetchImageList: React.PropTypes.func.isRequired,
  accessHash: React.PropTypes.string.isRequired,
};

MediaListPage.contextTypes = {
  router: React.PropTypes.object.isRequired,
};
