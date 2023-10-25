import React from 'react';
import PropTypes from 'prop-types';
import styles from './gallery.module.scss';

const Gallery = React.forwardRef(function Gallery(
  { children, ...delegated },
  ref,
) {
  const pictures = React.Children.toArray(children);

  return (
    <div ref={ref} className={styles.gallery} {...delegated}>
      <div className={styles.gallery}>
        <div className={styles.leftPicture}>{pictures[0]}</div>
        <div className={styles.rightPictures}>
          {pictures.slice(1).map((picture, index) => (
            index > 3 ? null :
              <div key={index} className={styles.imgcontainer}>
                {picture}
              </div>
          ))}
        </div>

      </div>
    </div>
  );
});

Gallery.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Gallery;
