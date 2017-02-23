import React from 'react';

const defaultProps = {
  videoWidth: 180,
  videoHeight: 180,
  videoAutoPlay: true,
  videoLoop: true,
  videoMuted: true,
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
   <div>
     {mediaType === "image" ?
       <img src={mediaSrcUrl} /> :
       <video
         autoPlay={props.videoAutoPlay}
         loop={props.videoLoop}
         muted={props.videoMuted}
         width={props.videoWidth}
         height={props.videoHeight}
         src={mediaSrcUrl} />}
   </div>
 );
};

export default MediaItem;

MediaItem.propTypes = {
  mediaType: React.PropTypes.string.isRequired,
  mediaSrcUrl: React.PropTypes.string.isRequired,
  videoWidth: React.PropTypes.number,
  videoHeight: React.PropTypes.number,
  videoAutoPlay: React.PropTypes.bool,
  videoLoop: React.PropTypes.bool,
  videoMuted: React.PropTypes.bool,
};

MediaItem.defaultProps = defaultProps;
