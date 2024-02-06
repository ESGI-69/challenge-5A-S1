<?php

namespace App\Controller\Service;

use App\Entity\Service;
use App\Repository\ServiceRepository;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class GetServiceRecentWorkingHoursController
{
    private $serviceRepository;
    
    public function __construct(ServiceRepository $serviceRepository)
    {
        $this->serviceRepository = $serviceRepository;
    }

    public function __invoke(Service $service): Service
    {
        // return $service;
        return $this->serviceRepository->findRecentWorkingHours($service->getId())[0];
    }
}