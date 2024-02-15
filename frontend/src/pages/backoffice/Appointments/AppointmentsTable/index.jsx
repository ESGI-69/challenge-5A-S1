import PTable from '@/components/lib/PTable';
import { AppointmentContext } from '@/contexts/api/AppointmentContext';
import { useTranslation } from 'react-i18next';
import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import Button from '@/components/lib/Button';
import styles from './styles.module.scss';

export default function AppointmentsTable({ establishmentId }) {
  const {
    getEstablishmentAppointments,
    establishmentAppointments,
    isEstablishmentAppointmentsLoading,
    cancelAppointment: cancelAppointmentAPI,
  } = useContext(AppointmentContext);
  const { t } = useTranslation('backofficeAppointments');
  const [ isCancelModalOpen, setIsCancelModalOpen ] = useState(false);
  const [ appointmentToCancel, setAppointmentToCancel ] = useState(null);

  const handleCancelAppointment = (id) => {
    setIsCancelModalOpen(true);
    setAppointmentToCancel(id);
  };

  const cancelAppointment = async () => {
    setIsCancelModalOpen(false);
    await cancelAppointmentAPI(appointmentToCancel);
    getEstablishmentAppointments(establishmentId);
  };

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
        name: t('table.titles.employee'),
        width: '120px',
        component: ({ value }) => <span>{value.firstname}</span>,
      },
      client: {
        name: t('table.titles.client'),
        width: '120px',
        component: ({ value }) => <span>{value.firstname}</span>,
      },
      service: {
        name: t('table.titles.service'),
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
        name: t('table.titles.date'),
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
        name: t('table.titles.comment'),
      },
      cancelledAt: {
        name: t('table.titles.cancelledAt'),
        component: ({ value }) => {
          if (value) {
            const date = new Date(value);
            const formattedDate = date.toLocaleDateString();
            const formattedTime = date.toLocaleTimeString();
            return (
              <span>
                {formattedDate} <b>{formattedTime}</b>
              </span>
            );
          }
          return <span></span>;
        },
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
            name: t('table.actions.cancel'),
            onClick: (item) => {
              handleCancelAppointment(item.id);
            },
          },
        ]}
      />
      <Modal isOpen={isCancelModalOpen} className={styles.Cancelmodal} ariaHideApp={false}>
        <h3>Voulez vous annulez le RDV ?</h3>
        <p>Le client sera prévenu par mail.</p>
        <div className={styles.CancelmodalActions}>
          <Button variant="danger" onClick={() => cancelAppointment()}>Oui</Button>
          <Button onClick={() => setIsCancelModalOpen(false)}>Non</Button>
        </div>
      </Modal>
    </section >
  );
}

AppointmentsTable.propTypes = {
  establishmentId: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
};
