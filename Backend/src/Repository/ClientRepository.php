<?php

declare(strict_types=1);

namespace App\Repository;

use App\Entity\Client;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Client>
 */
class ClientRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Client::class);
    }

    public function findByTelegramId(string $telegramId): Client
    {
        /** @var Client $client */
        $client = $this->createQueryBuilder('c')
            ->andWhere('c.telegramId = :telegramId')
            ->setParameter('telegramId', $telegramId)
            ->orderBy('c.id', 'ASC')
            ->getQuery()
            ->getOneOrNullResult()
        ;

        return $client;
    }

    /** @return Client[] */
    public function getList(): array
    {
        /** @var Client[] $list */
        $list = $this->createQueryBuilder('c')
            ->andWhere('c.isActive = :isActive')
            ->setParameter('isActive', true)
            ->orderBy('c.created_at', 'ASC')
            ->getQuery()
            ->getResult()
        ;

        return $list;
    }


//    /**
//     * @return Client[] Returns an array of Client objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('c.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Client
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
