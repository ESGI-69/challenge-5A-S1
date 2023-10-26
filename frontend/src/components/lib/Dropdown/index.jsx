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

function DropdownButton({ children, ...rest }) {
  const { toggleDropdown } = useDropdown();
  return (
    <div
      className={styles.dropdownButton}
      onClick={toggleDropdown}
      {...rest}
    >
      {children}
    </div>
  );
}
DropdownButton.propTypes = {
  children: PropTypes.node.isRequired,
};

function DropdownItem({ children, ...rest }) {
  const { toggleDropdown } = useDropdown();
  const handleClick = () => {
    toggleDropdown();
  };
  return (
    <div className={styles.dropdownListItem} onClick={() => handleClick()} {...rest}>
      {children}
    </div>
  );
}
DropdownItem.propTypes = {
  children: PropTypes.node.isRequired,
};

function DropdownList({ children, ...rest }) {
  const { isOpened } = useDropdown();
  if (!isOpened) return null;
  return (
    <div className={styles.dropdownList} {...rest}>
      {children}
    </div>
  );
}
DropdownList.propTypes = {
  children: PropTypes.node.isRequired,
};

function Dropdown({ children }) {
  const [ isOpened, setIsOpened ] = useState(false);
  const ref = useRef();

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
      <div ref={ref} className={styles.dropdown}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
}
Dropdown.propTypes = {
  children: PropTypes.node.isRequired,
};

export {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownList,
};
