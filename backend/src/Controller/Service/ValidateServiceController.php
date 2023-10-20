<?php

namespace App\Controller\Service;

use App\Entity\Service;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class ValidateServiceController
{
    public function __construct(
        protected Security $security,
    ) {}

    public function __invoke(Service $service): Service
    {
        $service->setValidatedAt(new \DateTimeImmutable());
        $service->setValidatedBy($this->security->getUser());
        return $service;
    }
}