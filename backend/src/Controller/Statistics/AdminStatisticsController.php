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
    foreach ($companies as $company) {
      $nbEmployees += count($company->getEmployees());
      $nbEstablishments += count($company->getEstablishments());
      foreach ($company->getEstablishments() as $establishment) {
        foreach ($establishment->getAppointments() as $appointment) {
          $totalSum += $appointment->getPrice();
        }
      }
    }
    $averageSumPerCompany = $totalSum / $nbCompanies;
    $averageSumPerEstablishment = $totalSum / $nbEstablishments;
    $averageSumPerEmployee = $totalSum / $nbEmployees;
    return new JsonResponse([
      'nbCompanies' => $nbCompanies,
      'nbEmployees' => $nbEmployees,
      'nbEstablishments' => $nbEstablishments,
      'totalSum' => $totalSum,
      'averageSumPerCompany' => $averageSumPerCompany,
      'averageSumPerEstablishment' => $averageSumPerEstablishment,
      'averageSumPerEmployee' => $averageSumPerEmployee
    ]);
  }
}
