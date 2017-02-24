import React, { PropTypes } from 'react';

import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import InfoSVGIcon from 'material-ui/svg-icons/action/info';
import HomeSVGIcon from 'material-ui/svg-icons/action/home';
import ListSVGIcon from 'material-ui/svg-icons/action/list';

const defaultProps = {
  isAuthenticated: false,
  profileData: null,
};

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isDrawerOpened: false,
    };

    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer() {
    this.setState({
      isDrawerOpened: !this.state.isDrawerOpened,
    });
  }

  render() {
    const {children, isAuthenticated, profileData} = this.props;

    return (
      <div className="container">
        <AppBar title="React-like-or-not" iconClassNameRight="muidocs-icon-navigation-expand-more"
        onLeftIconButtonTouchTap={this.toggleDrawer}
        titleStyle={{
          cursor: 'pointer',
        }}
        onTitleTouchTap={() => this.context.router.push('/')}/>

        <Drawer
          docked={false}
          width={240}
          open={this.state.isDrawerOpened}
          onRequestChange={(open) => this.setState({isDrawerOpened: open})}>
          <h2 style={{
            "textAlign": "center",
          }}>React-like-or-not</h2>

          {profileData !== null ? (
            <div className="profile-container">
              <Avatar src={profileData.profile_picture} size={80} />
              <h4>{profileData.full_name}</h4>
            </div>
          ) : null }

          <MenuItem
            primaryText="Login page"
            leftIcon={<HomeSVGIcon />}
            onTouchTap={() => this.context.router.push('/')}/>
          <MenuItem
            primaryText="About"
            leftIcon={<InfoSVGIcon />}
            onTouchTap={() => this.context.router.push('/about')}/>
          <MenuItem
            primaryText="Media List"
            leftIcon={<ListSVGIcon />}
            onTouchTap={() => {
              const accessToken = localStorage.getItem('token');
              this.context.router.push(`/list/#access_token=${accessToken}`);
            }}/>
        </Drawer>

        <div className="content-container">
          {children}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
  isAuthenticated: PropTypes.bool.isRequired,
  profileData: PropTypes.object,
};

App.defaultProps = defaultProps;

App.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default App;
