<?php

declare(strict_types=1);

namespace App\Controller\API;

use App\DTO\Input\Client as ClientInput;
use App\Service\ClientService;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use OpenApi\Attributes as OA;

class Client
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
    public function createClient(ClientInput $client): Response
    {
        try {
            $this->clientService->createClient($client);

            $this->entityManager->flush();
        } catch (Exception $exception) {
            return new Response('Something went wrong!', Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return new Response('Client created successfully!', Response::HTTP_CREATED);
    }
}