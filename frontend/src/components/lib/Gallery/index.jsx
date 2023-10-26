import React from 'react';
import PropTypes from 'prop-types';
import styles from './gallery.module.scss';

const Gallery = React.forwardRef(function Gallery(
  { children, ...delegated },
  ref,
) {
  const pictures = React.Children.toArray(children);
  const gridClassArray = [
    'GalleryMain',
    'GalleryFirst',
    'GallerySecond',
    'GalleryThird',
    'GalleryMore',
  ];

  return (
    <div ref={ref} className={styles.Gallery} {...delegated}>

      {pictures.map((picture, index) => (
        index > 4 ? null :
          <div key={index} className={styles[gridClassArray[index]]}>
            {picture}
          </div>
      ))}

    </div>
  );
});

Gallery.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Gallery;
