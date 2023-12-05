import PropTypes from 'prop-types';
import styles from './EstablishmentCard.module.scss';
// import { useTranslation } from 'react-i18next';
import Star from '@/components/lib/Icons/Star';
import Shop from '@/components/lib/Icons/Shop';
import { Link } from 'react-router-dom';

const EstablishmentCard = function EstablishmentCard({
  id,
  picturePath,
  name,
  adress,
  globalReview,
  reviewsNumber,
  zipCode,
  city,
},
) {
  return (
    <Link to={`/establishment/${id}`} className={styles.Card}>
      <img src={picturePath} className={styles.CardPicture}/>
      <div className={styles.CardContent}>
        <div className={styles.CardContentName}>
          {name}
        </div>
        <div className={styles.CardContentAdress}>
          <Shop />
          {` ${adress}, ${zipCode} ${city}`}
        </div>
        <div className={styles.CardContentReview}>
          <Star className={styles.CardContentReviewStar}/>
          {` ${globalReview} (${reviewsNumber} avis)`}
        </div>
      </div>
    </Link>
  );
};

EstablishmentCard.propTypes = {
  id: PropTypes.number.isRequired,
  picturePath: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  adress: PropTypes.string.isRequired,
  globalReview: PropTypes.number.isRequired,
  reviewsNumber: PropTypes.number.isRequired,
  zipCode: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
};

export default EstablishmentCard;
