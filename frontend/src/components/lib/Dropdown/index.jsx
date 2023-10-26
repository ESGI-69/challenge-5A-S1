import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useRef, useState } from 'react';

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
    <button
      onClick={toggleDropdown}
      {...rest}
    >
      {children}
    </button>
  );
}
DropdownButton.propTypes = {
  children: PropTypes.node.isRequired,
};

function DropdownItem({ children, ...rest }) {
  return (
    <a className="dropdown-item" {...rest}>
      {children}
    </a>
  );
}
DropdownItem.propTypes = {
  children: PropTypes.node.isRequired,
};

function DropdownList({ children, ...rest }) {
  const { isOpened } = useDropdown();
  if (!isOpened) return null;
  return (
    <div className="dropdown" {...rest}>
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
      <div ref={ref}>
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
