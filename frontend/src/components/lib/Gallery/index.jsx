import React from 'react';
import PropTypes from 'prop-types';
import styles from './gallery.module.scss';
import Button from '../Button';

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
            {index === 4 ? <Button href="javascript:void" className={styles.GalleryMoreBtn}>voir les {pictures.length} photos</Button> : null}
          </div>
      ))}

    </div>
  );
});

Gallery.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Gallery;
