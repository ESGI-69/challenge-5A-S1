<?php

namespace App\Controller\Appointment;

use App\Entity\Appointment;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class CreateAppointmentController
{
    public function __construct(
        protected Security $security,
    ) {}

    public function __invoke(Appointment $appointment): Appointment
    {
        $appointment->setClient($this->security->getUser());
        return $appointment;
    }
}