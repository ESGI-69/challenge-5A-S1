<?php

namespace App\Controller\Service;

use App\Entity\Service;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;

#[AsController]
class ValidateServiceController
{
    public function __construct(
        protected Security $security,
    ) {}

    public function __invoke(Service $service): Service
    {
        if ($service->getValidatedAt() !== null) {
            throw new BadRequestException('This service is already validated');
        }
        $service->setValidatedAt(new \DateTimeImmutable());
        $service->setValidatedBy($this->security->getUser());
        return $service;
    }
}