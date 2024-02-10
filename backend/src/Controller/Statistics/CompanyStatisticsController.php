<?php

namespace App\Controller\Statistics;

use App\Entity\Company;
use App\Entity\User;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\Serializer\Annotation\Groups;


#[AsController]
class CompanyStatisticsController
{
  public function __construct(
    protected Security $security,
    private readonly NormalizerInterface $normalizer,
  ) {}

  public function __invoke(Company $company): JsonResponse
    {
        $establishments = $company->getEstablishments();
        $employees = $company->getEmployees();
        $appointments = [];
        foreach ($establishments as $establishment) {
            array_push($appointments, $establishment->getAppointments());
        }


        return new JsonResponse([
            'establishments' => $this->normalizer->normalize($establishments),
            'employees' => $this->normalizer->normalize($employees),
            'appointments' => $this->normalizer->normalize($appointments),
        ]);
    }
}
 