import AppointmentsList from '@/pages/website/Profile/AppointmentsList';
import styles from './Profile.module.scss';
import { useTranslation } from 'react-i18next';
import { useContext, useState } from 'react';
import { ProfileContext } from '@/contexts/ProfileContext';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { t } = useTranslation('profile');
  const { profile, logout } = useContext(ProfileContext);

  const [ currentPage, setCurrentPage ] = useState('myPastAppointments');

  return (
    <div className={styles.Profile}>
      <div
        className={styles.ProfileMyProfile}
      >
        <h2>{t('myAccount.title')}</h2>
        <div className={styles.ProfileMyProfileActions}>
          <button
            onClick={() => setCurrentPage('myPastAppointments')}
            className={`${styles.ProfileMyProfileActionsButton} ${currentPage === 'myPastAppointments' && styles.ProfileMyProfileActionsButton_Active}`}
          >
            {t('myAccount.myPastAppointments')}
          </button>
          <button
            onClick={() => setCurrentPage('myFutureAppointments')}
            className={`${styles.ProfileMyProfileActionsButton} ${currentPage === 'myFutureAppointments' && styles.ProfileMyProfileActionsButton_Active}`}
          >
            {t('myAccount.myFutureAppointments')}
          </button>
          <button
            onClick={() => setCurrentPage('myInformations')}
            className={`${styles.ProfileMyProfileActionsButton} ${currentPage === 'myInformations' && styles.ProfileMyProfileActionsButton_Active}`}
          >
            {t('myAccount.myInformations')}
          </button>
          <div className={styles.ProfileMyProfileActionsSeparator} />
          {(profile?.roles?.includes('ROLE_ADMIN') || profile?.roles?.includes('ROLE_PRESTA')) && (
            <Link
              to="/backoffice/"
              className={styles.ProfileMyProfileActionsButton}
            >
              {t('myAccount.goToBackoffice')}
            </Link>
          )}
          <button
            onClick={logout}
            className={`${styles.ProfileMyProfileActionsButton} ${styles.ProfileMyProfileActionsButton_Danger}`}
          >
            {t('myAccount.logout')}
          </button>
        </div>
      </div>
      {profile ? (
        <>
          {currentPage === 'myPastAppointments' && (
            <AppointmentsList />
          )}
          {currentPage === 'myFutureAppointments' && (
            <AppointmentsList isFutureAppointments />
          )}
          {currentPage === 'myInformations' && (
            <div>
              {t('myInformations.title')}
            </div>
          )}
        </>
      ) : (
        <span>
          {t('loading', { ns: 'base' })}...
        </span>
      )}
    </div>
  );
};

export default Profile;
