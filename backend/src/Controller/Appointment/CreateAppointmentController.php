<?php

namespace App\Controller\Appointment;

use App\Entity\Appointment;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpKernel\Attribute\AsController;
//use repository 
use App\Repository\AppointmentRepository;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
#[AsController]
class CreateAppointmentController
{
    public function __construct(
        protected Security $security,
        protected AppointmentRepository $appointmentRepository
    ) {}

    public function __invoke(Appointment $appointment): Appointment
    {
        $appointment->setClient($this->security->getUser());
        $serviceId = $appointment->getService()->getId();
        $startDate = $appointment->getStartDate();
        if ($this->appointmentRepository->existsForUser($this->security->getUser()->getId(), $serviceId, $startDate)) {
            throw new BadRequestHttpException('An appointment with the same service and start date already exists for this user.');
        }
        return $appointment;
    }
}