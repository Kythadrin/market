<?php

declare(strict_types=1);

namespace App\Entity;

use Symfony\Component\Validator\Constraints as Assert;
use App\Repository\ReadyProductRepository;
use DateTimeImmutable;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ReadyProductRepository::class)]
#[ORM\Table(name: 'ready_products')]
class ReadyProduct
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private int $id;

    #[ORM\Column]
    #[Assert\Positive]
    private float $quantity;

    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 2)]
    #[Assert\Positive]
    private string $price;

    #[ORM\Column(type: Types::DECIMAL, precision: 9, scale: 6, nullable: true)]
    #[Assert\Range(
        minMessage: "Latitude must be at least {{ limit }}.",
        maxMessage: "Latitude cannot be greater than {{ limit }}.",
        min: "-90", max: "90",
    )]
    private ?string $latitude = null;

    #[Assert\Range(
        minMessage: "Longitude  must be at least {{ limit }}.",
        maxMessage: "Longitude  cannot be greater than {{ limit }}.",
        min: "-180", max: "180",
    )]
    #[ORM\Column(type: Types::DECIMAL, precision: 9, scale: 6, nullable: true)]
    private ?string $longitude = null;

    #[ORM\Column(type: Types::JSON)]
    private array $photos = [];

    #[ORM\ManyToOne(inversedBy: 'Orders')]
    private ?Client $client = null;

    #[ORM\Column(length: 100)]
    private string $contract_address;

    #[ORM\Column]
    private DateTimeImmutable $created_at;

    #[ORM\Column(nullable: true)]
    private ?DateTimeImmutable $updated_at = null;

    public function getId(): int
    {
        return $this->id;
    }

    public function getQuantity(): float
    {
        return $this->quantity;
    }

    public function setQuantity(float $quantity): static
    {
        $this->quantity = $quantity;

        return $this;
    }

    public function getPrice(): float
    {
        return $this->price;
    }

    public function setPrice(float $price): static
    {
        $this->price = $price;

        return $this;
    }

    public function getLatitude(): ?string
    {
        return $this->latitude;
    }

    public function setLatitude(?string $latitude): static
    {
        $this->latitude = $latitude;

        return $this;
    }

    public function getLongitude(): ?string
    {
        return $this->longitude;
    }

    public function setLongitude(?string $longitude): static
    {
        $this->longitude = $longitude;

        return $this;
    }

    /** @return string[] */
    public function getCoordinates(): array
    {
        if ($this->latitude == null || $this->longitude === null) {
            return [];
        }

        return [$this->latitude, $this->longitude];
    }

    public function setCoordinates(string $coordinates): static
    {
        $coordinatesArray = preg_split('/[\s,;]+/', $coordinates);

        $this->latitude = $coordinatesArray[0];
        $this->longitude = $coordinates[1];

        return $this;

    }

    /** @return string[] */
    public function getPhotos(): array
    {
        return $this->photos;
    }

    /** @param string[] $photos */
    public function setPhotos(array $photos): static
    {
        $this->photos = $photos;

        return $this;
    }

    public function addPhoto(string $photo): static
    {
        $this->photos[] = $photo;

        return $this;
    }

    public function getClient(): ?Client
    {
        return $this->client;
    }

    public function setClient(?Client $client): static
    {
        $this->client = $client;

        return $this;
    }

    public function getContractAddress(): string
    {
        return $this->contract_address;
    }

    public function setContractAddress(string $contract_address): static
    {
        $this->contract_address = $contract_address;

        return $this;
    }

    public function getCreatedAt(): DateTimeImmutable
    {
        return $this->created_at;
    }

    public function setCreatedAt(DateTimeImmutable $created_at): static
    {
        $this->created_at = $created_at;

        return $this;
    }

    public function getUpdatedAt(): ?DateTimeImmutable
    {
        return $this->updated_at;
    }

    public function setUpdatedAt(?DateTimeImmutable $updated_at): static
    {
        $this->updated_at = $updated_at;

        return $this;
    }
}
