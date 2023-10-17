import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Tabs from './components/Tabs';
import { useTranslation } from 'react-i18next';
import LanguageSwticher from './components/LanguageSwitcher';
import Input from './components/lib/Input';

function App() {
  const { t } = useTranslation('main');
  const [ count, setCount ] = useState(0);
  const [ inputValue, setInputValue ] = useState('');
  const handleInputChange = (value) => {
    setInputValue(value);
  };
  const [ currentTab, setCurrentTab ] = useState('tab1');

  return (
    <>
      <LanguageSwticher />
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <Input id='Test' placeholder="Caca" onChange={handleInputChange} />
        <p>Input value : {inputValue} </p>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        {t('doc')}
      </p>
      {/* Tabs */}
      <Tabs onChange={setCurrentTab} tabs={[
        { value: 'tab1', label: 'Premiere tab' },
        { value: 'tab2', label: 'Deuxieme tab', count: 2 },
        { value: 'tab3', label: 'Troisième tab' },
      ]} />
      {currentTab === 'tab1' && (
        <p>
          Tab 1 content
        </p>
      )}
      {currentTab === 'tab2' && (
        <p>
          Tab 2 content
        </p>
      )}
      {currentTab === 'tab3' && (
        <p>
          Tab 3 content
        </p>
      )}
    </>
  );
}

export default App;
