<?php

declare(strict_types=1);

namespace App\Validation\DTO\Developer;

use App\Generic\Api\Interfaces\DTO;
use Symfony\Component\Validator\Constraints as Assert;

class PublisherDTO implements DTO
{
    /**
     * @Assert\NotBlank
     */
    public ?int $id = null;

    /**
     * @param mixed[] $components an array of strings representing components data
     */
    public function setComponentsData(array $components): void
    {
    }
}
