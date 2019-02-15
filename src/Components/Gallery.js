import React from 'react';

import Image from './Gallery-item';

const Gallery = props => {

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
    return (
      <li className="results">
        <h2>No results found</h2>
        <p>That search did not return any results, please try again.</p>
      </li>
    );
  }
}

export default Gallery;
