import PTable from '@/components/lib/PTable';
import { AppointmentContext } from '@/contexts/api/AppointmentContext';
import { useTranslation } from 'react-i18next';
import { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function AppointmentsTable({ establishmentId }) {
  const { getEstablishmentAppointments, establishmentAppointments, isEstablishmentAppointmentsLoading } = useContext(AppointmentContext);
  const { t } = useTranslation('base');

  useEffect(() => {
    if (establishmentId) {
      getEstablishmentAppointments(establishmentId);
    }
  }, [ establishmentId ]);

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

AppointmentsTable.propTypes = {
  establishmentId: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
};
