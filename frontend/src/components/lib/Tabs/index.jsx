import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

import tabsStyles, { tabs } from '@/components/lib/Tabs/tabs.module.scss';
import tabStyles, { count as countClass, tab } from '@/components/lib/Tabs/tab.module.scss';

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
}) {
  const [ currentTab, setCurrentTab ] = useState(defaultTab);
  const switchTab = (tab) => {
    setCurrentTab(tab);
  };

  return (
    <div className={tabs}>
      <TabsContext.Provider
        value={{
          currentTab,
          switchTab,
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
};

function Tab({
  children,
  value,
  count,
}) {
  const { currentTab, switchTab } = useTabs();
  const tabClasses = `${tab} ${currentTab === value ? tabStyles['tab--active'] : ''}`;
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
        <span className={countClass}>
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
  const { currentTab } = useTabs();

  if (currentTab === value) {
    return <div className={tabsStyles['tabs__content']}>{children}</div>;
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
  return (
    <div className={tabsStyles['tabs__items']}>
      {children}
    </div>
  );
}

TabsList.propTypes = {
  children: PropTypes.node.isRequired,
};

export { Tabs, Tab, TabContent, TabsList };
