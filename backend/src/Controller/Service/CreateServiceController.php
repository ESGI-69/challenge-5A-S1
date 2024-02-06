<?php

namespace App\Controller\Service;

use App\Entity\Service;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class CreateServiceController
{
    public function __construct(
        protected Security $security,
    ) {}

    public function __invoke(Service $service): Service
    {
        $service->setAuthor($this->security->getUser());
        // If the user is an admin, the service is automatically validated
        // if ($this->security->isGranted('ROLE_ADMIN')) {
            $service->setValidatedAt(new \DateTimeImmutable());
            $service->setValidatedBy($this->security->getUser());
        // }
        return $service;
    }
}