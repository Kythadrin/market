<?php

declare(strict_types=1);

namespace App\Service;

use App\Entity\Admin;
use Symfony\Component\PasswordHasher\PasswordHasherInterface;

class PasswordHasherService
{
    public function __construct(
        private readonly PasswordHasherInterface $passwordHasher,
    ) {
    }

    public function hashPassword(Admin $user, string $plainPassword): void
    {
        $hashedPassword = $this->passwordHasher->hash($plainPassword);
        $user->setPassword($hashedPassword);
    }

    public function verifyPassword(string $plainPassword, string $hashedPassword): bool
    {
        return $this->passwordHasher->verify($hashedPassword, $plainPassword);
    }
}