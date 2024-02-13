<?php

namespace App\Controller\Appointment;

use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpKernel\Attribute\AsController;
use App\Repository\AppointmentRepository;
use App\Entity\Appointment;

#[AsController]
class GetAppointmentMeController
{
  public function __construct(
    protected Security $security,
    private AppointmentRepository $appointmentRepository
  ) {
    $this->appointmentRepository = $appointmentRepository;
  }

  public function __invoke(): array
  {
    $user = $this->security->getUser();
    $appointments = $this->appointmentRepository->findBy(
      [
        'client' => $user,
      ]
    );

    foreach ($appointments as $appointment) {
      foreach ($appointment->getEstablishment()->getEstablishmentPictures() as $picture) {
        $picture->setPathPicture('/establishment_picture/' . $picture->getPathPicture());
      }
    }

    return $appointments;
  }
}
