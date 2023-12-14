import styles from './Reservation.module.scss';
import Button from '@/components/lib/Button';
import { Dropdown, DropdownButton, DropdownItem, DropdownList } from '@/components/lib/Dropdown';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Schedule  from '@/components/Schedule';

export default function Reservation () {

  const servicesPicked = [
    {
      id: 1,
      name: 'Coloration + Shampoing Brushing cheveux courts',
      price: 10,
      duration: 30,
    },
  ];

  const persons = [
    {
      id: 1,
      name: 'Personne 1',
    },
    {
      id: 2,
      name: 'Personne 2',
    },
    {
      id: 3,
      name: 'Personne 3',
    },
  ];

  const [ person, setPerson ] = useState(persons[0]);

  const schedule = [
    {
      week: 1,
      days: [
        {
          date: '2021-12-14',
          times: [
            {
              time: '10:00',
              available: true,
            },
            {
              time: '10:30',
              available: false,
            },
            {
              time: '11:00',
              available: true,
            },
            {
              time: '11:30',
              available: true,
            },
            {
              time: '11:30',
              available: true,
            },
            {
              time: '11:30',
              available: true,
            },
            {
              time: '11:30',
              available: true,
            },
            {
              time: '11:30',
              available: true,
            },
            {
              time: '11:30',
              available: true,
            },
            {
              time: '11:30',
              available: true,
            },
            {
              time: '11:30',
              available: true,
            },
            {
              time: '11:30',
              available: true,
            },
          ],
        },
        {
          date: '2021-12-15',
          times: [
            {
              time: '10:00',
              available: true,
            },
            {
              time: '10:30',
              available: false,
            },
            {
              time: '11:00',
              available: true,
            },
            {
              time: '11:30',
              available: true,
            },
          ],
        },
        {
          date: '2021-12-16',
          times: [
            {
              time: '10:00',
              available: true,
            },
            {
              time: '10:30',
              available: false,
            },
            {
              time: '11:00',
              available: true,
            },
            {
              time: '11:30',
              available: true,
            },
          ],
        },
        {
          date: '2021-12-17',
          times: [
            {
              time: '10:00',
              available: true,
            },
            {
              time: '10:30',
              available: false,
            },
            {
              time: '11:00',
              available: true,
            },
            {
              time: '11:30',
              available: true,
            },
          ],
        },
        {
          date: '2021-12-18',
          times: [
            {
              time: '10:00',
              available: true,
            },
            {
              time: '10:30',
              available: false,
            },
            {
              time: '11:00',
              available: true,
            },
            {
              time: '11:30',
              available: true,
            },
          ],
        },
        {
          date: '2021-12-19',
          times: [
            {
              time: '10:00',
              available: true,
            },
            {
              time: '10:30',
              available: false,
            },
            {
              time: '11:00',
              available: true,
            },
            {
              time: '11:30',
              available: true,
            },
          ],
        },
      ],
    },
    {
      week: 2,
      days: [
        {
          date: '2021-12-20',
          times: [
            {
              time: '10:00',
              available: true,
            },
            {
              time: '10:30',
              available: false,
            },
            {
              time: '11:00',
              available: true,
            },
            {
              time: '11:30',
              available: true,
            },
          ],
        },
        {
          date: '2021-12-21',
          times: [
            {
              time: '10:00',
              available: true,
            },
            {
              time: '10:30',
              available: false,
            },
            {
              time: '11:00',
              available: true,
            },
            {
              time: '11:30',
              available: true,
            },
          ],
        },
        {
          date: '2021-12-22',
          times: [
            {
              time: '10:00',
              available: true,
            },
            {
              time: '10:30',
              available: false,
            },
            {
              time: '11:00',
              available: true,
            },
            {
              time: '11:30',
              available: true,
            },
          ],
        },
        {
          date: '2021-12-23',
          times: [
            {
              time: '10:00',
              available: false,
            },
            {
              time: '10:30',
              available: false,
            },
            {
              time: '11:00',
              available: false,
            },
            {
              time: '11:30',
              available: false,
            },
          ],
        },
        {
          date: '2021-12-24',
          times: [
            {
              time: '10:00',
              available: false,
            },
            {
              time: '10:30',
              available: false,
            },
            {
              time: '11:00',
              available: false,
            },
            {
              time: '11:30',
              available: false,
            },
          ],
        },
      ],
    },
  ];

  return (
    <div className={styles.Page}>
      <h2>Reservation</h2>
      <span className={styles.ReservationAddress}>
        Rue du bonsoir
      </span>
      <span className={styles.ReservationNotation}>
        4.5
      </span>

      <h2 className={styles.PageTitle}>1. Prestation selectionnée</h2>
      <div className={styles.ServicesPicked}>
        {servicesPicked.map(service => (
          <div key={service.id} className={styles.ServicePicked}>
            <div className={styles.ServiceInfo}>
              <span className={styles.ServicePickedName}>{service.name}</span>
              <div className={styles.ServiceSpec}>
                <span className={styles.ServiceSpecName}>{service.duration}h</span>
                <span>à partir de {service.price}€</span>
              </div>
            </div>
            <div className={styles.ServicePerson}>
              <Dropdown>
                <DropdownButton>
                  <Button variant="black" isPlain="false">{person.name}</Button>
                </DropdownButton>
                <DropdownList>
                  {persons.map(person => (
                    <DropdownItem key={person.id} onClick={() => setPerson(person)}>{person.name}</DropdownItem>
                  ))}
                </DropdownList>
              </Dropdown>
            </div>
            <div className={styles.ServiceAction}>
              <a href="#" className={styles.ServiceActionDelete}>Supprimer</a>
            </div>
          </div>
        ))}
      </div>

      <h2 className={styles.PageTitle}>2. Choix de la date et heure</h2>
      <div>
        <Schedule schedule={schedule} />
        <div className={styles.AppointementPicked}>
          <div className={styles.AppointementPickedInfo}>
            <div className={styles.AppointementPickedSpec}>
              <span>Mercredi 20 decembre</span>
              <span className={styles.AppointementPickedSpecTime}>à 10:00</span>
            </div>
          </div>
          <div className={styles.AppointementPickedAction}>
            <a href="#" className={styles.AppointementPickedActionDelete}>Modifier</a>
          </div>
        </div>
      </div>

      <h2 className={styles.PageTitle}>3. Indentification</h2>
      <div className={styles.Identification}>
        <h2 className={styles.PageTitle}>Nouveau sur platiny ?</h2>
        <Button variant="black" isPlain="true">Créer mon compte</Button>
        <h2 className={styles.PageTitle}>Vous avez déja utilisé platiny ?</h2>
        <Button variant="black">Se connecter</Button>
      </div>

    </div>
  );
}
