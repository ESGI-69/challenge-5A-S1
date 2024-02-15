import BackofficeHeader from '@/components/BackofficeHeader';
import AppointmentProvider from '@/contexts/api/AppointmentContext';
import AppointmentsTable from './AppointmentsTable';
import EstablishmentProvider from '@/contexts/api/EstablishmentContext';
import AppointmentsCalendar from './AppointmentsCalendar';
import AppointmentsEstablishmentSelect from './AppointmentsEstablishmentSelect';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Appointments() {
  const { t } = useTranslation('backofficeAppointments');
  const [ establishmentId, setEstablishmentId ] = useState(null);
  const handleEstablishmentChange = (id) => {
    setEstablishmentId(id);
  };
  return (
    <div>
      <BackofficeHeader>
        <h1>{t('title')}</h1>
      </BackofficeHeader>
      <EstablishmentProvider>
        <AppointmentProvider>
          <AppointmentsEstablishmentSelect onChange={handleEstablishmentChange} />
          <AppointmentsCalendar establishmentId={establishmentId} />
          <AppointmentsTable establishmentId={establishmentId} />
        </AppointmentProvider>
      </EstablishmentProvider>

    </div>
  );
}
