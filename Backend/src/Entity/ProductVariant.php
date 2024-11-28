<?php

declare(strict_types=1);

namespace App\Entity;

use Symfony\Component\Validator\Constraints as Assert;
use App\Repository\ProductVariantRepository;
use DateTimeImmutable;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ProductVariantRepository::class)]
#[ORM\Table(name: 'product_variants')]
class ProductVariant
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private int $id;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    private string $name;

    #[ORM\ManyToOne(inversedBy: 'variants')]
    #[ORM\JoinColumn(nullable: false)]
    private Product $product;

    #[ORM\Column]
    private DateTimeImmutable $created_at;

    #[ORM\Column(nullable: true)]
    private ?DateTimeImmutable $updated_at = null;

    public function __construct(
        string $name,
        Product $product,
    ) {
        $this->name = $name;
        $this->product = $product;
        $this->created_at = new DateTimeImmutable();
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

    public function getProduct(): Product
    {
        return $this->product;
    }

    public function setProduct(Product $product): static
    {
        $this->product = $product;

        return $this;
    }

    public function getCreatedAt(): DateTimeImmutable
    {
        return $this->created_at;
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
