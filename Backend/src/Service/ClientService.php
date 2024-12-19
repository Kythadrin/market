<?php

declare(strict_types=1);

namespace App\Service;

use App\DTO\Input\Client as ClientInput;
use App\DTO\Output\Client as ClientOutput;
use App\Entity\Client;
use App\Repository\ClientRepository;
use Doctrine\ORM\EntityManagerInterface;

class ClientService
{
    public function __construct(
        private readonly EntityManagerInterface $entityManager,
        private readonly ClientRepository $clientRepository,
    ) {
    }

    public function create(ClientInput $clientInput): Client
    {
        $client = $this->clientRepository->findByTelegramId($clientInput->telegramId);

        if ($client === null) {
            $client = new Client($clientInput->telegramId);

            $this->entityManager->persist($client);
        }

        return $client;
    }

    public function getList(): array
    {
        $list = $this->clientRepository->getList();

        $clientList = [];
        foreach ($list as $client) {
            $clientList = new ClientOutput(
                $client->getId(),
                $client->getTelegramId(),
                $client->getBalance(),
            );
        }

        return $clientList;
    }
}