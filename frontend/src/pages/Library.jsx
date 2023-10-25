import Button from '@/components/lib/Button';
import Input from '@/components/lib/Input';
import { Link } from 'react-router-dom';
import Tag from '@/components/lib/Tag';
import { Tab, TabContent, Tabs, TabsList } from '@/components/lib/Tabs';
import { Dropdown, DropdownButton, DropdownItem, DropdownList } from '@/components/lib/Dropdown';
import GlobalNotation from '@/components/Notation/GlobalNotation';
import Review from '@/components/Notation/Review';
import Note from '@/components/Notation/Note';

export default function Library() {
  return (
    <main style={{
      margin: '0 auto',
      maxWidth: '90vw',
    }}>
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
      <Dropdown direction='bl'>
        <DropdownButton>Another dropdown ▼</DropdownButton>
        <DropdownList>
          <DropdownItem>Item 1</DropdownItem>
          <DropdownItem>Item 2</DropdownItem>
          <DropdownItem>Item 3</DropdownItem>
        </DropdownList>
      </Dropdown>

      <h2>Notation/GlobalNotation</h2>
      <GlobalNotation />

      <h2>Notation/Review</h2>
      <Review
        authorName="Jean"
        content="Monique et son équipe sont tres avenantes, très à l'écoute. Très fortes de conseils. Bravo à Monique qui pilote son bateau."
        date={new Date().toLocaleDateString()}
        note={5}
      />

      <h2>Notation/Note</h2>
      <Note value={4.2} />
      <h2>Tag</h2>
      <h3>Primary</h3>
      <Tag variant="primary">Primary</Tag>
      <h3>Success</h3>
      <Tag variant="success">Success</Tag>
      <h3>Danger</h3>
      <Tag variant="danger">Danger</Tag>
      <h3>Warning</h3>
      <Tag variant="warning">Warning</Tag>
    </main>
  );
}
