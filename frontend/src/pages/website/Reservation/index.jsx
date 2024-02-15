import styles from './Reservation.module.scss';
import Button from '@/components/lib/Button';
import { Dropdown, DropdownButton, DropdownItem, DropdownList } from '@/components/lib/Dropdown';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Schedule from '@/components/Schedule';
import { ProfileContext } from '@/contexts/ProfileContext';
import { useContext, useEffect } from 'react';
import { ServiceContext } from '@/contexts/api/ServiceContext';
import { AppointmentContext } from '@/contexts/api/AppointmentContext';
import { EstablishmentContext } from '@/contexts/api/EstablishmentContext';
import { useTranslation } from 'react-i18next';
import { dateCustom } from '@/utils/formater/date';

export default function Reservation() {
  const { t } = useTranslation('reservation');
  const { i18n } = useTranslation();
  const { profile } = useContext(ProfileContext);
  const { serviceEstablishmentId, employeeId } = useParams();
  const { post, appointment, isPostAppointmentLoading } = useContext(AppointmentContext);
  const { getById: getEstablishmentById, establishment, isEstablishmentLoading } = useContext(EstablishmentContext);
  const [ selectedDate, setSelectedDate ] = useState(null);
  const [ selectedEmployee, setSelectedEmployee ] = useState(null);
  const [ persons, setPersons ] = useState([]);
  const [ comment, setComment ] = useState('');

  const [ person, setPerson ] = useState(undefined);
  const handleDateSelect = (date, employeeId) => {
    setSelectedDate(date);
    setSelectedEmployee(employeeId);
  };

  const handlePayment = () => {
    const employeeId = selectedEmployee;
    const startDate = new Date(selectedDate);
    startDate.setHours(startDate.getHours()); // Add 1 hour
    const endDate = new Date(selectedDate);
    endDate.setHours(endDate.getHours()); // Add 1 hour
    post({
      employee: `/api/employees/${employeeId}`,
      establishment: `/api/establishments/${service.establishment.id}`,
      service: `/api/services/${serviceId}`,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
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
      getEstablishmentById(service.establishment.id);
      const { schedule, newPersons } = generateSchedule(service);
      setSchedule(schedule);
      if (persons !== newPersons) {
        setPersons(newPersons);
      }
      const preSelectedEmployee = persons.find(person => person.id == employeeId);
      if (preSelectedEmployee) {
        if (person === undefined) {
          setPerson(preSelectedEmployee);
        }
      } else if (persons && !person && persons[0] !== person) {
        setPerson(persons[0]);
      }
    }
  }, [
    service,
    employeeId,
    person,
  ]);

  function generateSchedule(service) {
    const schedule = [];
    const employees = {};
    let generatedWorkingHoursRanges = [];

    //On va récuperer les 2 prochaines semaines & génerer un nouvel objet WorkingHoursRanges :)
    let upcomingDays = getUpcomingDays(14);
    let workingDays = Object.values(service.workingHoursRanges).map(range => range.day);
    upcomingDays = upcomingDays.filter(upcomingDay => workingDays.includes(upcomingDay.dayName.toLowerCase()));

    upcomingDays.forEach(upcomingDay => {
      const currentWorkingHoursRanges = Object.values(service.workingHoursRanges).filter(range => range.day.toLowerCase() === upcomingDay.dayName.toLowerCase());

      currentWorkingHoursRanges.forEach(currentWorkingHoursRange => {
        const workingHoursRangeDate = new Date(currentWorkingHoursRange.startDate);
        const workingHoursEndDate = new Date(currentWorkingHoursRange.endDate);
        const newCorrectDate = new Date(upcomingDay.date.getFullYear(), upcomingDay.date.getMonth(), upcomingDay.date.getDate(), workingHoursRangeDate.getHours(), workingHoursRangeDate.getMinutes(), workingHoursRangeDate.getSeconds());
        const newCorrectEndDate = new Date(upcomingDay.date.getFullYear(), upcomingDay.date.getMonth(), upcomingDay.date.getDate(), workingHoursEndDate.getHours(), workingHoursEndDate.getMinutes(), workingHoursEndDate.getSeconds());

        const newWorkingHoursRange = {
          startDate: newCorrectDate.toISOString(),
          endDate: newCorrectEndDate.toISOString(),
          day: currentWorkingHoursRange.day,
          Employee: currentWorkingHoursRange.Employee,
        };

        generatedWorkingHoursRanges.push(newWorkingHoursRange);
      });

    });

    //WorkingHoursRanges est renvoyé sous forme d'objet :)
    //Update j'utilise le workingHoursRanges generé maintenant
    Object.values(generatedWorkingHoursRanges).forEach(range => {
      const startDate = new Date(range.startDate);
      const endDate = new Date(range.endDate);
      const serviceEmployee = range.Employee.id;
      const serviceEmployeeName = range.Employee.firstname;

      employees[serviceEmployee] = {
        id: serviceEmployee,
        name: `${serviceEmployeeName}`,
      };

      if (serviceEmployee === person?.id) {

        let currentTime = startDate;
        while (currentTime <= endDate) {

          let timeFix = new Date(currentTime);
          timeFix.setHours(timeFix.getHours() + 1);
          const timeSlot = {
            time: timeFix.toISOString().slice(11, 16), // format HH:mm
            available: !(service.appointments.some(appointment => new Date(appointment.startDate).getTime() === currentTime.getTime() && appointment.employee.id === serviceEmployee)), // vérifie si le créneau est dispo
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
    return { schedule, newPersons: Object.values(employees) };
  }

  function getWeek(date) {
    let tempDate = new Date(date.valueOf());
    tempDate.setDate(tempDate.getDate() + (3 - (tempDate.getDay() + 6) % 7));
    var firstDayOfYear = new Date(tempDate.getFullYear(), 0, 1);
    return 1 + Math.ceil(((tempDate - firstDayOfYear) / 86400000) / 7);
  }

  function getUpcomingDays(numDays) {
    var result = [];
    var daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    var currentDate = new Date();

    for (var i = 0; i < numDays; i++) {
      var nextDate = new Date(currentDate);
      nextDate.setDate(currentDate.getDate() + i);
      var dayOfWeekIndex = nextDate.getDay();
      var dayOfWeekName = daysOfWeek[dayOfWeekIndex];
      result.push({ date: nextDate, dayName: dayOfWeekName });
    }

    return result;
  }

  return (
    <div className={styles.Page}>
      <h2>{t('reservation')}</h2>
      {isServiceLoading && <span>{t('loading')}...</span>}
      {isEstablishmentLoading && <span>{t('loading')}...</span>}
      {!isEstablishmentLoading && (
        <>
          <span className={styles.ReservationAddress}>
            {establishment?.street} - {establishment?.city}
          </span>
          <span className={styles.ReservationNotation}></span>
        </>
      )}
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
              {person?.name &&
                <DropdownButton>
                  <Button variant="black" isPlain={false}>
                    {person?.name}
                  </Button>
                </DropdownButton>
              }
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
          <Schedule schedule={schedule} onDateSelect={handleDateSelect} />
        )}
        {selectedDate && (
          <div className={styles.AppointementPicked}>
            <div className={styles.AppointementPickedInfo}>
              <div className={styles.AppointementPickedSpec}>
                <span>
                  {dateCustom(selectedDate, i18n.resolvedLanguage)}
                </span>
                <span className={styles.AppointementPickedSpecTime}>{t('at')} {dateCustom(selectedDate, i18n.resolvedLanguage, { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' })}</span>
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
              <Button variant="black" isPlain={true}>
                {t('createAccount')}
              </Button>
            </Link>
            <h2 className={styles.PageTitle}>{t('catchPhraseLogin')}</h2>
            <Link to="/login">
              <Button variant="black">
                {t('loginAccount')}
              </Button>
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
      {profile && selectedDate && (
        <>
          <h2 className={styles.PageTitle}>4. {t('titleComment')}</h2>
          <div className={styles.Comment}>
            <textarea
              className={styles.CommentTextarea}
              placeholder={t('commentPlaceholder')}
              value={comment}
              onChange={e => setComment(e.target.value)}
            />
          </div>
        </>
      )}

      {/* if profile and selectedDate */}
      {profile && selectedDate && (
        <>
          <h2 className={styles.PageTitle}>5. {t('paymentMethod')}</h2>
          <div className={styles.Payment}>
            <>
              <div className={styles.PaymentService}>
                <span className={styles.PaymentServicePickedName}>{service.name}</span>
                <span className={styles.PaymentServicePrice}> {service.price}€</span>
              </div>
            </>
            <div className={`${styles.PaymentService} ${styles.PaymentServiceTotal}`}>
              <span>Total</span>
              <span> {service.price}€</span>
            </div>
            <div className={styles.PaymentMethod}>
              <Button onClick={appointment ? null : handlePayment} variant={appointment ? 'success' : 'black'}>
                {isPostAppointmentLoading ? `${t('loading')}...` : appointment ? `${t('events.creation.success')}` : `${t('book')} ${service.price}€`}
              </Button>
            </div>
          </div>
        </>
      )}

    </div>
  );
}
