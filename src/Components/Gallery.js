import React from 'react';

import Image from './Gallery-item';
import NoResults from './NoResults';

const Gallery = props => {

  const results = props.data.slice(0, 23);
  let images;

  if (results.length > 0) {
    images = results.map(image =>
      <Image url={`farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`} key={image.id}/>
    );
  } else {
    images = <NoResults />
  }

  return (
    <ul>
      {images}
    </ul>
  );
}

export default Gallery;
