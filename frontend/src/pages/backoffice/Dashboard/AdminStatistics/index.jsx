import StatisticsCard from '@/components/Statistics/StatisticsCard';
import StatisticsChart from '@/components/Statistics/StatisticsChart';
import { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import { useTranslation } from 'react-i18next';
import { AdminStatisticsContext } from '@/contexts/api/AdminStatisticsContext';

export default function AdminStatistics() {
  const { t } = useTranslation('backofficeDashboard');
  const { isStatisticsLoading, statistics, getStatistics } = useContext(AdminStatisticsContext);

  useEffect(() => {
    getStatistics();
  }, []);

  return (
    <section className={styles.Statistics}>
      {isStatisticsLoading && (<span>Loading...</span>)}
      {!isStatisticsLoading && Object.keys(statistics).length && (
        <>
          <div className={styles.StatisticsLeft}>
            <StatisticsCard title={t('statistics.graph.title')} type='dark'>
              <StatisticsChart data={statistics?.allTimeSumWithDate} />
            </StatisticsCard>
            <h2>{t('statistics.admin.averages')}</h2>
            <div className={styles.Statistics}>
              <StatisticsCard title={t('statistics.admin.averageSumPerCompany')} number={`${statistics?.averageSumPerCompany}€`} />
              <StatisticsCard title={t('statistics.admin.averageSumPerEstablishment')} number={`${statistics?.averageSumPerEstablishment}€`} />
              <StatisticsCard title={t('statistics.admin.averageSumPerEmployee')} number={`${statistics?.averageSumPerEmployee}€`} />
            </div>
            <StatisticsCard title={t('statistics.totalSum')} number={`${statistics?.totalSum}€`} />
          </div>
          <div className={styles.StatisticsRight}>
            <StatisticsCard title={t('statistics.admin.nbCompanies')} number={`${statistics?.nbCompanies}`} />
            <StatisticsCard title={t('statistics.admin.nbEstablishments')} number={`${statistics?.nbEstablishments}`} />
            <StatisticsCard title={t('statistics.admin.nbEmployees')} number={`${statistics?.nbEmployees}`} />
          </div>
        </>
      )}
    </section>
  );
}

AdminStatistics.propTypes = {
  companyId: PropTypes.string,
};
