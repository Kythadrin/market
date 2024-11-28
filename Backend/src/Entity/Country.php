<?php

declare(strict_types=1);

namespace App\Entity;

use App\Repository\CountryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CountryRepository::class)]
#[ORM\Table(name: 'countries')]
class Country
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private int $id;

    #[ORM\Column(length: 255, unique: true)]
    private string $name;

    /** @var Collection<int, City> */
    #[ORM\OneToMany(targetEntity: City::class, mappedBy: 'country')]
    private Collection $Cities;

    public function __construct()
    {
        $this->Cities = new ArrayCollection();
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

    /** @return Collection<int, City> */
    public function getCities(): Collection
    {
        return $this->Cities;
    }

    public function addCity(City $city): static
    {
        if (!$this->Cities->contains($city)) {
            $this->Cities->add($city);
            $city->setCountry($this);
        }

        return $this;
    }
}
