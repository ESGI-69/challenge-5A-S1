import StatisticsCard from '@/components/Statistics/StatisticsCard';
import StatisticsChart from '@/components/Statistics/StatisticsChart';
import { CompanyStatisticsContext } from '@/contexts/api/CompanyStatisticsContext';
import { useContext, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { Tab, TabContent, Tabs, TabsList } from '@/components/lib/Tabs';

export default function Statistics({ companyId }) {
  const { isStatisticsLoading, statistics, getStatistics } = useContext(CompanyStatisticsContext);

  useEffect(() => {
    getStatistics(companyId);
    console.log(statistics);
  }, [ companyId ]);

  const findById = (array, id) => array.find((item) => String(item.id) === String(id));
  return (
    <section className={styles.Statistics}>
      {isStatisticsLoading && (<span>Chargement...</span>)}
      {!isStatisticsLoading && Object.keys(statistics).length && (
        <>
          <div className={styles.StatisticsLeft}>
            <StatisticsCard title="Recettes sur l'année" type='dark'>
              <StatisticsChart data={statistics?.sumPerDayAllTime} />
            </StatisticsCard>
            <div className={styles.Statistics}>
              <StatisticsCard title="Recette cette semaine" number={`${statistics?.companyWeeklySum}€`}/>
              <StatisticsCard title="Recette ce mois ci" number={`${statistics?.companyMonthlySum}€`}/>
            </div>
            <StatisticsCard title="Recette totale" number={`${statistics?.companyAllTimeSum}€`}/>
          </div>
          <div className={styles.StatisticsRight}>
            <StatisticsCard title="Etablissements les plus performants">
              <Tabs defaultTab="tab1">
                <TabsList>
                  <Tab value="tab1">Mensuel</Tab>
                  <Tab value="tab2">Hebdomadaire</Tab>
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
                          {statistics?.establishmentsMonthlySums[establishment.id] ?? '0'}$
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
                          {statistics?.establishmentsWeeklySums[establishment.id] ?? '0'}$
                        </span>
                      </li>
                    ))}
                  </ul>
                </TabContent>
              </Tabs >
            </StatisticsCard>
            <StatisticsCard title="Employés les plus performants">
              <Tabs defaultTab="tab1">
                <TabsList>
                  <Tab value="tab1">Mensuel</Tab>
                  <Tab value="tab2">Hebdomadaire</Tab>
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
                          {statistics?.employeesMonthlyPerformance[employee.id] ?? '0'}$
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
                          {statistics?.employeesWeeklyPerformance[employee.id] ?? '0'}$
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
