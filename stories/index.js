import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';

import { withKnobs, text, boolean, number } from '@kadira/storybook-addon-knobs';
import { WithNotes } from '@kadira/storybook-addon-notes';
import {muiTheme} from 'storybook-addon-material-ui';

import InstagramSignIn from '../src/components/InstagramSignIn';
import MediaItem from '../src/components/MediaItem';

storiesOf('InstagramSignIn', module)
  .addWithInfo('default', () => (
    <InstagramSignIn oAuthUrl={""} />
  ), { source: true, inline: true });

const MediaItemStories = storiesOf('MediaItem', module);

MediaItemStories.addWithInfo('image type', () => (
  <MediaItem
    mediaType={"image"}
    mediaSrcUrl={"http://placehold.it/350x150"}
    width={350}
    height={150} />
), { source: true, inline: true });

MediaItemStories.add('image type', () => {
  const width = number('Width', 350);
  const height = number('Height', 150);

  return (
    <WithNotes notes={'MediaItem with Image type'}>
      <MediaItem
        mediaType={"image"}
        mediaSrcUrl={"http://placehold.it/350x150"}
        width={width}
        height={height}/>
    </WithNotes>
  )
});

MediaItemStories.add('video type', () => {
  const width = number('Width', 350);
  const height = number('Height', 150);
  const videoAutoPlay = boolean('AutoPlay', true);
  const videoLoop = boolean('Loop', true);
  const videoMuted = boolean('Muted', true);

  return (
    <WithNotes notes={'MediaItem with Video type can control much more'}>
      <MediaItem
        mediaType={"video"}
        mediaSrcUrl={"http://clips.vorwaerts-gmbh.de/VfE_html5.mp4"}
        width={width}
        height={height}
        videoAutoPlay={videoAutoPlay}
        videoLoop={videoLoop}
        videoMuted={videoMuted}/>
    </WithNotes>
  )
});
