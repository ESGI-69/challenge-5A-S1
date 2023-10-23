import { useState } from 'react';
import reactLogo from '@/assets/react.svg';
import viteLogo from '/vite.svg';
import '@/App.css';
import { Tabs, Tab, TabContent, TabsList } from '@/components/lib/Tabs';
import { useTranslation } from 'react-i18next';
import LanguageSwticher from '@/components/LanguageSwitcher';
import Input from '@/components/lib/Input';

function App() {
  const { t } = useTranslation('main');
  const [ count, setCount ] = useState(0);
  const [ inputValue, setInputValue ] = useState('');
  const handleInputChange = (value) => {
    setInputValue(value);
  };

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
      <Tabs defaultTab="tab1">
        <TabsList>
          <Tab value="tab1">Premiere Tab</Tab>
          <Tab value="tab2" count={2}>Deuxieme Tab</Tab>
          <Tab value="tab3">Troisième Tab</Tab>
        </TabsList>
        <TabContent value="tab1">
          <p>
            Tab 1 content
          </p>
        </TabContent>
        <TabContent value="tab2">
          <p>
            Tab 2 content
          </p>
        </TabContent>
        <TabContent value="tab3">
          <p>
            Tab 3 content
          </p>
        </TabContent>
      </Tabs >
    </>
  );
}

export default App;
