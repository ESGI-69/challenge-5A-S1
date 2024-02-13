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
import Gallery from '@/components/Gallery';
import SearchBar from '@/components/SearchBar';
import OpeningHours from '@/components/OpeningHours';
import PTable from '@/components/lib/PTable';
import Checkbox from '@/components/lib/Checkbox';
import Popin from '@/components/Popin';
import Map from '@/components/Map';
import EstablishmentCard from '@/components/Search/EstablishmentCard';
import { useState } from 'react';
import EntityTable, { EntityTableFooter } from '@/components/lib/EntityTable';
import UserProvider, { UserContext } from '@/contexts/api/UserContext';

const clickableEmail = ({ value }) => (
  <a href={`mailto:${value}`} style={{ textDecoration: 'underline' }}>{value}</a>
);

const DATA_TEMPLATE = {
  properties: {
    id: {
      readOnly: true,
      type: 'integer',
      width: '50px',
    },
    email: {
      name: 'Email',
      type: 'string',
      component: clickableEmail,
    },
    firstname: {
      name: 'Prénom',
      type: 'string',
      width: '120px',
    },
    lastname: {
      name: 'Nom',
      type: 'string',
      width: '120px',
    },
    phonenumber: {
      name: 'Téléphone',
      type: 'string',
      nullable: true,
      width: '130px',
    },
    roles: {
      name: 'Rôles',
      type: 'array',
    },
  },
};

