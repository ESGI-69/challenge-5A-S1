<?php

namespace App\Controller\Establishment;

use App\Entity\Establishment;
use App\Entity\Appointment;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Doctrine\ORM\EntityManagerInterface;

#[AsController]
class GetLastAppointmentsController
{
    public function __construct(
        protected Security $security,
        protected EntityManagerInterface $entityManager
    ) {}

    public function __invoke(Establishment $establishment): array
    {
        $user = $this->security->getUser();
        $appointments = $this->entityManager->getRepository(Appointment::class)
            ->createQueryBuilder('a')
            ->where('a.establishment = :establishment')
            ->andWhere('a.client = :client')
            ->andWhere('a.cancelledAt IS NULL')
            ->andWhere('a.startDate < :now')
            ->setParameter('establishment', $establishment)
            ->setParameter('client', $user)
            ->setParameter('now', new \DateTime())
            ->orderBy('a.startDate', 'DESC')
            ->setMaxResults(2)
            ->getQuery()
            ->getResult();

        return $appointments;
    }
}