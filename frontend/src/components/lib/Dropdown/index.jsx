import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import styles from './Dropdown.module.scss';

const DropdownContext = createContext();

function useDropdown() {
  const dropdownContext = useContext(DropdownContext);
  if (!dropdownContext) {
    throw new Error(
      'Dropdown compound component must be rendered within the Dropdown component.',
    );
  }
  return dropdownContext;
}

function DropdownButton({ children, ...delegated }) {
  const { toggleDropdown } = useDropdown();
  return (
    <div
      className={styles.dropdownButton}
      onClick={toggleDropdown}
      {...delegated}
    >
      {children}
    </div>
  );
}
DropdownButton.propTypes = {
  children: PropTypes.node.isRequired,
};

function DropdownItem({ children, ...delegated }) {
  const { toggleDropdown } = useDropdown();
  const handleClick = () => {
    toggleDropdown();
  };
  return (
    <div className={styles.dropdownListItem} onClick={() => handleClick()} {...delegated}>
      {children}
    </div>
  );
}
DropdownItem.propTypes = {
  children: PropTypes.node.isRequired,
};

function DropdownList({ children, ...delegated }) {
  const { isOpened } = useDropdown();
  if (!isOpened) return null;
  return (
    <div className={styles.dropdownList} {...delegated}>
      {children}
    </div>
  );
}
DropdownList.propTypes = {
  children: PropTypes.node.isRequired,
};

function Dropdown({ children, direction = 'br' }) {
  const [ isOpened, setIsOpened ] = useState(false);
  const ref = useRef();

  const directionStyle = {
    tl: styles.dropdownTopLeft,
    tr: styles.dropdownTopRight,
    bl: styles.dropdownBottomLeft,
    br: styles.dropdownBottomRight,
  };

  // Clicking outside the dropdown mechanics
  useEffect(() => {
    if (isOpened) {
      const eventHandler = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsOpened(false);
        }
      };
      document.addEventListener('click', eventHandler);
      return () => {
        document.removeEventListener('click', eventHandler);
      };
    }
  }, [ isOpened ]);

  return (
    <DropdownContext.Provider value={{
      isOpened,
      toggleDropdown: () => setIsOpened(!isOpened),
    }}>
      <div ref={ref} className={`${styles.dropdown} ${directionStyle[direction]}`}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
}
Dropdown.propTypes = {
  children: PropTypes.node.isRequired,
  direction: PropTypes.oneOf([
    'tl',
    'tr',
    'bl',
    'br',
  ]),
};

export {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownList,
};
