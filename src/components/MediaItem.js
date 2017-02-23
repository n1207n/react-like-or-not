import React from 'react';

const defaultProps = {
  width: 200,
  height: 200,
  videoAutoPlay: true,
  videoLoop: true,
  videoMuted: true,
};

const styles = {
  cursor: 'pointer',
};

/**
 * MediaItem React component
 *
 * @param  {[string]} mediaType   "image" or "video"
 * @param  {[string]} mediaSrcUrl "http://www.google.com"
 * @return {[React.Component]}
 */
const MediaItem = ({mediaType, mediaSrcUrl, ...props}) => {
 return (
   <div style={styles}>
     {mediaType === "image" ?
       <img
         src={mediaSrcUrl}
         width={props.width}
         height={props.height} /> :
       <video
         autoPlay={props.videoAutoPlay}
         loop={props.videoLoop}
         muted={props.videoMuted}
         width={props.width}
         height={props.height}
         src={mediaSrcUrl} />}
   </div>
 );
};

export default MediaItem;

MediaItem.propTypes = {
  mediaType: React.PropTypes.string.isRequired,
  mediaSrcUrl: React.PropTypes.string.isRequired,
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  videoAutoPlay: React.PropTypes.bool,
  videoLoop: React.PropTypes.bool,
  videoMuted: React.PropTypes.bool,
};

MediaItem.defaultProps = defaultProps;
