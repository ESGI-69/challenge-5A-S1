import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

import styles from './Tabs.module.scss';

const TabsContext = createContext();

function useTabs() {
  const tabsContext = useContext(TabsContext);
  if (!tabsContext) {
    throw new Error(
      'Tab compound component must be rendered within the Tabs component.',
    );
  }
  return tabsContext;
}

function Tabs({
  children,
  defaultTab,
  variant = 'default',
}) {
  const [ currentTab, setCurrentTab ] = useState(defaultTab);
  const switchTab = (tab) => {
    setCurrentTab(tab);
  };

  return (
    <div className={`${styles.Tabs} ${variant === 'big' ? styles.Tabs_Big : ''}`}>
      <TabsContext.Provider
        value={{
          currentTab,
          switchTab,
          variant,
        }}
      >
        {children}
      </TabsContext.Provider>
    </div>
  );
}

Tabs.propTypes = {
  children: PropTypes.node.isRequired,
  defaultTab: PropTypes.string.isRequired,
  variant: PropTypes.oneOf([ 'default', 'big' ]),
};

function Tab({
  children,
  value,
  count,
}) {
  const { currentTab, switchTab, variant } = useTabs();
  const tabClasses = `${styles.TabsTab} ${currentTab === value ? styles.TabsTab_Active : ''} ${variant === 'big' ? styles.TabsTab_Big : ''}`;
  const handleClick = () => {
    switchTab(value);
  };
  return (
    <button
      onClick={() => handleClick()}
      className={tabClasses}
    >
      {children}
      {count && (
        <span className={styles.TabsTabCount}>
          {count}
        </span>
      )}
    </button>
  );
}

Tab.propTypes = {
  children: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  count: PropTypes.number,
};

function TabContent({
  children,
  value,
}) {
  const { currentTab, variant } = useTabs();

  if (currentTab === value) {
    return (
      <div className={`${styles.TabsContent} ${variant === 'big' ? styles.TabsContent_Big : ''}`}>
        {children}
      </div>
    );
  }
  return null;
}

TabContent.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.string.isRequired,
};

function TabsList({
  children,
}) {
  const { variant } = useTabs();
  return (
    <div className={`${styles.TabsItems} ${variant === 'big' ? styles.TabsItems_Big : ''}`}>
      {children}
    </div>
  );
}

TabsList.propTypes = {
  children: PropTypes.node.isRequired,
};

export { Tabs, Tab, TabContent, TabsList };
