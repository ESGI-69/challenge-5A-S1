<?php

namespace App\Controller\Company;

use App\Entity\Company;
use ApiPlatform\Doctrine\Orm\Paginator;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class MapLogoCompanyPath
{
    public function __construct()
    {
    }

    public function __invoke($data): array
    {
        foreach ($data as $company) {
            $company->setLogoPath('/company_logo/'.$company->getLogoPath());

            foreach ($company->getEmployees() as $employee) {
                if (!empty($employee->getAvatar()) && !preg_match('/\/avatar_employee\//', $employee->getAvatar())) {
                    $employee->setAvatar('/avatar_employee/'.$employee->getAvatar());
                }
            }
        }

        return $data;
    }
}