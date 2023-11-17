import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './PTable.module.scss';
import Checkbox from '@/components/lib/Checkbox';
import { Dropdown, DropdownButton, DropdownItem, DropdownList } from '@/components/lib/Dropdown';
import { Chevron, Dots } from '@/components/lib/Icons';
import Button from '../Button';

export default function PTable({ template, data, selectable, onSelect, onModify, onDelete }) {
  const [ selected, setSelected ] = useState(new Set());
  const selectAllState = useMemo(() => {
    if (selected.size === 0) {
      return 0;
    }
    if (selected.size === data.length) {
      return 1;
    }
    return 2;
  }, [ selected, data ]);

  useEffect(() => {
    if (onSelect) {
      onSelect(selected);
    }
  }, [ selected, onSelect ]);

  const handleSelectAllChange = () => {
    if (selected.size === data.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(data.map((item) => item.id)));
    }
  };

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

  return (
    <div className={styles.Table}>
      <div className={styles.TableWrapper}>
        <div className={styles.TableScroller}>
          <div className={styles.TableHeader}>
            {selectable && (
              <div>
                <Checkbox value={selectAllState} onChange={handleSelectAllChange} />
              </div>
            )}
            {Object.keys(template?.properties).map((propKey) => (
              <div
                key={propKey}
                className={styles.TableHeaderCell}
                style={{
                  width: template?.properties[propKey].width,
                  minWidth: template?.properties[propKey].width,
                  maxWidth: template?.properties[propKey].width,
                }}
              >
                <span>{template?.properties[propKey].name ?? propKey}</span>
              </div>
            ))}
            <div className={styles.TableBodyRowActions}></div>
          </div>
          <div className={styles.TableBody}>
            {data.map((item) => (
              <div
                className={`${styles.TableBodyRow} ${selected.has(item.id) ? styles.TableBodyRow_Selected : ''}`}
                key={item.id}
              >
                {selectable && (
                  <div className={styles.TableBodySelector}>
                    <Checkbox value={selected.has(item.id)} onChange={(checked) => setSelected((set) => {
                      checked ? set.add(item.id) : set.delete(item.id);
                      return new Set(set);
                    })} />
                  </div>
                )}
                {Object.keys(template?.properties).map((propKey) => (
                  <div
                    key={propKey}
                    className={styles.TableBodyRowCell}
                    style={{
                      width: template?.properties[propKey].width,
                    }}
                  >
                    {template?.properties[propKey].component && React.createElement(
                      template?.properties[propKey].component,
                      {
                        value: item[propKey],
                      },
                      item[propKey],
                    )}
                    {!template?.properties[propKey].component && <span>{item[propKey]}</span>}
                  </div>
                ))}
                <div className={styles.TableBodyRowActions}>
                  <Dropdown direction='br'>
                    <DropdownButton>
                      <div className={styles.TableBodyRowActionsButton}>
                        <Dots />
                      </div>
                    </DropdownButton>
                    <DropdownList style={{
                      top: 0,
                      right: 'calc(100% + 8px)',
                    }}>
                      <DropdownItem onClick={() => onModify(item.id)}>Modifier</DropdownItem>
                      <DropdownItem onClick={() => onDelete(item.id)}>Supprimer</DropdownItem>
                    </DropdownList>
                  </Dropdown>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
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
    </div>
  );
}

PTable.propTypes = {
  selectable: PropTypes.bool,
  template: PropTypes.object.isRequired,
  onSelect: PropTypes.func,
  onModify: PropTypes.func,
  onDelete: PropTypes.func,
  data: PropTypes.arrayOf(PropTypes.object),
};
