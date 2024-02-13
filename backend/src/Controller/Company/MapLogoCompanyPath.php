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

    public function __invoke($data): Paginator
    {
        foreach ($data as $company) {
            $company->setLogoPath('/company_logo/'.$company->getLogoPath());
        }

        return $data;
    }
}