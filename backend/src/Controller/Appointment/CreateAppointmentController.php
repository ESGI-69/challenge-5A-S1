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
        if ($this->appointmentRepository->existsForUser($this->security->getUser()->getId(), $serviceId, $startDate, $employeeRequested)) {
            throw new BadRequestHttpException('An appointment with the same service and start date already exists');
        }
        $dateRequested = $startDate->format('Y-m-d');
        $isCreneauValid = false;
        $latestRange = null;

        //On récupère les workingHoursRanges
        $serviceStartTime = $appointment->getService()->getWorkingHoursRanges();
        foreach($serviceStartTime as $range){

            //on check si la date donnée ne dépasse pas les 2 semaines
            if($startDate->format('Y-m-d') > date('Y-m-d', strtotime('+2 weeks'))){
                throw new AccessDeniedHttpException('Appointment is not valid 1');
            }
            //check if date is not in the past
            if($startDate < new \DateTime()){
                // die("date demandé est dans le passé". $startDate->format('Y-m-d H:i:s'));
                throw new AccessDeniedHttpException('Appointment is not valid 2');
            }
            //check if $startDate is the same day (name of the day) as the range->getDay()
            if(strtolower($startDate->format('l')) !== $range->getDay()){
                continue;
            }else{
                // die("ok, c'est le meme jour! on laisse passer");
            }
            
            if($range->getEmployee()->getId() != $employeeRequested){
                continue;
            }
            $rangeDate = $range->getStartDate()->format('H:i');
            $rangeDateEnd = $range->getEndDate()->format('H:i');
                    //Ok on a trouvé le workingHoursRange qui correspond à la date demandé (le meme jour)
                    //On va maintenant vérifier si le timestamp de la date demandé est valide
                    if($startDate->format('H:i') < $rangeDate || $startDate->format('H:i') > $rangeDateEnd){
                        //le time demandé est avant/après le début du time workingHoursRange, on ignore
                        // die("debug : ". $startDate->format('H:i') . " < " . $rangeDate . " || " . $startDate->format('H:i') . " > " . $rangeDateEnd);
                        throw new AccessDeniedHttpException('Appointment is not valid 3');
                        continue;
                    }else{
                        //la date demandé est dans une periode valide, on continue de verifier
                        // on va verifier tous les créneaux possible à partir de la date de début du service, en ajoutant en boucle la durée du service
                        $generatedStartDate = $range->getStartDate();
                        $generatedEndDate = $range->getEndDate();

                        //change les dates générées avec la date de startDate (en gardant le time)
                        $generatedStartDate->setDate($startDate->format('Y'), $startDate->format('m'), $startDate->format('d'));
                        $generatedEndDate->setDate($startDate->format('Y'), $startDate->format('m'), $startDate->format('d'));

                        while($generatedStartDate < $generatedEndDate){
                            
                            if($generatedStartDate->format('Y-m-d H:i:s') === $startDate->format('Y-m-d H:i:s')){
                                //on a trouvé un créneau valide !!
                                $isCreneauValid = true;
                                break;
                            }else{
                                // $range->setStartDate($range->getStartDate()->add(new \DateInterval('PT' . $serviceDuration . 'M')));
                                $generatedStartDate->add(new \DateInterval('PT' . $serviceDuration . 'M'));
                            }
                        }
                        
                        if($isCreneauValid){
                            return $appointment;
                            // nice :)
                        }else{
                            throw new AccessDeniedHttpException('Appointment is not valid 4');
                        }
                    }

        }

        if(!$isCreneauValid){
            throw new AccessDeniedHttpException('Appointment is not valid 5, current range : ' . $latestRange->getStartDate()->format('Y-m-d H:i:s') . ' - ' . $startDate->format('Y-m-d H:i:s'));
        }

        return $appointment;
    }
}