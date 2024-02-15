<?php

namespace App\Controller\Company;

use App\Entity\Company;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class MapEmployeeAvatarPath
{
    public function __construct()
    {
    }

    public function __invoke(Company $company): Company
    {

        foreach ($company->getEmployees() as $employee) {
            if (!empty($employee->getAvatar()) && !preg_match('/\/avatar_employee\//', $employee->getAvatar())) {
                $employee->setAvatar('/avatar_employee/'.$employee->getAvatar());
            }
        }

        return $company;
    }
}