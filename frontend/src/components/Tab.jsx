import PropTypes from 'prop-types';
import styles, { tab, count as countClass } from '@/assets/scss/tab.module.scss';

function Tab({
  children,
  isActive,
  count,
  onClick,
}) {
  const tabClasses = `${tab} ${isActive ? styles['tab--active'] : ''}`;

  return (
    <button className={tabClasses} onClick={onClick}>
      {children}
      {count && (
        <span className={countClass}>
          {count}
        </span>
      )}
    </button>
  );
}

Tab.propTypes = {
  children: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  count: PropTypes.number,
  onClick: PropTypes.func.isRequired,
};

export default Tab;
