import styles from './Reservation.module.scss';
import Button from '@/components/lib/Button';

export default function Reservation () {

  const servicesPicked = [
    {
      id: 1,
      name: 'Coloration + Shampoing Brushing cheveux courts',
      price: 10,
      duration: 30,
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
              <select>
                <option>person1</option>
                <option>person2</option>
              </select>
            </div>
            <div className={styles.ServiceAction}>
              <a href="#" className={styles.ServiceActionDelete}>Supprimer</a>
            </div>
          </div>
        ))}
      </div>

      <h2 className={styles.PageTitle}>2. Choix de la date et heure</h2>
      <div className={styles.AppointementsPicked}>
        <div>Container de rendez-vous</div>
      </div>

    </div>
  );
}
