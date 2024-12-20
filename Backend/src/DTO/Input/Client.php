<?php

declare(strict_types=1);

namespace App\DTO\Input;

use OpenApi\Attributes as OA;
use Symfony\Component\Validator\Constraints as Assert;

class Client
{
    public function __construct(
        #[OA\Property(description: 'Telegram ID of the client', type: 'string', example: '123456789')]
        #[Assert\NotBlank]
        #[Assert\Regex(pattern: "/^\d+$/", message: "Telegram ID must be numeric.")]
        public string $telegramId,
    ) {
    }
}