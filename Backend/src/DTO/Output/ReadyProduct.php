<?php

declare(strict_types=1);

namespace App\DTO\Output;

use App\Entity\ReadyProduct as ReadyProductEntity;
use OpenApi\Attributes as OA;

class ReadyProduct
{
    public function __construct(
        #[OA\Property(description: 'Id', type: 'integer')]
        public int $id,
        #[OA\Property(description: 'Quantity', example: '1')]
        public float $quantity,
        #[OA\Property(description: 'Price', example: '1000.00')]
        public string $price,
        #[OA\Property(description: 'Product name', example: 'Product')]
        public string $productName,
    ) {
    }

    public static function createFromEntity(ReadyProductEntity $product): self
    {
        return new self(
            id: $product->getId(),
            quantity: $product->getQuantity(),
            price: $product->getPrice(),
            productName: $product->getProductVariant()->getName(),
        );
    }
}