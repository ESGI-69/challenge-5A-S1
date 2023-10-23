<?php

namespace App\Controller\Service;

use App\Entity\Service;
use App\Repository\ServiceRepository;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class GetValidatedServicesController
{
    private $serviceRepository;
    
    public function __construct(ServiceRepository $serviceRepository)
    {
        $this->serviceRepository = $serviceRepository;
    }

    public function __invoke(): iterable
    {
        return $this->serviceRepository->findValidated();
    }
}