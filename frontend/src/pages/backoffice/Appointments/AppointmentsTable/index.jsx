import PTable from '@/components/lib/PTable';
import { ProfileContext } from '@/contexts/ProfileContext';
import { AppointmentContext } from '@/contexts/api/AppointmentContext';
import { EstablishmentContext } from '@/contexts/api/EstablishmentContext';
import { useTranslation } from 'react-i18next';
import { useContext, useEffect, useState } from 'react';

export default function AppointmentsTable() {
  const { getEstablishmentAppointments, establishmentAppointments, isEstablishmentAppointmentsLoading } = useContext(AppointmentContext);
  const { establishments, isEstablishmentLoading, get } = useContext(EstablishmentContext);
  const { profile } = useContext(ProfileContext);
  const [ establishmentId, setEstablishmentId ] = useState(null);
  const { t } = useTranslation('base');

  useEffect(() => {
    setEstablishmentId(establishments[0]?.id);
    if (establishmentId) {
      getEstablishmentAppointments(establishmentId);
    }
  }, [ establishmentId, establishments ]);
  useEffect(() => {
    // Getting the establishments of the company
    get({ 'company.id': profile.company.id });
  }, []);

  const DATA_TEMPLATE = {
    properties: {
      id: {
        width: '50px',
      },
      employee: {
        name: 'Employé(e)',
        width: '120px',
        component: ({ value }) => <span>{value.firstname}</span>,
      },
      client: {
        name: 'Client(e)',
        width: '120px',
        component: ({ value }) => <span>{value.firstname}</span>,
      },
      service: {
        name: 'Service',
        width: '300px',
        component: ({ value }) => <>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
            <span>{value.name}</span>
            <span>{value.price}€</span>
          </div>
          <small>({value.duration}mins)</small>
        </>,
      },
      startDate: {
        name: 'Date de début',
        width: '200px',
        component: ({ value }) => {
          const date = new Date(value);
          const formattedDate = date.toLocaleDateString();
          const formattedTime = date.toLocaleTimeString();
          return (
            <span>
              {formattedDate} <b>{formattedTime}</b>
            </span>
          );
        },
      },
      comment: {
        name: 'Commentaire',
      },
    },
  };

  return (
    <section>
      <select onChange={(e) => setEstablishmentId(e.target.value)}>
        {establishments.map((esta) => (
          <option key={esta.id} value={esta.id}>
            {esta.street}
          </option>
        ))}
      </select>
      <PTable
        template={DATA_TEMPLATE}
        data={establishmentAppointments}
        loading={isEstablishmentAppointmentsLoading}
        actions={[
          {
            name: t('table.actions.edit'),
          },
          {
            name: t('table.actions.delete'),
          },
        ]}
      />
    </section>
  );
}
