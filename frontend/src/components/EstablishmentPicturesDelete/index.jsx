import styles from './EstablishmentPicturesDelete.module.scss';
import PropTypes from 'prop-types';
import Button from '../lib/Button';

const EstablishmentPicturesUpload = ({
  establishmentPictures,
  deletePictureEstablishment,
  isDeletePictureEstablishmentLoading,
  t,
}) => (
  <>
    <div className={styles.EstablishmentPicturesUpload}>
      { establishmentPictures.map((picture) => (
        <div className={styles.EstablishmentPicturesUploadRow} key={picture.id}>
          <img className={styles.EstablishmentPicturesUploadRowImage} src={`${import.meta.env.VITE_API_DOMAIN}${picture.pathPicture}`} key={picture.id} alt="Establishment picture" />
          <Button variant='danger' disabled={isDeletePictureEstablishmentLoading} onClick={() => deletePictureEstablishment(picture.id)}>{t('delete', { ns: 'base' })}</Button>
        </div>
      ))}
    </div>
  </>
);

EstablishmentPicturesUpload.propTypes = {
  establishmentPictures: PropTypes.arrayOf(PropTypes.shape(
    {
      id: PropTypes.number.isRequired,
      pathPicture: PropTypes.string.isRequired,
    },
  )).isRequired,
  deletePictureEstablishment: PropTypes.func.isRequired,
  isDeletePictureEstablishmentLoading: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
};

export default EstablishmentPicturesUpload;
