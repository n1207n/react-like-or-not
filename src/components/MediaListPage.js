import React from 'react';

import Dialog from 'material-ui/Dialog';
import {GridList, GridTile} from 'material-ui/GridList';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Star from 'material-ui/svg-icons/toggle/star';
import ListIcon from 'material-ui/svg-icons/action/list';
import Snackbar from 'material-ui/Snackbar';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

import config from 'config';
import {getRecentMediaUrl} from '../sources/InstagramAPI';

import MediaItem from './MediaItem';

const defaultProps = {
  token: '',
  accessHash: '',
  mediaList: [],
  saveAuthData() {},
  fetchImageList() {},
  pushMediaToFavorites() {},
};

export default class MediaListPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      mediaDialogIsOpened: false,
      favoriteSnackbarIsOpened: false,
      selectedMediaItem: null,
      displayFilterIndex: 0,
    };

    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.fetchMediaData = this.fetchMediaData.bind(this);
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleFavorite = this.handleFavorite.bind(this);
    this.handleCloseFavoriteSnackbar = this.handleCloseFavoriteSnackbar.bind(this);
    this.handleOpenFavoriteSnackbar = this.handleOpenFavoriteSnackbar.bind(this);
    this.changeDisplayFilter = this.changeDisplayFilter.bind(this);
  }

  componentDidMount() {
    this.checkAuthentication();
    this.fetchMediaData();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.mediaList.length !== 0) {
      this.changeDisplayFilter(this.state.displayFilterIndex);
    }
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

  handleFavorite(index, e) {
    e.stopPropagation();

    this.props.pushMediaToFavorites(index);

    if (this.state.mediaDialogIsOpened) {
      this.handleCloseDialog();
    }

    this.handleOpenFavoriteSnackbar();
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

  handleOpenFavoriteSnackbar() {
    this.setState({
      favoriteSnackbarIsOpened: true,
    });
  }

  handleCloseFavoriteSnackbar() {
    this.setState({
      favoriteSnackbarIsOpened: false,
    });
  }

  changeDisplayFilter(index) {
    this.setState({
      displayFilterIndex: index,
    });
  }

  render() {
    const {displayMediaList} = this.state;

    /**
     * Dialog component rendering begins
     */
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
    /**
     * Dialog component rendering ends
     */

    /**
     * Bottom navigation component rendering begins
     */
    const bottomNavigation = (
      <BottomNavigation
        selectedIndex={this.state.displayFilterIndex}>
        <BottomNavigationItem
          label="All"
          icon={<ListIcon />}
          onTouchTap={() => this.changeDisplayFilter(0)}/>

          <BottomNavigationItem
            label="Favorites"
            icon={<Star />}
            onTouchTap={() => this.changeDisplayFilter(1)}/>
      </BottomNavigation>
    );
    /**
     * Bottom navigation component rendering ends
     */

     const mediaGridTileRenderer = (media, index) => {
       return (
         <GridTile
           key={media.id}
           actionIcon={(
             <IconButton
               onTouchTap={this.handleFavorite.bind(this, index)}>
                 <Star color="white" />
             </IconButton>
           )}
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
     };

    /**
     * Main component rendering begins
     */
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
            {this.state.displayFilterIndex === 0 ? this.props.mediaList.map(mediaGridTileRenderer) : this.props.mediaList.filter(item => item.favorite === true).map(mediaGridTileRenderer)}
        </GridList>

        {bottomNavigation}
        {dialog}

        <Snackbar
          open={this.state.favoriteSnackbarIsOpened}
          message={"Marked as favorite"}
          autoHideDuration={3000}
          onRequestClose={this.handleCloseFavoriteSnackbar}/>
      </div>
    );
  }
}

MediaListPage.propTypes = {
  accessHash: React.PropTypes.string.isRequired,
  token: React.PropTypes.string.isRequired,
  mediaList: React.PropTypes.array.isRequired,
  saveAuthData: React.PropTypes.func.isRequired,
  fetchImageList: React.PropTypes.func.isRequired,
  pushMediaToFavorites: React.PropTypes.func.isRequired,
};

MediaListPage.defaultProps = defaultProps;

MediaListPage.contextTypes = {
  router: React.PropTypes.object.isRequired,
};
