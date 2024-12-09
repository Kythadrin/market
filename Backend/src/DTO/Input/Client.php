<?php

declare(strict_types=1);

namespace App\DTO\Input;

use OpenApi\Attributes as OA;

class Client
{
    public function __construct(
        #[OA\Property(type: 'string', minLength: 1, example: '9083329')]
        public string $telegramId,
    ) {
    }
}