<?php

declare(strict_types=1);

namespace App\Repository;

use App\Entity\City;
use App\Entity\Country;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<City>
 */
class CityRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, City::class);
    }

    public function findAllByCountry(Country $country): City
    {
        /** @var City $city */
        $city = $this->createQueryBuilder('c')
            ->andWhere('c.country = :country')
            ->setParameter('country', $country)
            ->orderBy('c.id', 'ASC')
            ->getQuery()
            ->getResult()
        ;

        return $city;
    }
}
