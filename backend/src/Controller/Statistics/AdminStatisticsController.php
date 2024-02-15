<?php

namespace App\Controller\Statistics;

use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use App\Repository\CompanyRepository;


#[AsController]
class AdminStatisticsController
{
  private $companyRepository;

  public function __construct(
    protected Security $security,
    private readonly NormalizerInterface $normalizer,
    CompanyRepository $companyRepository
  ) {
    $this->companyRepository = $companyRepository;
  }

  public function __invoke(): JsonResponse
  {
    $companies = $this->companyRepository->getAll();
    $nbCompanies = count($companies);
    $nbEmployees = 0;
    $nbEstablishments = 0;
    $totalSum = 0;
    $allTimeSumWithDate = [];
    foreach ($companies as $company) {
      $nbEmployees += count($company->getEmployees());
      $nbEstablishments += count($company->getEstablishments());
      foreach ($company->getEstablishments() as $establishment) {
        foreach ($establishment->getAppointments() as $appointment) {
          $totalSum += $appointment->getPrice();
          $appointmentDate = $appointment->getEndDate()->format('Y-m-d');
          if (!isset($allTimeSumWithDate[$appointmentDate])) {
            $allTimeSumWithDate[$appointmentDate] = 0;
          }
          $allTimeSumWithDate[$appointmentDate] += $appointment->getPrice();
        }
      }
    }
    $averageSumPerCompany = $nbCompanies !== 0 ? $totalSum / $nbCompanies : 0;
    $averageSumPerEstablishment = $nbEstablishments !== 0 ? $totalSum / $nbEstablishments : 0;
    $averageSumPerEmployee = $nbEmployees !== 0 ? $totalSum / $nbEmployees : 0;
    return new JsonResponse([
      'nbCompanies' => $nbCompanies,
      'nbEmployees' => $nbEmployees,
      'nbEstablishments' => $nbEstablishments,
      'totalSum' => round($totalSum, 2),
      'averageSumPerCompany' => round($averageSumPerCompany, 2),
      'averageSumPerEstablishment' => round($averageSumPerEstablishment, 2),
      'averageSumPerEmployee' => round($averageSumPerEmployee, 2),
      'allTimeSumWithDate' => $allTimeSumWithDate
    ]);
  }
}
