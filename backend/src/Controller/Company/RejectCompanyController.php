<?php

namespace App\Controller\Company;

use App\Entity\Company;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;
use Symfony\Component\HttpFoundation\Request;

#[AsController]
class RejectCompanyController
{
    public function __construct(
        protected Security $security,
    ) {}

    public function __invoke(Request $request, Company $company): Company
    {
        $rejectedReason = $request->toArray()['reason'] ?? null;

        if ($rejectedReason === null) {
            throw new BadRequestException('Rejected reason is required');
        }

        if ($company->getValidatedAt() !== null) {
            throw new BadRequestException('Company is validated');
        }

        if ($company->getRejectedReason() !== null) {
            throw new BadRequestException('Company already rejected');
        }

        $company->setRejectedReason($rejectedReason);
        $company->setUpdatedAt(new \DateTimeImmutable());

        return $company;
    }
}