import BackofficeHeader from '@/components/BackofficeHeader';
import AppointmentProvider from '@/contexts/api/AppointmentContext';
import AppointmentsTable from './AppointmentsTable';
import EstablishmentProvider from '@/contexts/api/EstablishmentContext';

export default function Appointments() {
  return (
    <div>
      <BackofficeHeader>
        <h1>Appointments</h1>
      </BackofficeHeader>
      <EstablishmentProvider>
        <AppointmentProvider>
          <AppointmentsTable />
        </AppointmentProvider>
      </EstablishmentProvider>

    </div>
  );
}
