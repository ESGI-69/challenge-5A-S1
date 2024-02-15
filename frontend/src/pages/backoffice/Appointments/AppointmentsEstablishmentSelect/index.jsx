import { ProfileContext } from '@/contexts/ProfileContext';
import { EstablishmentContext } from '@/contexts/api/EstablishmentContext';
import { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

export default function AppointmentsEstablishmentSelect({ onChange }) {
  const { establishments, isEstablishmentsLoading, get } = useContext(EstablishmentContext);
  const { profile } = useContext(ProfileContext);

  useEffect(() => {
    // Settting the first establishment as default
    onChange(establishments[0]?.id);
  }, [ establishments ]);
  useEffect(() => {
    // Getting the establishments of the company
    get({ 'company.id': profile.company.id });
  }, []);

  return (
    <div>
      <select className={styles.Select} onChange={(e) => onChange(e.target.value)}>
        {isEstablishmentsLoading && <option>Loading...</option>}
        {!isEstablishmentsLoading && establishments.map((esta) => (
          <option key={esta.id} value={esta.id}>
            {esta.street}
          </option>
        ))}
      </select>
    </div>
  );
}

AppointmentsEstablishmentSelect.propTypes = {
  onChange: PropTypes.func,
};
