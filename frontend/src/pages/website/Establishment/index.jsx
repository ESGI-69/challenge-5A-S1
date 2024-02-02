import { EstablishmentContext } from '@/contexts/api/EstablishmentContext';
import { AppointmentContext } from '@/contexts/api/AppointmentContext';
import { ProfileContext } from '@/contexts/ProfileContext';
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Establishment.module.scss';
import Gallery from '@/components/Gallery';
import Button from '@/components/lib/Button';
import ServicesTable from '@/components/Services/ServicesTable';
import GlobalNotation from '@/components/Notation/GlobalNotation';
import OpeningHours from '@/components/OpeningHours';
import { useTranslation } from 'react-i18next';
import { Tab, TabContent, Tabs, TabsList } from '@/components/lib/Tabs';
import Review from '@/components/Notation/Review';
import Map from '@/components/Map';
import { useState } from 'react';
import AppointmentCard from '@/components/AppointmentCard';

function Establishment() {
  const { t } = useTranslation('establishment');
  const { id } = useParams();
  const { getById, establishment, isEstablishmentLoading } = useContext(EstablishmentContext);
  const { getMyAppointments, myAppointments, isMyAppointmentsLoading } = useContext(AppointmentContext);
  const { profile } = useContext(ProfileContext);

  const now = new Date();

  const pastAppointments = myAppointments.filter(appointment => new Date(appointment.endDate) < now);
  const futureAppointments = myAppointments.filter(appointment => new Date(appointment.endDate) >= now);

  const [ currentReviewsPage, setCurrentReviewsPage ] = useState(0);
  const reviewsPerPage = 5;

  const handleNextReviews = () => {
    setCurrentReviewsPage(currentReviewsPage + 1);
  };

  const handlePreviousReview = () => {
    setCurrentReviewsPage(currentReviewsPage - 1);
  };

  const startReviews = currentReviewsPage * reviewsPerPage;
  const endReviews = startReviews + reviewsPerPage;

  useEffect(() => {
    getById(id);
    getMyAppointments(id);
  }, []);

  return isEstablishmentLoading ?
    <span>Loading ...</span> :
    <div className={styles.Establishment}>
      <div className={styles.EstablishmentHeader}>
        <div className={styles.EstablishmentHeaderName}>
          <div className={styles.EstablishmentHeaderNameLeft}>
            <h1 className={styles.EstablishmentTitle}>{establishment?.company?.name}</h1>
            <span className={styles.EstablishmentHeaderNameLeftAddress}>
              {establishment?.street}, {establishment?.zipCode} {establishment?.city}
            </span>
          </div>
          <div className={styles.EstablishmentHeaderNameRight}>
            <Button variant="black">{t('makeAnAppointment')}</Button>
          </div>
        </div>
        <Gallery>
          <img src="https://picsum.photos/seed/1/534/300" alt="random" />
          <img src="https://picsum.photos/seed/2/534/300" alt="random" />
          <img src="https://picsum.photos/seed/3/534/300" alt="random" />
          <img src="https://picsum.photos/seed/4/534/300" alt="random" />
          <img src="https://picsum.photos/seed/5/534/300" alt="random" />
          <img src="https://picsum.photos/seed/6/534/300" alt="random" />
          <img src="https://picsum.photos/seed/7/534/300" alt="random" />
        </Gallery>
        <div className={styles.EstablishmentHeaderDescription}>
          <h2 className={styles.EstablishmentTitle}>{t('description', { establishmentName: establishment?.company?.name })}</h2>
          <p>{t('advantages')}</p>
        </div>
      </div>
      <div className={styles.EstablishmentLeft}>
        {isMyAppointmentsLoading && <span>Loading ...</span>}
        {profile && myAppointments.length > 0 && (
          <div className={styles.EstablishmentLeftApointmentsSection}>
            <h3>Past Appointments</h3>
            {pastAppointments.map(appointment => (
              <p key={appointment.id} >{appointment.endDate}</p>
            ))}
            <h3 className={styles.EstablishmentSubtitle}>
              {t('myApointments.title')}
            </h3>
            <div className={styles.EstablishmentLeftApointmentsSectionApointments}>
              {futureAppointments.map(appointment => (
                console.log(appointment),
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))}
            </div>
          </div>
        )}
        <div className={styles.EstablishmentLeftServicesSection}>
          <h3 className={styles.EstablishmentTitle}>
            {t('services.title')}
          </h3>
          {establishment?.serviceTypes.map(type => (
            <ServicesTable
              key={type.id}
              type={type.name}
              description={type.description}
              services={type.services}
            />
          ))}
        </div>

        <div className={styles.EstablishmentLeftServicesSection}>
          <h3 className={styles.EstablishmentSubtitle}>
            {t('establishementLocation')}
          </h3>
          <span className={styles.EstablishmentAddress}>
            {establishment?.street}, {establishment?.zipCode} {establishment?.city}
          </span>
          {establishment && (
            <Map position={[ establishment?.lat, establishment?.long ]} markers={[
              {
                position: [ establishment?.lat, establishment?.long ],
                popup: 'Popup 1',
              },
            ]}
            zoomLevel={13}
            />
          )};
        </div>

      </div>
      <div className={styles.EstablishmentRight}>

        <Tabs defaultTab="global-notation" variant="big">
          <TabsList>
            <Tab value="global-notation">{t('tabs.globalNotation')}</Tab>
            <Tab value="tab2">{t('tabs.reviews')}</Tab>
          </TabsList>
          <TabContent value="global-notation">
            <GlobalNotation
              globalAverage={establishment?.average}
              subFeedbacks={establishment?.subFeedbacks}
              reviewsCount={establishment?.feedback.length}
            />
          </TabContent>
          <TabContent value="tab2">
            {establishment?.feedback.length === 0 && (
              <span>{t('tabs.noComments')}</span>
            )}
            {establishment?.feedback.slice(startReviews, endReviews).map(review => (
              <Review
                key={review.id}
                authorName={review.author.firstname}
                note={5}
                content={review.comment}
                date={review.updatedAt}
              />
            ))}
            <div className={styles.EstablishmentRightCommentsButtons}>
              <Button
                disabled={currentReviewsPage === 0}
                variant="black"
                onClick={handlePreviousReview}
              >
                {t('tabs.previousComments')}
              </Button>
              <Button
                disabled={endReviews >= establishment?.feedback.length}
                variant="black"
                onClick={handleNextReviews}
              >
                {t('tabs.nextComments')}
              </Button>
            </div>
          </TabContent>
        </Tabs >
        <div className={styles.EstablishmentRightOpeningHoursSection}>
          <h3 className={styles.EstablishmentSubtitle}>
            {t('openingHours.title')}
          </h3>
          <OpeningHours value={establishment?.openingHours || []} />
        </div>
      </div>
    </div>
  ;
}

export default Establishment;
