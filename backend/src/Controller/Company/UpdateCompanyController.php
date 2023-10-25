<?php

namespace App\Controller\Company;

use App\Entity\Company;
use App\Entity\User;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

#[AsController]
class UpdateCompanyController
{
    public function __construct(
        protected Security $security,
    ) {}

    public function __invoke(Company $company): Company
    {
        if ($this->security->getUser()->getCompany()->getId() !== $company->getId()) {
            throw new AccessDeniedHttpException('Vous n\'avez pas la permission de mettre à jour cette entreprise.');
        }
        return $company;
    }
}