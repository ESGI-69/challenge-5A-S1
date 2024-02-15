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

    $treatedEstablishments = [];

    foreach ($appointments as $appointment) {
      foreach ($appointment->getEstablishment()->getEstablishmentPictures() as $picture) {
        if ( !preg_match('/establishment_picture\/.*/', $picture->getPathPicture()) ) {
          $picture->setPathPicture('/establishment_picture/' . $picture->getPathPicture());
        }
      }

      if ( !empty($appointment->getEmployee()) && !preg_match('/\/avatar_employee\//', $appointment->getEmployee()->getAvatar()) ) {
        $appointment->getEmployee()->setAvatar('/avatar_employee/'.$appointment->getEmployee()->getAvatar());
      }
    }

    return $appointments;
  }
}
