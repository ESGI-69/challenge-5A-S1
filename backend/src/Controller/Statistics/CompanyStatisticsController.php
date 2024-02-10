<?php

namespace App\Controller\Statistics;

use App\Entity\Company;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;


#[AsController]
class CompanyStatisticsController
{
  public function __construct(
    protected Security $security,
    private readonly NormalizerInterface $normalizer,
  ) {
  }

  public function __invoke(Company $company): JsonResponse
  {
    $thisWeekMonday = date('Y-m-d', strtotime('monday this week'));
    $thisWeekSunday = date('Y-m-d', strtotime('sunday this week'));
    $firstDayOfTheMonth = date('Y-m-01');
    $lastDayOfTheMonth = date('Y-m-t');
    
    $establishments = $company->getEstablishments();
    $employees = $company->getEmployees();

    $companyAppointments = [];
    $companyAppointmentsSum = 0;

    $companyAppointmentsWeeklySum = 0;
    $establishmentsWeeklySums = [];
    $employeesWeeklyPerformance = [];

    $companyAppointmentsMonthlySum = 0;
    $establishmentsMonthlySums = [];
    $employeesMonthlyPerformance = [];

    $sumPerDayAllTime = [];

    foreach ($establishments as $establishment) {
      $establishmentAppointments = $establishment->getAppointments();
      array_push($companyAppointments, $establishmentAppointments);
      foreach ($establishmentAppointments as $appointment) {
        $appointmentDate = $appointment->getStartDate()->format('Y-m-d');
        // Weekly process
        if ($appointmentDate >= $thisWeekMonday && $appointmentDate <= $thisWeekSunday) {
          // Total sum for all establishments
          $companyAppointmentsWeeklySum += $appointment->getPrice();
          // Total sum for each establishment
          if (array_key_exists($establishment->getId(), $establishmentsWeeklySums)) {
            $establishmentsWeeklySums[$establishment->getId()] += $appointment->getPrice();
          } else {
            $establishmentsWeeklySums[$establishment->getId()] = $appointment->getPrice();
          }
          // Total sum for each employees
          if (array_key_exists($appointment->getEmployee()->getId(), $employeesWeeklyPerformance)) {
            $employeesWeeklyPerformance[$appointment->getEmployee()->getId()] += $appointment->getPrice();
          } else {
            $employeesWeeklyPerformance[$appointment->getEmployee()->getId()] = $appointment->getPrice();
          }
        }
        // Monthly process
        if ($appointmentDate >= $firstDayOfTheMonth && $appointmentDate <= $lastDayOfTheMonth) {
          // Total sum for all establishments
          $companyAppointmentsMonthlySum += $appointment->getPrice();
          // Total sum for each establishment
          if (array_key_exists($establishment->getId(), $establishmentsMonthlySums)) {
            $establishmentsMonthlySums[$establishment->getId()] += $appointment->getPrice();
          } else {
            $establishmentsMonthlySums[$establishment->getId()] = $appointment->getPrice();
          }
          // Total sum for each employees
          if (array_key_exists($appointment->getEmployee()->getId(), $employeesMonthlyPerformance)) {
            $employeesMonthlyPerformance[$appointment->getEmployee()->getId()] += $appointment->getPrice();
          } else {
            $employeesMonthlyPerformance[$appointment->getEmployee()->getId()] = $appointment->getPrice();
          }
        }
        // All time process
        $companyAppointmentsSum += $appointment->getPrice();
        if (array_key_exists($appointmentDate, $sumPerDayAllTime)) {
          $sumPerDayAllTime[$appointmentDate] += $appointment->getPrice();
        } else {
          $sumPerDayAllTime[$appointmentDate] = $appointment->getPrice();
        }
      }
    }

    



    return new JsonResponse([
      'establishments' => $this->normalizer->normalize($establishments),
      'employees' => $this->normalizer->normalize($employees),
      'appointments' => $this->normalizer->normalize($companyAppointments),
      'totalNumberOfAppointments' => count($companyAppointments),
      'companyWeeklySum' => $companyAppointmentsWeeklySum,
      'companyMonthlySum' => $companyAppointmentsMonthlySum,
      'companyAllTimeSum' => $companyAppointmentsSum,
      'establishmentsWeeklySums' => $establishmentsWeeklySums,
      'employeesWeeklyPerformance' => $employeesWeeklyPerformance,
      'establishmentsMonthlySums' => $establishmentsMonthlySums,
      'employeesMonthlyPerformance' => $employeesMonthlyPerformance,
      'sumPerDayAllTime' => $sumPerDayAllTime,
    ]);
  }
}
