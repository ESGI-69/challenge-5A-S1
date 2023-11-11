import React from 'react';
import PropTypes from 'prop-types';
import styles from './Gallery.module.scss';
import Button from '../Button';
import { useTranslation } from 'react-i18next';
import Popin from '../../Popin';

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
  const { t } = useTranslation('gallery');

  const [ galleryIsOpen, setGalleryIsOpen ] = React.useState(false);
  const [ secondGalleryIsOpen, setSecondGalleryIsOpen ] = React.useState(false);

  const [ pictureIndex, setPictureIndex ] = React.useState(0);

  const openGallery = () => {
    setGalleryIsOpen(true);
  };

  const closeGallery = () => {
    setGalleryIsOpen(false);
  };

  const openSecondGallery = (index) => {
    setSecondGalleryIsOpen(true);
    setPictureIndex(index);
  };

  const closeSecondGallery = () => {
    setSecondGalleryIsOpen(false);
  };

  return (
    <div ref={ref} className={styles.Gallery} {...delegated}>

      {pictures.map((picture, index) => (
        index > 4 ? null :
          <div key={index} className={styles[gridClassArray[index]]}>
            {picture}
            {index === 4 && pictures.length > 5 ? <Button href="javascript:void" onClick={openGallery} className={styles.GalleryMoreBtn}>{t('viewPhotos', { count: pictures.length })}</Button> : null}
          </div>
      ))}

      {galleryIsOpen && (
        <Popin onClose={closeGallery}>
          <div className={styles.GalleryPopin}>
            {pictures.map((picture, index) => (
              <div key={index} className={styles.GalleryPopinImg} onClick={() => openSecondGallery(index)}>
                {picture}
              </div>
            ))}
          </div>
        </Popin>
      )}

      {secondGalleryIsOpen && (
        <Popin onClose={closeSecondGallery}>
          <div className={styles.GallerySlideshow}>
            <Button className={styles.GallerySlideshowArrow} onClick={() => setPictureIndex((pictureIndex - 1 + pictures.length) % pictures.length)}>←</Button>
            <div className={styles.GallerySlideshow}>
              {pictures[pictureIndex]}
            </div>
            <Button className={styles.GallerySlideshowArrow} onClick={() => setPictureIndex((pictureIndex + 1) % pictures.length)}>→</Button>
          </div>
        </Popin>
      )}

    </div>
  );
});

Gallery.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Gallery;
