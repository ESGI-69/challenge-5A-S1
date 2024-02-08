import styles from './Reservation.module.scss';
import Button from '@/components/lib/Button';
import { Dropdown, DropdownButton, DropdownItem, DropdownList } from '@/components/lib/Dropdown';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Schedule  from '@/components/Schedule';
import { ProfileContext } from '@/contexts/ProfileContext';
import { useContext, useEffect } from 'react';
import { ServiceContext } from '@/contexts/api/ServiceContext';
import { AppointmentContext } from '@/contexts/api/AppointmentContext';
import { useTranslation } from 'react-i18next';

export default function Reservation () {
  const { t } = useTranslation('reservation');
  const { profile } = useContext(ProfileContext);
  const { serviceEstablishmentId } = useParams();
  const { post, appointment, isPostAppointmentLoading } = useContext(AppointmentContext);
  const [ selectedDate, setSelectedDate ] = useState(null);
  const [ selectedEmployee, setSelectedEmployee ] = useState(null);
  const [ persons, setPersons ] = useState([]);

  const [ person, setPerson ] = useState(null);
  const handleDateSelect = (date, employeeId) => {
    setSelectedDate(date);
    setSelectedEmployee(employeeId);
  };

  const handlePayment = () => {
    const employeeId = selectedEmployee;
    const startDate = selectedDate;
    const endDate = selectedDate;
    const comment = 'test';
    post({
      employee: `/api/employees/${employeeId}`,
      establishment: `/api/establishments/${service.establishment.id}`,
      service: `/api/services/${serviceId}`,
      startDate,
      endDate,
      comment,
    });
  };

  const serviceId = serviceEstablishmentId;
  const { getById, service, isServiceLoading } = useContext(ServiceContext);
  const [ schedule, setSchedule ] = useState([]);

  useEffect(() => {
    getById(serviceId);
  }, []);

  useEffect(() => {
    if (service) {
      const { schedule, persons } = generateSchedule(service);
      setSchedule(schedule);
      setPersons(persons);    }
    if (persons && !person){
      setPerson(persons[0]);
    }
  }, [ service, person ]);

  function generateSchedule(service) {
    const schedule = [];
    const employees = {};

    //WorkingHoursRanges est renvoyé sous forme d'objet :)
    Object.values(service.workingHoursRanges).forEach(range => {
      const startDate = new Date(range.startDate);
      const endDate = new Date(range.endDate);
      const serviceEmployee = range.Employee.id;

      employees[serviceEmployee] = {
        id: serviceEmployee,
        name: `Personne ${serviceEmployee}`,
      };

      if (serviceEmployee === person?.id) {

        let currentTime = new Date(startDate.getTime());
        //WIP pour la génération du schedule
        while (currentTime <= endDate) {
          const timeSlot = {
            time: currentTime.toISOString().slice(11, 16), // format HH:mm
            available: true, // vérifier ici si le créneau est déjà pri
            employee: serviceEmployee,
          };

          // Trouvez la semaine correspondante ou créez-en une nouvelle si elle n'existe pas
          const weekNumber = getWeek(currentTime);
          let week = schedule.find(week => week.week === weekNumber);
          if (!week) {
            week = { week: weekNumber, days: [] };
            schedule.push(week);
          }

          // Ajoutez le créneau horaire au tableau du jour correspondant
          const day = week.days.find(day => day.date === currentTime.toISOString().slice(0, 10)); // format YYYY-MM-DD
          if (day) {
            day.times.push(timeSlot);
          } else {
            week.days.push({
              date: currentTime.toISOString().slice(0, 10), //format YYYY-MM-DD
              times: [ timeSlot ],
            });
          }

          // generation de la prochaine période de service
          currentTime.setMinutes(currentTime.getMinutes() + service.duration);
        }
      }

    });
    // console.log(schedule);
    return { schedule, persons: Object.values(employees) };
  }

  function getWeek(date) {
    let tempDate = new Date(date.valueOf());
    tempDate.setDate(tempDate.getDate() + (3 - (tempDate.getDay() + 6) % 7));
    var firstDayOfYear = new Date(tempDate.getFullYear(), 0, 1);
    return 1 + Math.ceil(((tempDate - firstDayOfYear) / 86400000) / 7);
  }

  return (
    <div className={styles.Page}>
      <h2>{t('reservation')}</h2>
      <span className={styles.ReservationAddress}>
        Rue du bonsoir
      </span>
      <span className={styles.ReservationNotation}>
        4.5
      </span>
      <br></br>
      <h2 className={styles.PageTitle}>1. {t('servicePicked')}</h2>
      <div className={styles.ServicesPicked}>
        <div className={styles.ServicePicked}>
          <div className={styles.ServiceInfo}>
            <span className={styles.ServicePickedName}>{service?.name}</span>
            <div className={styles.ServiceSpec}>
              <span className={styles.ServiceSpecName}>{service?.duration}min</span>
              <span>{t('from')} {service?.price}€</span>
            </div>
          </div>
          <div className={styles.ServicePerson}>
            <Dropdown>
              <DropdownButton>
                <Button variant="black" isPlain="false">{person?.name}</Button>
              </DropdownButton>
              <DropdownList>
                {persons.map(person => (
                  <DropdownItem key={person.id} onClick={() => setPerson(person)}>{person.name}</DropdownItem>
                ))}
              </DropdownList>
            </Dropdown>
          </div>
          <div className={styles.ServiceAction}>
            <a href="#" className={styles.ServiceActionDelete}>{t('delete')}</a>
          </div>
        </div>
      </div>
      <h2 className={styles.PageTitle}>2. {t('dateChoice')}</h2>
      <div>
        {!selectedDate && (
          <Schedule schedule={schedule} personSelected={person} onDateSelect={handleDateSelect} />
        )}
        {selectedDate && (
          <div className={styles.AppointementPicked}>
            <div className={styles.AppointementPickedInfo}>
              <div className={styles.AppointementPickedSpec}>
                <span>{new Date(selectedDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                <span className={styles.AppointementPickedSpecTime}>{t('at')} {new Date(selectedDate).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                <span> {t('with')} {selectedEmployee}</span>
              </div>
            </div>
            <div className={styles.AppointementPickedAction}>
              <a href="#" className={styles.AppointementPickedActionDelete} onClick={() => setSelectedDate(null)}>{t('edit')}</a>
            </div>
          </div>
        )}
      </div>

      {!profile && selectedDate && (
        <>
          <h2 className={styles.PageTitle}>3. {t('Authentication')}</h2>
          <div className={styles.Identification}>
            <h2 className={styles.PageTitle}>{t('catchPhraseRegister')}</h2>
            <Link to="/register">
              <Button variant="black" isPlain="true">{t('createAccount')}</Button>
            </Link>
            <h2 className={styles.PageTitle}>{t('catchPhraseLogin')}</h2>
            <Link to="/login">
              <Button variant="black">{t('loginAccount')}</Button>
            </Link>
          </div>
        </>
      )}

      {profile && selectedDate && (
        <>
          <h2 className={styles.PageTitle}>3. {t('Authentication')}</h2>
          <div className={styles.Identification}>
            <p>
              {t('connectedAs')} {profile['firstname']} {profile['lastname']}
            </p>
          </div>
        </>
      )}

      {/* if profile and selectedDate */}
      {profile && selectedDate && (
        <>
          <h2 className={styles.PageTitle}>4. {t('paymentMethod')}</h2>
          <div className={styles.Payment}>
            <>
              <div className={styles.PaymentService}>
                <span className={styles.PaymentServicePickedName}>{service.name}</span>
                <span className={styles.PaymentServicePrice}> {service.price}€</span>
              </div>
            </>
            <div className={`${styles.PaymentService  } ${  styles.PaymentServiceTotal}`}>
              <span>Total</span>
              <span> {service.price}€</span>
            </div>
            <div className={styles.PaymentMethod}>
              <Button onClick={appointment ? null : handlePayment} variant={appointment ? 'success' : 'black'}>
                {isPostAppointmentLoading ? 'Loading...' : appointment ? `Votre rendez-vous est confirmé pour le ${new Date(appointment.startDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })} à ${new Date(appointment.startDate).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })} ✔️ ` : `${t('book')} ${service.price}€`}
              </Button>
            </div>
          </div>
        </>
      )}

    </div>
  );
}
