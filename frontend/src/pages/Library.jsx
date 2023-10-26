import Button from '@/components/lib/Button';
import Input from '@/components/lib/Input';
import { Link } from 'react-router-dom';
import { Tab, TabContent, Tabs, TabsList } from '@/components/lib/Tabs';
import { Dropdown, DropdownButton, DropdownItem, DropdownList } from '../components/lib/Dropdown';

export default function Library() {
  return (
    <main>
      <h1>Library</h1>

      <h2>Button</h2>
      <Button variant="primary">Primary</Button>
      <Button variant="success">Success</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="warning">Warning</Button>

      <h2>Input</h2>
      <Input placeholder="Placeholder" />

      <h2>Tabs</h2>
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

      <h2>Dropdown</h2>
      <Dropdown>
        <DropdownButton>
          <Button>Dropdown</Button>
        </DropdownButton>
        <DropdownList>
          {/* Link */}
          <DropdownItem>
            <Link to="/">Home</Link>
          </DropdownItem>
          {/* Overloading style */}
          <DropdownItem style={{
            backgroundColor: 'var(--red-5)',
          }}>
            Custom style
          </DropdownItem>
          {/* Free text */}
          <DropdownItem>
            <span style={{
              color: 'var(--red-5)',
            }}>Delete</span>
          </DropdownItem>
        </DropdownList>
      </Dropdown>
      <Dropdown>
        <DropdownButton>Dropdown ▼</DropdownButton>
        <DropdownList>
          <DropdownItem>Item 1</DropdownItem>
          <DropdownItem>Item 2</DropdownItem>
          <DropdownItem>Item 3</DropdownItem>
        </DropdownList>
      </Dropdown>
    </main>
  );
}
