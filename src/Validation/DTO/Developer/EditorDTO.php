<?php

declare(strict_types=1);

namespace App\Validation\DTO\Developer;

use App\Generic\Api\Interfaces\DTO;

class EditorDTO implements DTO
{
    /**
     * @Assert\NotBlank
     */
    public ?int $id = null;

    public function setComponnetsData(array $componnets)
    {
    }
}
