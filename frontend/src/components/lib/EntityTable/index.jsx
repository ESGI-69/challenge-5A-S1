import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import PTable from '../PTable';
import Button from '../Button';
import { Chevron } from '../Icons';
import styles from '../PTable/PTable.module.scss';

const EntityTableContext = createContext({});

function useEntityTable() {
  const entityTableContext = useContext(EntityTableContext);
  if (!entityTableContext) {
    throw new Error(
      'Compound component must be rendered within the EntityTable component.',
    );
  }
  return entityTableContext;
}

export function EntityTableFooter() {
  const { data } = useEntityTable();
  return (
    <div className={styles.TableFooter}>
      <span className={styles.TableFooterResult}>
        <span className={styles.TableFooterResultNumber}>{data.length}</span>
        <span>résultats</span>
      </span>
      <div className={styles.TableFooterPagination}>
        <Button variant="secondary" size="small">
          <Chevron style={{
            transform: 'rotate(90deg)',
            height: '10px',
          }} />
          <span>Précédent</span>
        </Button>
        <Button variant="secondary" size="small">1</Button>
        <Button variant="black" size="small">2</Button>
        <Button variant="secondary" size="small">3</Button>
        <Button variant="secondary" size="small">
          <span>Suivant</span>
          <Chevron style={{
            transform: 'rotate(-90deg)',
            height: '10px',
          }} />
        </Button>
      </div>
    </div>
  );
}

// mock
function getEntityDoc(entity) {
  return {
    name: 'users',
    properties: {
      id: {
        name: '#',
        readOnly: true,
        type: 'integer',
        width: '50px',
      },
      email: {
        name: 'Email',
        type: 'string',
      },
      firstname: {
        name: 'Prénom',
        type: 'string',
        width: '120px',
      },
    },
  };
}

function getData() {
  return [
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
  ];
}

export default function EntityTable({ entity, entityContext }) {
  const entityDoc = useMemo(() => getEntityDoc(entity), [ entity ]);
  const [ data, setData ] = useState(() => getData());
  const ENTITY = useContext(entityContext);
  useEffect(() => {
    ENTITY.get();
  }, []);
  const handleDelete = (id) => {
    // delete in data
  };
  const handleModify = (id) => {
    // open dialog and save
  };
  const handleOnSelect = (ids) => {
    // handle selection
  };
  const handlePreviousPage = () => {
    console.log(ENTITY.users);
    // previous page
  };
  const handleNextPage = () => {
    // next page
  };
  return (
    <EntityTableContext.Provider value={{
      data,
    }}>
      <PTable
        template={entityDoc}
        data={ENTITY[entityDoc.name].data}
        pagination
        selectable
        onDelete={(id) => handleDelete(id)}
        onModify={(id) => handleModify(id)}
        onSelect={(ids) => handleOnSelect(ids)}
        onPagePrevious={() => handlePreviousPage()}
        onPageNext={() => handleNextPage()}>
      </PTable>
    </EntityTableContext.Provider>
  );
}
