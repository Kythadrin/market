<?php

declare(strict_types=1);

namespace App\Entity;

use App\Repository\DistrictRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: DistrictRepository::class)]
#[ORM\Table(name: 'districts')]
class District
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private int $id;

    #[ORM\Column(length: 255, unique: true)]
    private string $name;

    #[ORM\ManyToOne(inversedBy: 'districts')]
    #[ORM\JoinColumn(nullable: false)]
    private City $city;

    public function __construct(
        string $name,
        City $city,
    ) {
        $this->name = $name;
        $this->city = $city;
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getCity(): City
    {
        return $this->city;
    }

    public function setCity(City $city): static
    {
        $this->city = $city;

        return $this;
    }
}
