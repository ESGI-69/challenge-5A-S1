import Button from '@/components/lib/Button';
import Input from '@/components/lib/Input';
import { Link } from 'react-router-dom';
import Tag from '@/components/lib/Tag';
import { Tab, TabContent, Tabs, TabsList } from '@/components/lib/Tabs';
import { Dropdown, DropdownButton, DropdownItem, DropdownList } from '@/components/lib/Dropdown';
import GlobalNotation from '@/components/Notation/GlobalNotation';
import Review from '@/components/Notation/Review';
import Note from '@/components/Notation/Note';
import ServicesTable from '@/components/Services/ServicesTable';
import Gallery from '@/components/lib/Gallery';
import SearchBar from '@/components/SearchBar';
import OpeningHours from '@/components/OpeningHours';

export default function Library() {
  return (
    <main style={{
      margin: '0 auto',
      maxWidth: '90vw',
    }}>
      <h1>Library</h1>

      <h2>Button</h2>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="black">Black</Button>
      <Button variant="success">Button</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="warning">Warning</Button>

      <h3>isPlain</h3>
      <Button isPlain variant="primary">Primary</Button>
      <Button isPlain variant="secondary">Secondary</Button>
      <Button isPlain variant="black">Black</Button>
      <Button isPlain variant="success">Button</Button>
      <Button isPlain variant="danger">Danger</Button>
      <Button isPlain variant="warning">Warning</Button>

      <h3>size=large</h3>
      <Button size="large" variant="primary">Primary</Button>
      <Button size="large" variant="secondary">Secondary</Button>
      <Button size="large" variant="black">Black</Button>
      <Button size="large" variant="success">Button</Button>
      <Button size="large" variant="danger">Danger</Button>
      <Button size="large" variant="warning">Warning</Button>

      <h2>Input</h2>
      <h3>default</h3>
      <Input placeholder="Placeholder" />
      <h3>no-border</h3>
      <Input variant="no-border" placeholder="Placeholder" />
      <h3>default disabled</h3>
      <Input placeholder="Placeholder" disabled />
      <h3>no-border disabled</h3>
      <Input variant="no-border" placeholder="Placeholder" disabled />

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

      <h2>Services Table</h2>
      <ServicesTable
        type="Coiffures"
        description="Retrouvez toutes nos coiffures ici, les coiffures pour tout les styles blo bli blou, ahaha !!"
        services={[
          {
            id: 1,
            name: 'Coiffure 1',
            description: 'Description de la coiffure 1 Description de la coiffure 1 Description de la coiffure 1 Description de la coiffure 1 Description de la coiffure 1',
            icon: '👩‍🦰',
            duration: 30,
            price: 30,
          },
          {
            id: 2,
            name: 'Coiffure 2',
            description: 'Description de la coiffure 2',
            icon: '👩‍🦳',
            duration: 60,
            price: 60,
          },
          {
            id: 3,
            name: 'Coiffure 3',
            description: 'Description de la coiffure 3',
            icon: '👩‍🦱',
            duration: 90,
            price: 90,
          },
          {
            id: 4,
            name: 'Coiffure 4',
            description: 'Description de la coiffure 4',
            icon: '👩‍🦲',
            duration: 120,
            price: 120,
          },
        ]}
      />
      <h2>Gallery</h2>
      <Gallery>
        <img src="https://picsum.photos/seed/1/534/300" alt="random" />
        <img src="https://picsum.photos/seed/2/534/300" alt="random" />
        <img src="https://picsum.photos/seed/3/534/300" alt="random" />
        <img src="https://picsum.photos/seed/3/534/300" alt="random" />
        <img src="https://picsum.photos/seed/3/534/300" alt="random" />
        <img src="https://picsum.photos/seed/3/534/300" alt="random" />
        <img src="https://picsum.photos/seed/3/534/300" alt="random" />
      </Gallery>

      <h2>SearchBar</h2>
      <SearchBar />

      <h2>OpeningHour</h2>
      <OpeningHours value={[
        { startTime: '2023-11-07T15:37:45+01:00', endTime: '2023-11-07T16:37:45+01:00' },
        { startTime: '2023-11-07T13:37:45+01:00', endTime: '2023-11-07T14:37:45+01:00' },
        { startTime: '2023-11-08T13:37:45+01:00', endTime: '2023-11-08T14:37:45+01:00' },
        { startTime: '2023-11-08T15:37:45+01:00', endTime: '2023-11-08T16:37:45+01:00' },
        { startTime: '2023-11-09T13:37:45+01:00', endTime: '2023-11-09T14:37:45+01:00' },
        { startTime: '2023-11-09T15:37:45+01:00', endTime: '2023-11-09T16:37:45+01:00' },
        { startTime: '2023-11-10T13:37:45+01:00', endTime: '2023-11-10T14:37:45+01:00' },
        { startTime: '2023-11-10T15:37:45+01:00', endTime: '2023-11-10T16:37:45+01:00' },
        { startTime: '2023-11-11T13:37:45+01:00', endTime: '2023-11-11T14:37:45+01:00' },
        { startTime: '2023-11-11T15:37:45+01:00', endTime: '2023-11-11T16:37:45+01:00' },
      ]} />

    </main>
  );
}
