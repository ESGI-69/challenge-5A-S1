import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
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
      className={styles.DropdownButton}
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

function DropdownItem({ children, onClick, ...delegated }) {
  const { toggleDropdown } = useDropdown();
  const handleClick = () => {
    toggleDropdown();
    onClick();
  };
  return (
    <div className={styles.DropdownListItem} onClick={() => handleClick()} {...delegated}>
      {children}
    </div>
  );
}
DropdownItem.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

function DropdownList({ children, ...delegated }) {
  const { isOpened, boundingBox, direction } = useDropdown();
  const [ directionStyle, setDirectionStyle ] = useState({});
  const ref = useRef();
  const body = document.querySelector('body');
  useEffect(() => {
    if (isOpened) {
      const calcultateStyle = ()  => ({
        tl: {
          top: boundingBox?.getBoundingClientRect().top - ref.current?.getBoundingClientRect().height,
          left: boundingBox?.getBoundingClientRect().left
                + window.scrollX
                - ref.current?.getBoundingClientRect().width
                + boundingBox?.getBoundingClientRect().width,
        },
        tr: {
          top: boundingBox?.getBoundingClientRect().top - ref.current?.getBoundingClientRect().height,
          left: boundingBox?.getBoundingClientRect().left
                + window.scrollX,
        },
        bl: {
          top: boundingBox?.getBoundingClientRect().bottom,
          left: boundingBox?.getBoundingClientRect().left
                + window.scrollX
                - ref.current?.getBoundingClientRect().width
                + boundingBox?.getBoundingClientRect().width,
        },
        br: {
          top: boundingBox?.getBoundingClientRect().bottom,
          left: boundingBox?.getBoundingClientRect().left
                + window.scrollX,
        },
      });
      setDirectionStyle(calcultateStyle());
      // Recalculating position on window resize or scroll
      const eventHandler = () => {
        setDirectionStyle(calcultateStyle());
      };
      window.addEventListener('resize', eventHandler);
      window.addEventListener('scroll', eventHandler);
      return () => {
        window.removeEventListener('resize', eventHandler);
        window.removeEventListener('scroll', eventHandler);
      };
    }
  }, [
    isOpened,
    boundingBox,
    direction,
    ref,
  ]);
  if (!isOpened) return null;
  return (
    <>
      {createPortal(
        <div
          ref={ref}
          className={styles.DropdownList}
          style={directionStyle[direction]}
          {...delegated}>
          {children}
        </div>,
        body,
      )}
    </>
  );
}
DropdownList.propTypes = {
  children: PropTypes.node.isRequired,
};

function Dropdown({ children, direction = 'br' }) {
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
      boundingBox: ref.current,
      direction,
      toggleDropdown: () => setIsOpened(!isOpened),
    }}>
      <div ref={ref} className={`${styles.Dropdown}`}>
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
