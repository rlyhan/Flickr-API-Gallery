import React from 'react';
import PropTypes from 'prop-types';

import Image from './Gallery-item';
import NoResults from './NoResults';

const Gallery = (props) => {

  props.history.push(`/search/${props.query}`);

  const results = props.data.slice(0, 24);
  let images;

  if (results.length > 0) {
    images = results.map(image =>
      <Image url={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`} key={image.id}/>
    );
    return (
      <li className="results">
        <h2>{props.query} Images</h2>
        <ul>
          {images}
        </ul>
      </li>
    );
  } else {
    props.history.push(`/error`);
    return (
      <NoResults />
    );
  }
}

Gallery.propTypes = {
  data: PropTypes.array,
  search: PropTypes.func,
  query: PropTypes.string,
  history: PropTypes.object
};

export default Gallery;
