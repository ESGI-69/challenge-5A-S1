<?php

namespace App\Repository;

use App\Entity\SubFeedback;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<SubFeedback>
 *
 * @method SubFeedback|null find($id, $lockMode = null, $lockVersion = null)
 * @method SubFeedback|null findOneBy(array $criteria, array $orderBy = null)
 * @method SubFeedback[]    findAll()
 * @method SubFeedback[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SubFeedbackRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, SubFeedback::class);
    }

    public function countSubFeedBacksByFeedbackType(int $feedbackTypeId): int
    {
        return $this->createQueryBuilder('s')
            ->select('count(s.id)')
            ->andWhere('s.feedbackType = :feedbackTypeId')
            ->setParameter('feedbackTypeId', $feedbackTypeId)
            ->getQuery()
            ->getSingleScalarResult();
    }

//    /**
//     * @return SubFeedback[] Returns an array of SubFeedback objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('s.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?SubFeedback
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
