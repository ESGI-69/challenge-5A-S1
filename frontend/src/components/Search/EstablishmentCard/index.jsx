import PropTypes from 'prop-types';
import styles from './EstablishmentCard.module.scss';
// import { useTranslation } from 'react-i18next';
import Star from '@/components/lib/Icons/Star';
import Shop from '@/components/lib/Icons/Shop';
import { Link } from 'react-router-dom';
import { addDigit } from '@/utils/formater/note';

const EstablishmentCard = ({
  id,
  picturePath = 'https://placehold.co/600x400',
  name,
  adress,
  globalReview = 0,
  reviewsNumber,
  zipCode,
  city,
}) => {
  console.log(picturePath);
  return (
    <Link to={`/establishment/${id}`} className={styles.Card}>
      <img src={(picturePath)} className={styles.CardPicture}/>
      <div className={styles.CardContent}>
        <div className={styles.CardContentName}>
          {name} - {city}
        </div>
        <div className={styles.CardContentAdress}>
          <Shop />
          {` ${adress}, ${zipCode} ${city}`}
        </div>
        <div className={styles.CardContentReview}>
          <Star className={styles.CardContentReviewStar}/>
          {` ${addDigit(globalReview)} (${reviewsNumber} avis)`}
        </div>
      </div>
    </Link>
  );};

EstablishmentCard.propTypes = {
  id: PropTypes.number.isRequired,
  picturePath: PropTypes.string,
  name: PropTypes.string.isRequired,
  adress: PropTypes.string.isRequired,
  globalReview: PropTypes.number,
  reviewsNumber: PropTypes.number.isRequired,
  zipCode: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
};

export default EstablishmentCard;
