<?php

declare(strict_types=1);

namespace App\Entity;

use Symfony\Component\Validator\Constraints as Assert;
use App\Repository\ClientRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ClientRepository::class)]
#[ORM\Table(name: 'clients')]
class Client
{
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: "AUTO")]
    #[ORM\Column]
    private int $id;

    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 2)]
    #[Assert\Positive]
    #[Assert\NotBlank]
    private string $balance;

    #[ORM\Column(type: Types::BIGINT)]
    private string $telegramId;

    /** @var Collection<int, ReadyProduct> */
    #[ORM\OneToMany(targetEntity: ReadyProduct::class, mappedBy: 'client')]
    private Collection $Orders;

    public function __construct()
    {
        $this->Orders = new ArrayCollection();
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function getBalance(): string
    {
        return $this->balance;
    }

    public function setBalance(string $balance): static
    {
        $this->balance = $balance;

        return $this;
    }

    public function getTelegramId(): string
    {
        return $this->telegramId;
    }

    public function setTelegramId(string $telegramId): static
    {
        $this->telegramId = $telegramId;

        return $this;
    }

    /**
     * @return Collection<int, ReadyProduct>
     */
    public function getOrders(): Collection
    {
        return $this->Orders;
    }

    public function addOrder(ReadyProduct $order): static
    {
        if (!$this->Orders->contains($order)) {
            $this->Orders->add($order);
            $order->setClient($this);
        }

        return $this;
    }

    public function removeOrder(ReadyProduct $order): static
    {
        if ($this->Orders->removeElement($order)) {
            // set the owning side to null (unless already changed)
            if ($order->getClient() === $this) {
                $order->setClient(null);
            }
        }

        return $this;
    }
}
