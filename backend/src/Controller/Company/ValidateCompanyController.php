<?php

namespace App\Controller\Company;

use App\Entity\Company;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class ValidateCompanyController
{
    public function __construct(
        protected Security $security,
    ) {}

    public function __invoke(Company $company): Company
    {


        $company->setRejectedReason(null);
        $companyUsers = $company->getUsers();

        foreach ($companyUsers as $user) {
            $user->setRoles(['ROLE_PRESTA']);
        }

        $company->setValidatedAt(new \DateTimeImmutable());
        return $company;
    }
}