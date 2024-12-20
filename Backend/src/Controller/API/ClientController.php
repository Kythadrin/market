<?php

declare(strict_types=1);

namespace App\Controller\API;

use App\DTO\Input\Client as ClientInput;
use App\DTO\Output\Client as ClientOutput;
use App\Service\ClientService;
use App\Entity\Client;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use OpenApi\Attributes as OA;

class ClientController
{
    public function __construct(
        private readonly EntityManagerInterface $entityManager,
        private readonly ClientService $clientService,
    ) {
    }

    #[Route(path: '/api/client', methods: ['POST'])]
    #[OA\Post(description: 'Creates a new client and returns success status.', summary: 'Create a new client')]
    #[OA\RequestBody(required: true, content: new OA\JsonContent(ref: ClientInput::class))]
    #[OA\Response(
        response: Response::HTTP_CREATED,
        description: 'Client created successfully',
        content: new OA\MediaType(
            mediaType: 'text/plain',
            schema: new OA\Schema(type: 'string', example: 'Client created successfully!')
        )
    )]
    public function create(Request $request): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);
            $client = new ClientInput($data['telegramId']);
            $client = $this->clientService->create($client);

            $this->entityManager->flush();
        } catch (Exception $exception) {
            return new JsonResponse('Something went wrong!', Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return new JsonResponse(ClientOutput::createFromEntity($client), Response::HTTP_CREATED);
    }

    #[Route(path: '/api/client/{telegramId}', methods: ['GET'])]
    #[OA\Get(description: 'Get a client by id.', summary: 'Get a client')]
    #[OA\Parameter(name: 'telegramId', description: 'The Telegram ID of the client to retrieve', in: 'path', required: true)]
    #[OA\Response(
        response: Response::HTTP_OK,
        description: 'Client created successfully',
        content: new OA\JsonContent(
            ref: ClientOutput::class
        )
    )]
    public function get(string $telegramId): JsonResponse
    {
        try {
            $client = $this->clientService->findByTelegramId($telegramId);

            if ($client === null) {
                return new JsonResponse('Client not found!', Response::HTTP_NOT_FOUND);
            }

            $clientData = new ClientOutput(
                $client->getId(),
                $client->getTelegramId(),
                $client->getBalance(),
                $client->getOrders()->toArray(),
                $client->getCreatedAt()
            );

        } catch (Exception $exception) {
            return new JsonResponse('Something went wrong!', Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return new JsonResponse($clientData, Response::HTTP_OK);
    }

    #[Route(path: '/api/client', methods: ['GET'])]
    #[OA\Get(description: 'Get a client list.', summary: 'Get a list of clients')]
    #[OA\Response(
        response: Response::HTTP_OK,
        description: 'Client created successfully',
        content: new OA\JsonContent(
            type: 'array',
            items: new OA\Items(ref: ClientOutput::class)
        )
    )]
    public function getList(): JsonResponse
    {
        try {
            $clientList = $this->clientService->getList();
        } catch (Exception $exception) {
            return new JsonResponse('Something went wrong!', Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return new JsonResponse($clientList, Response::HTTP_OK);
    }
}