<?php

namespace App\Repository;

use App\Entity\WorkingHoursRange;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<WorkingHoursRange>
 *
 * @method WorkingHoursRange|null find($id, $lockMode = null, $lockVersion = null)
 * @method WorkingHoursRange|null findOneBy(array $criteria, array $orderBy = null)
 * @method WorkingHoursRange[]    findAll()
 * @method WorkingHoursRange[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class WorkingHoursRangeRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, WorkingHoursRange::class);
    }

//    /**
//     * @return WorkingHoursRange[] Returns an array of WorkingHoursRange objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('w')
//            ->andWhere('w.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('w.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?WorkingHoursRange
//    {
//        return $this->createQueryBuilder('w')
//            ->andWhere('w.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
