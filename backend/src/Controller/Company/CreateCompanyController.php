<?php

namespace App\Controller\Company;

use App\Entity\Company;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class CreateCompanyController
{
    public function __construct(
        protected Security $security,
    ) {}

    public function __invoke(Company $company): Company
    {

        $user = $this->security->getUser();
        $company->addUser($user);
        $company->setCreatedAt(new \DateTimeImmutable());
        $company->setUpdatedAt(new \DateTimeImmutable());

        // If the user is an admin, the company is automatically validated
        if ($this->security->isGranted('ROLE_ADMIN')) {
            $company->setValidatedAt(new \DateTimeImmutable());
        }
        return $company;
    }
}