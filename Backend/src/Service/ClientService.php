<?php

declare(strict_types=1);

namespace App\Service;

use App\DTO\Input\Client as ClientInput;
use App\Entity\Client;
use Doctrine\ORM\EntityManagerInterface;

class ClientService
{
    public function __construct(
        private readonly EntityManagerInterface $entityManager,
    ) {
    }

    public function createClient(ClientInput $clientInput): void
    {
        $client = new Client($clientInput->telegramId);

        $this->entityManager->persist($client);
    }
}