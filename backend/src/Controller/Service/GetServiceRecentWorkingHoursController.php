<?php

namespace App\Controller\Service;

use App\Entity\Service;
use App\Repository\ServiceRepository;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Doctrine\Common\Collections\ArrayCollection;

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
        //On enlève les workingHours qui sont passés !
        $responseService = $this->serviceRepository->findRecentWorkingHours($service->getId())[0] ?? $service;
        foreach ($responseService->getWorkingHoursRanges() as $workingHoursRange) {
            if ($workingHoursRange->getStartDate() < new \DateTime()) {
                $responseService->removeWorkingHoursRange($workingHoursRange);
            }
        }
        return $responseService;
    }
}