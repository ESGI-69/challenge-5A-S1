<?php

namespace App\Controller\Appointment;

use App\Entity\Appointment;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpKernel\Attribute\AsController;
//use repository 
use App\Repository\AppointmentRepository;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
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
        $employeeRequested = $appointment->getEmployee()->getId();
        $serviceId = $appointment->getService()->getId();
        $startDate = $appointment->getStartDate();
        $serviceDuration = $appointment->getService()->getDuration();
        if ($this->appointmentRepository->existsForUser($this->security->getUser()->getId(), $serviceId, $startDate)) {
            throw new BadRequestHttpException('An appointment with the same service and start date already exists');
        }
        $dateRequested = $startDate->format('Y-m-d');

        $isCreneauValid = false;

        // get the service->workingHoursRange where its the sameday as the startDate
        $serviceStartTime = $appointment->getService()->getWorkingHoursRanges();
        foreach($serviceStartTime as $range){
            if($range->getEmployee()->getId() != $employeeRequested){
                continue;
            }
            $rangeDate = $range->getStartDate()->format('Y-m-d');
            if($rangeDate < date('Y-m-d')){ //la date des workingHours est passée, on ignore
                continue;
            }else{
                //Ok la date des workingHours n'est pas passée, on va vérifier si c'est la meme date que la date demandé par le client
                if($rangeDate === $dateRequested){
                    //Ok on a trouvé le workingHoursRange qui correspond à la date demandé (le meme jour)
                    //On va maintenant vérifier si le timestamp de la date demandé est valide
                    if($startDate < $range->getStartDate()){
                        //la date demandé est avant le début du workingHoursRange, on ignore
                        throw new AccessDeniedHttpException('Appointment is not valid');
                        continue;
                    }else{
                        //la date demandé est après le début du workingHoursRange, on va vérifier si le timestamp est valide
                        // on va verifier tous les créneaux possible à partir de la date de début du service, en ajoutant en boucle la durée du service
                        while($range->getStartDate() < $range->getEndDate()){
                            if($range->getStartDate()->format('Y-m-d H:i:s') === $startDate->format('Y-m-d H:i:s')){
                                //on a trouvé un créneau valide !!
                                $isCreneauValid = true;
                                break;
                            }else{
                                $range->setStartDate($range->getStartDate()->add(new \DateInterval('PT' . $serviceDuration . 'M')));
                            }
                        }
                        
                        if($isCreneauValid){
                            // nice :)
                        }else{
                            // die("error, pas de créneau valide");
                            throw new AccessDeniedHttpException('Appointment is not valid');
                        }
                    }
                }

            }
        }

        if(!$isCreneauValid){
            throw new AccessDeniedHttpException('Appointment is not valid');
        }

        return $appointment;
    }
}