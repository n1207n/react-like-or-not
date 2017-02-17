import React, {PropTypes} from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

export default class InstagramSignIn extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <RaisedButton
        href={this.props.oAuthUrl}
        backgroundColor="#5851db"
        labelColor="white"
        buttonStyle={{
          "width": "240px",
        }}
        icon={<FontIcon className="fa fa-instagram" />}
        label="Sign In" labelPosition="before" />
    );
  }
}

InstagramSignIn.propTypes = {
  oAuthUrl: PropTypes.string.isRequired,
};
