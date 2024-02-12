import StatisticsCard from '@/components/Statistics/StatisticsCard';
import StatisticsChart from '@/components/Statistics/StatisticsChart';
import { CompanyStatisticsContext } from '@/contexts/api/CompanyStatisticsContext';
import { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import { Tab, TabContent, Tabs, TabsList } from '@/components/lib/Tabs';
import { useTranslation } from 'react-i18next';

export default function Statistics({ companyId }) {
  const { t } = useTranslation('backofficeDashboard');
  const { isStatisticsLoading, statistics, getStatistics } = useContext(CompanyStatisticsContext);

  useEffect(() => {
    getStatistics(companyId);
  }, [ companyId ]);

  const findById = (array, id) => array.find((item) => String(item.id) === String(id));
  return (
    <section className={styles.Statistics}>
      {isStatisticsLoading && (<span>Loading...</span>)}
      {!isStatisticsLoading && Object.keys(statistics).length && (
        <>
          <div className={styles.StatisticsLeft}>
            <StatisticsCard title={t('statistics.graph.title')} type='dark'>
              <StatisticsChart data={statistics?.sumPerDayAllTime} />
            </StatisticsCard>
            <div className={styles.Statistics}>
              <StatisticsCard title={t('statistics.weeklySum')} number={`${statistics?.companyWeeklySum}€`}/>
              <StatisticsCard title={t('statistics.monthlySum')} number={`${statistics?.companyMonthlySum}€`}/>
            </div>
            <StatisticsCard title={t('statistics.totalSum')} number={`${statistics?.companyAllTimeSum}€`}/>
          </div>
          <div className={styles.StatisticsRight}>
            <StatisticsCard title={t('statistics.establishmentsPerf')}>
              <Tabs defaultTab="tab1">
                <TabsList>
                  <Tab value="tab1">{t('statistics.timeRange.monthly')}</Tab>
                  <Tab value="tab2">{t('statistics.timeRange.weekly')}</Tab>
                </TabsList>
                <TabContent value="tab1">
                  <ul className={styles.StatisticsPerfomanceList}>
                    {statistics?.establishments.map((establishment) => (
                      <li key={establishment.id} className={styles.StatisticsPerfomanceListItem}>
                        <div className={styles.StatisticsPerfomanceListItemInfo}>
                          <span>{findById(statistics.establishments, establishment.id).city}</span>
                          <small>{findById(statistics.establishments, establishment.id).street}</small>
                        </div>
                        <span className={styles.StatisticsPerfomanceListItemNumber}>
                          {statistics?.establishmentsMonthlySums[establishment.id] ?? '0'}€
                        </span>
                      </li>
                    ))}
                  </ul>
                </TabContent>
                <TabContent value="tab2">
                  <ul className={styles.StatisticsPerfomanceList}>
                    {statistics?.establishments.map((establishment) => (
                      <li key={establishment.id} className={styles.StatisticsPerfomanceListItem}>
                        <div className={styles.StatisticsPerfomanceListItemInfo}>
                          <span>{findById(statistics.establishments, establishment.id).city}</span>
                          <small>{findById(statistics.establishments, establishment.id).street}</small>
                        </div>
                        <span className={styles.StatisticsPerfomanceListItemNumber}>
                          {statistics?.establishmentsWeeklySums[establishment.id] ?? '0'}€
                        </span>
                      </li>
                    ))}
                  </ul>
                </TabContent>
              </Tabs >
            </StatisticsCard>
            <StatisticsCard title={t('statistics.employeesPerf')}>
              <Tabs defaultTab="tab1">
                <TabsList>
                  <Tab value="tab1">{t('statistics.timeRange.monthly')}</Tab>
                  <Tab value="tab2">{t('statistics.timeRange.weekly')}</Tab>
                </TabsList>
                <TabContent value="tab1">
                  <ul className={styles.StatisticsPerfomanceList}>
                    {statistics?.employees.map((employee) => (
                      <li key={employee.id} className={styles.StatisticsPerfomanceListItem}>
                        <div className={styles.StatisticsPerfomanceListItemInfo}>
                          <span>{findById(statistics.employees, employee.id).firstname}</span>
                          <small>{findById(statistics.employees, employee.id).lastname}</small>
                        </div>
                        <span className={styles.StatisticsPerfomanceListItemNumber}>
                          {statistics?.employeesMonthlyPerformance[employee.id] ?? '0'}€
                        </span>
                      </li>
                    ))}
                  </ul>
                </TabContent>
                <TabContent value="tab2">
                  <ul className={styles.StatisticsPerfomanceList}>
                    {statistics?.employees.map((employee) => (
                      <li key={employee.id} className={styles.StatisticsPerfomanceListItem}>
                        <div className={styles.StatisticsPerfomanceListItemInfo}>
                          <span>{findById(statistics.employees, employee.id).firstname}</span>
                          <small>{findById(statistics.employees, employee.id).lastname}</small>
                        </div>
                        <span className={styles.StatisticsPerfomanceListItemNumber}>
                          {statistics?.employeesWeeklyPerformance[employee.id] ?? '0'}€
                        </span>
                      </li>
                    ))}
                  </ul>
                </TabContent>
              </Tabs >
            </StatisticsCard>
          </div>
        </>
      )}

    </section>
  );
}

Statistics.propTypes = {
  companyId: PropTypes.string,
};