const DATA = [
  {
    id: 1,
    email: 'admin@gmail.com',
    roles: [ 'ROLE_ADMIN', 'ROLE_USER' ],
    firstname: 'Toto',
    lastname: 'Titi',
    phonenumber: '0123456789',
  },
  {
    id: 2,
    email: 'user@gmail.com',
    roles: [ 'ROLE_USER' ],
    firstname: 'Tutu',
    lastname: 'Tata',
    phonenumber: '0123456789',
  },
  {
    id: 3,
    email: 'user2@gmail.com',
    roles: [ 'ROLE_USER' ],
    firstname: 'Tete',
    lastname: 'Toto',
    phonenumber: '0123456789',
  },
];
export default function Library() {
  const [ popinIsOpen, setPopinIsOpen ] = useState(false);

  const openPopin = () => {
    setPopinIsOpen(true);
  };

  const closePopin = () => {
    setPopinIsOpen(false);
  };

  return (
    <main style={{
      margin: '0 auto',
      maxWidth: '90vw',
    }}>
      <h1>Library</h1>
      <h2>Table</h2>
      <h3>PTable</h3>
      <PTable template={DATA_TEMPLATE} data={DATA}></PTable>
      <h3>Entity Table (auto managed)</h3>
      {/* <UserProvider>
        <EntityTable entity="User" entityContext={UserContext}>
          <EntityTableFooter></EntityTableFooter>
        </EntityTable>
      </UserProvider> */}

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

      <h2>Checkbox</h2>
      <Checkbox />

      <h2>Tabs</h2>
      <h3>default</h3>
      <Tabs defaultTab="tab1">
        <TabsList>
          <Tab value="tab1">Premiere Tab</Tab>
          <Tab value="tab2" count={2}>Deuxieme Tab</Tab>
          <Tab value="tab3">Troisième Tab</Tab>
        </TabsList>
        <TabContent value="tab1">
          <span>
            Tab 1 content
          </span>
        </TabContent>
        <TabContent value="tab2">
          <span>
            Tab 2 content
          </span>
        </TabContent>
        <TabContent value="tab3">
          <span>
            Tab 3 content
          </span>
        </TabContent>
      </Tabs >

      <h3>big</h3>
      <Tabs defaultTab="tab1" variant="big">
        <TabsList>
          <Tab value="tab1">Premiere Tab</Tab>
          <Tab value="tab2" count={2}>Deuxieme Tab</Tab>
          <Tab value="tab3">Troisième Tab</Tab>
        </TabsList>
        <TabContent value="tab1">
          <span>
            Tab 1 content
          </span>
        </TabContent>
        <TabContent value="tab2">
          <span>
            Tab 2 content
          </span>
        </TabContent>
        <TabContent value="tab3">
          <span>
            Tab 3 content
          </span>
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
      <Dropdown direction='tl'>
        <DropdownButton>
          <Button>Dropdown</Button>
        </DropdownButton>
        <DropdownList>
          <DropdownItem>Item 1</DropdownItem>
          <DropdownItem>Item 2</DropdownItem>
          <DropdownItem>Item 3</DropdownItem>
        </DropdownList>
      </Dropdown>
      <Dropdown direction='tr'>
        <DropdownButton>
          <Button>Dropdown</Button>
        </DropdownButton>
        <DropdownList>
          <DropdownItem>Item 1</DropdownItem>
          <DropdownItem>Item 2</DropdownItem>
          <DropdownItem>Item 3</DropdownItem>
        </DropdownList>
      </Dropdown>
      <Dropdown direction='bl'>
        <DropdownButton>
          <button>zob</button>
        </DropdownButton>
        <DropdownList>
          <DropdownItem>Item 1</DropdownItem>
          <DropdownItem>Item 2</DropdownItem>
          <DropdownItem>Item 3</DropdownItem>
        </DropdownList>
      </Dropdown>
      <Dropdown direction='br'>
        <DropdownButton>
          <Button>Dropdown</Button>
        </DropdownButton>
        <DropdownList>
          <DropdownItem>Item 1</DropdownItem>
          <DropdownItem>Item 2</DropdownItem>
          <DropdownItem>Item 3</DropdownItem>
        </DropdownList>
      </Dropdown>

      <h2>Notation/GlobalNotation</h2>
      <GlobalNotation />

      {/* <h2>Notation/Review</h2>
      <Review
        authorName="Jean"
        content="Monique et son équipe sont tres avenantes, très à l'écoute. Très fortes de conseils. Bravo à Monique qui pilote son bateau."
        date={new Date().toLocaleDateString()}
        note={5}
      /> */}

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
      {/* <ServicesTable
        type="Coiffures"
        description="Retrouvez toutes nos coiffures ici, les coiffures pour tout les styles blo bli blou, ahaha !!"
        services={[
          {
            id: 1,
            name: 'Coiffure 1',
            description: 'Description de la coiffure 1 Description de la coiffure 1 Description de la coiffure 1 Description de la coiffure 1 Description de la coiffure 1',
            duration: 30,
            price: 30,
          },
          {
            id: 2,
            name: 'Coiffure 2',
            description: 'Description de la coiffure 2',
            duration: 60,
            price: 60,
          },
          {
            id: 3,
            name: 'Coiffure 3',
            description: 'Description de la coiffure 3',
            duration: 90,
            price: 90,
          },
          {
            id: 4,
            name: 'Coiffure 4',
            description: 'Description de la coiffure 4',
            duration: 120,
            price: 120,
          },
          {
            id: 5,
            name: 'Coiffure 5',
            description: 'Description de la coiffure 5',
            duration: 150,
            price: 150,
          },
          {
            id: 6,
            name: 'Coiffure 6',
            description: 'Description de la coiffure 6',
            duration: 180,
            price: 180,
          },
        ]}
      /> */}
      <h2>Gallery</h2>
      {/* <Gallery>
        <img src="https://picsum.photos/seed/1/534/300" alt="random" />
        <img src="https://picsum.photos/seed/2/534/300" alt="random" />
        <img src="https://picsum.photos/seed/3/534/300" alt="random" />
        <img src="https://picsum.photos/seed/5/534/300" alt="random" />
        <img src="https://picsum.photos/seed/3/534/300" alt="random" />
        <img src="https://picsum.photos/seed/4/534/300" alt="random" />
        <img src="https://picsum.photos/seed/3/534/300" alt="random" />
      </Gallery> */}

      <h2>SearchBar</h2>
      {/* <SearchBar /> */}
      <h2>Popin</h2>
      <Button variant="black" onClick={openPopin}>Ouvrir la popin</Button>
      {popinIsOpen && (
        <Popin onClose={closePopin}>
          <h2>popin</h2>
          <p>Contenu de la popin </p>
        </Popin>
      )}

      <h2>OpeningHour</h2>
      {/* <OpeningHours value={[
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
      ]} /> */}

      <h2>Map</h2>
      {/* <Map position={[ 48.8665, 2.3335 ]} markers={[
        {
          position: [ 48.867119, 2.376592 ],
          popup: 'Popup 1',
        },
        {
          position: [ 48.850178, 2.32784 ],
          popup: 'Popup 2',
        },
        {
          position: [ 48.846789,  2.375905 ],
          popup: 'Popup 3',
        },
      ]}
      zoomLevel={13}
      /> */}

      <h2>EstablishmentCard</h2>
      {/* <EstablishmentCard
        picturePath="https://picsum.photos/seed/1/534/300"
        name="Monique Coiffure"
        adress="12 rue de la paix"
        city="Paris"
        zipCode="75000"
        reviewsNumber={2}
        globalReview={3}
      /> */}

    </main>
  );
}
