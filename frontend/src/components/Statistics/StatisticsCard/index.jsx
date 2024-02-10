import PropTypes from 'prop-types';
import styles from './styles.module.scss';

export default function StatisticsCard({ children, type, title, number }) {
  const variantClassName = {
    dark: styles.Card_Dark,
  }[type] ?? '';
  return (
    <div className={`${styles.Card} ${variantClassName}`}>
      {title && <h3 className={styles.CardTitle}>{title}</h3>}
      {number && <span className={styles.CardNumber}>{number}</span>}
      {children}
    </div>
  );
}

StatisticsCard.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string,
  title: PropTypes.string,
  number: PropTypes.string,
};
