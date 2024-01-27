<?php

namespace App\Repository;

use App\Entity\FeedbackType;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<FeedbackType>
 *
 * @method FeedbackType|null find($id, $lockMode = null, $lockVersion = null)
 * @method FeedbackType|null findOneBy(array $criteria, array $orderBy = null)
 * @method FeedbackType[]    findAll()
 * @method FeedbackType[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class FeedbackTypeRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, FeedbackType::class);
    }

//    /**
//     * @return FeedbackType[] Returns an array of FeedbackType objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('f')
//            ->andWhere('f.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('f.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?FeedbackType
//    {
//        return $this->createQueryBuilder('f')
//            ->andWhere('f.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
