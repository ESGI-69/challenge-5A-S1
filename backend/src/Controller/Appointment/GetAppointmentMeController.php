<?php

namespace App\Controller\Appointment;

use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpKernel\Attribute\AsController;
use App\Repository\AppointmentRepository;

#[AsController]
class GetAppointmentMeController
{
  public function __construct(
    protected Security $security,
    private AppointmentRepository $appointmentRepository
  ) {
    $this->appointmentRepository = $appointmentRepository;
  }

  public function __invoke(string $id): array
  {
    $user = $this->security->getUser();
    $establishmentId = $id;
    $appointments = $this->appointmentRepository->findBy(
      [
        'client' => $user,
        'establishment' => $establishmentId,
      ]
    );

    return $appointments;
  }
}
