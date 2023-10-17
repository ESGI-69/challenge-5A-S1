import { useState } from 'react';
import PropTypes from 'prop-types';
import Tab from './Tab';
import style from '@/assets/scss/tabs.module.scss';

function Tabs({
  tabs,
  onChange,
}) {
  const [ currentTab, setCurrentTab ] = useState(tabs[0].value);

  const changeCurrentTab = (value) => {
    setCurrentTab(value);
    onChange(value);
  };

  return (
    <div className={style.tabs}>
      {tabs.map((tab) => (
        <Tab
          key={tab.value}
          count={tab.count}
          onClick={() => changeCurrentTab(tab.value)}
          isActive={currentTab === tab.value}
        >
          {tab.label}
        </Tab>
      ))}
    </div>
  );
}

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    count: PropTypes.number,
  })).isRequired,
  onChange: PropTypes.func,
};

export default Tabs;
