import { EstablishmentContext } from '@/contexts/api/EstablishmentContext';
import { ProfileContext } from '@/contexts/ProfileContext';
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Establishment.module.scss';
import Gallery from '@/components/lib/Gallery';
import Button from '@/components/lib/Button';
import ServicesTable from '@/components/Services/ServicesTable';
import GlobalNotation from '@/components/Notation/GlobalNotation';
import OpeningHours from '@/components/OpeningHours';
import { useTranslation } from 'react-i18next';
import { Tab, TabContent, Tabs, TabsList } from '@/components/lib/Tabs';
import Review from '@/components/Notation/Review';

function Establishment() {
  const { t } = useTranslation('establishment');
  const { id } = useParams();
  const { getById, establishment, isEstablishmentLoading } = useContext(EstablishmentContext);
  const { profile } = useContext(ProfileContext);

  useEffect(() => {
    getById(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <h2 className={styles.EstablishmentTitle}>{ t('description', { establishmentName: establishment?.company?.name })}</h2>
          <p>{ t('advantages') }</p>
        </div>
      </div>
      <div className={styles.EstablishmentLeft}>
        {profile && (
          <div className={styles.EstablishmentLeftApointmentsSection}>
            <h3 className={styles.EstablishmentSubtitle}>
              {t('myApointments.title')}
            </h3>
            <div className={styles.EstablishmentLeftApointmentsSectionApointments}>
              <div style={{ height: '180px', background: 'red', flexGrow: 1 }}></div>
              <div style={{ height: '180px', background: 'red', flexGrow: 1 }}></div>
            </div>
          </div>
        )}
        <div className={styles.EstablishmentLeftServicesSection}>
          <h3 className={styles.EstablishmentTitle}>
            {t('services.title')}
          </h3>
          <ServicesTable
            type="Coiffures"
            services={[
              {
                id: 1,
                name: 'Coiffure 1',
                description: 'Description de la coiffure 1 Description de la coiffure 1 Description de la coiffure 1 Description de la coiffure 1 Description de la coiffure 1',
                icon: '👩‍🦰',
                duration: 30,
                price: 30,
              },
              {
                id: 2,
                name: 'Coiffure 2',
                description: 'Description de la coiffure 2',
                icon: '👩‍🦳',
                duration: 60,
                price: 60,
              },
              {
                id: 3,
                name: 'Coiffure 3',
                description: 'Description de la coiffure 3',
                icon: '👩‍🦱',
                duration: 90,
                price: 90,
              },
              {
                id: 4,
                name: 'Coiffure 4',
                description: 'Description de la coiffure 4',
                icon: '👩‍🦲',
                duration: 120,
                price: 120,
              },
            ]}
          />
        </div>
      </div>
      <div className={styles.EstablishmentRight}>

        <Tabs defaultTab="global-notation" variant="big">
          <TabsList>
            <Tab value="global-notation">{t('tabs.globalNotation')}</Tab>
            <Tab value="tab2">{t('tabs.reviews')}</Tab>
          </TabsList>
          <TabContent value="global-notation">
            <GlobalNotation />
          </TabContent>
          <TabContent value="tab2">
            <Review
              authorName='John Doe'
              note={5}
              content='Super coiffeur, je recommande !'
              date={new Date()}
            />
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
