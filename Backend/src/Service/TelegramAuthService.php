<?php

declare(strict_types=1);

namespace App\Service;

use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

class TelegramAuthService
{
    public function __construct(
        #[Autowire('%env(TELEGRAM_BOT_TOKEN)%')]
        private readonly string $botToken,
    ) {
    }

    public function validateBotToken(string $token): true
    {
        if ($token !== $this->botToken) {
            throw new UnauthorizedHttpException("Invalid Telegram bot token.");
        }

        return true;
    }
}