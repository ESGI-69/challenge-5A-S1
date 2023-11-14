import { useState } from 'react';
import styles from './PTable.module.scss';

export default function PTable({ selectable, onSelect }) {
  const [ selected, setSelected ] = useState([]);

  const filters = [
    {
      name: 'page',
      in: 'query',
      description: 'The collection page number',
      required: false,
      deprecated: false,
      allowEmptyValue: true,
      schema: {
        type: 'integer',
        default: 1,
      },
      style: 'form',
      explode: false,
      allowReserved: false,
    },
    {
      name: 'name',
      in: 'query',
      description: '',
      required: false,
      deprecated: false,
      allowEmptyValue: true,
      schema: {
        type: 'string',
      },
      style: 'form',
      explode: false,
      allowReserved: false,
    },
    {
      name: 'email',
      in: 'query',
      description: '',
      required: false,
      deprecated: false,
      allowEmptyValue: true,
      schema: {
        type: 'string',
      },
      style: 'form',
      explode: false,
      allowReserved: false,
    },
  ];

  const template = {
    properties: {
      id: {
        readOnly: true,
        type: 'integer',
      },
      employee: {
        type: 'string',
        format: 'iri-reference',
      },
      establishment: {
        type: 'string',
        format: 'iri-reference',
      },
      service: {
        type: 'string',
        format: 'iri-reference',
      },
      client: {
        type: 'string',
        format: 'iri-reference',
      },
      startDate: {
        type: 'string',
        format: 'date-time',
      },
      endDate: {
        type: 'string',
        format: 'date-time',
      },
      comment: {
        type: 'string',
        nullable: true,
      },
      cancelledAt: {
        type: 'string',
        format: 'date-time',
        nullable: true,
      },
      price: {
        type: 'number',
        nullable: true,
      },
    },
  };

  const data = [
    {
      id: 1,
      employee: '/api/employees/1',
      establishment: '/api/establishments/1',
      service: '/api/services/1',
      client: '/api/clients/1',
      startDate: '2021-06-22T14:00:00+02:00',
      endDate: '2021-06-22T14:30:00+02:00',
      comment: 'Commentaire',
      cancelledAt: null,
      price: 30,
    },
    {
      id: 2,
      employee: '/api/employees/2',
      establishment: '/api/establishments/1',
      service: '/api/services/2',
      client: '/api/clients/2',
      startDate: '2021-06-22T14:00:00+02:00',
      endDate: '2021-06-22T14:30:00+02:00',
      comment: 'Commentaire',
      cancelledAt: null,
      price: 30,
    },
  ];

  return (
    <div className={styles.Table}>
      <div className={styles.TableHeader}>
        {selectable && (
          <div>
            <input type="checkbox" />
          </div>
        )}
        {Object.keys(template.properties).map((propKey) => (
          <div className={styles.TableHeaderCell} key={propKey}>
            <span>{propKey}</span>
          </div>
        ))}
      </div>
      <div className={styles.TableBody}>
        {data.map((item) => (
          <div className={styles.TableBodyRow} key={item.id}>
            {selectable && (
              <div>
                <input type="checkbox" />
              </div>
            )}
            {Object.keys(template.properties).map((propKey) => (
              <div className={styles.TableBodyRowCell} key={propKey}>
                <span>{item[propKey]}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
