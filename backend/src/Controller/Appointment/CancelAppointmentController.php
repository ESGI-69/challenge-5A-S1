<?php

namespace App\Controller\Appointment;

use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpKernel\Attribute\AsController;
use App\Entity\Appointment;

#[AsController]
class CancelAppointmentController
{
  public function __construct(
    protected Security $security,
  ) {
  }

  public function __invoke(Appointment $appointment): Appointment
  {
    $appointment->setCancelledAt(new \DateTimeImmutable());

    return $appointment;
  }
}
