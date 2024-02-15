<?php

namespace App\Controller\Establishment;

use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpKernel\Attribute\AsController;
use App\Repository\AppointmentRepository;
use App\Entity\Appointment;
use App\Entity\Establishment;

#[AsController]
class GetEstablishmentAppointments
{
  public function __construct(
    protected Security $security,
    private AppointmentRepository $appointmentRepository
  ) {
    $this->appointmentRepository = $appointmentRepository;
  }

  public function __invoke(Establishment $establishment): array
  {
    $appointments = $this->appointmentRepository->findBy(
      [
        'establishment' => $establishment->getId(),
      ]
    );

    return $appointments;
  }
}
