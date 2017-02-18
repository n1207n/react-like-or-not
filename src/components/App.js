import React, { PropTypes } from 'react';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import InfoSVGIcon from 'material-ui/svg-icons/action/info';
import HomeSVGIcon from 'material-ui/svg-icons/action/home';

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
          <MenuItem
            primaryText="Home"
            leftIcon={<HomeSVGIcon />}
            onTouchTap={() => this.context.router.push('/')}/>
          <MenuItem
            primaryText="About"
            leftIcon={<InfoSVGIcon />}
            onTouchTap={() => this.context.router.push('/about')}/>
        </Drawer>

        <div className="content-container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

App.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default App;
