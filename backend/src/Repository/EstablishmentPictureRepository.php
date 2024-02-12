<?php

namespace App\Repository;

use App\Entity\EstablishmentPicture;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<EstablishmentPicture>
 *
 * @method EstablishmentPicture|null find($id, $lockMode = null, $lockVersion = null)
 * @method EstablishmentPicture|null findOneBy(array $criteria, array $orderBy = null)
 * @method EstablishmentPicture[]    findAll()
 * @method EstablishmentPicture[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class EstablishmentPictureRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, EstablishmentPicture::class);
    }

//    /**
//     * @return EstablishmentPicture[] Returns an array of EstablishmentPicture objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('e')
//            ->andWhere('e.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('e.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?EstablishmentPicture
//    {
//        return $this->createQueryBuilder('e')
//            ->andWhere('e.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
