
import PastAppointments from '@/pages/website/Profile/PastAppointments';
import styles from './Profile.module.scss';
import { useTranslation } from 'react-i18next';
import { useContext, useState } from 'react';
import { ProfileContext } from '@/contexts/ProfileContext';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { t } = useTranslation('profile');
  const { profile, logout } = useContext(ProfileContext);

  const [ currentPage, setCurrentPage ] = useState('myAppointments');

  return (
    <div className={styles.Profile}>
      <div
        className={styles.ProfileMyProfile}
      >
        <h2>{t('myAccount.title')}</h2>
        <div className={styles.ProfileMyProfileActions}>
          <button
            onClick={() => setCurrentPage('myAppointments')}
            className={`${styles.ProfileMyProfileActionsButton} ${currentPage === 'myAppointments' && styles.ProfileMyProfileActionsButton_Active}`}
          >
            {t('myAccount.myAppointments')}
          </button>
          <button
            onClick={() => setCurrentPage('myInformations')}
            className={`${styles.ProfileMyProfileActionsButton} ${currentPage === 'myInformations' && styles.ProfileMyProfileActionsButton_Active}`}
          >
            {t('myAccount.myInformations')}
          </button>
          <div className={styles.ProfileMyProfileActionsSeparator} />
          {profile?.roles?.includes('ROLE_ADMIN') || profile?.roles?.includes('ROLE_PRESTA') && (
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
      {currentPage === 'myAppointments' && (
        <PastAppointments />
      )}
      {currentPage === 'myInformations' && (
        <div>
          {t('myInformations.title')}
        </div>
      )}
    </div>
  );
};

export default Profile;
