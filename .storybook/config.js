import { configure, setAddon, addDecorator } from '@kadira/storybook';

import {muiTheme} from 'storybook-addon-material-ui';
import {withKnobs} from '@kadira/storybook-addon-knobs';
import InfoAddon from '@kadira/react-storybook-addon-info';

function loadStories() {
  require('font-awesome/css/font-awesome.css');
  require('../stories');
}

setAddon(InfoAddon);
addDecorator(muiTheme());
addDecorator(withKnobs);

configure(loadStories, module);
