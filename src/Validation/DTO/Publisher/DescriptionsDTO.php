<?php

declare(strict_types=1);

namespace App\Validation\DTO\Publisher;

use App\Generic\Api\Interfaces\DTO;
use Symfony\Component\Validator\Constraints as Assert;

class DescriptionsDTO implements DTO
{
    /**
     * @Assert\NotNull
     */
    public string $en = '';

    /**
     * @Assert\NotNull
     */
    public string $pl = '';

    /**
     * @Assert\NotNull
     */
    public string $fr = '';

    /**
     * @param string[] $data
     */
    public function __construct(array $data = [])
    {
        $this->en = $data['en'] ?? '';
        $this->pl = $data['pl'] ?? '';
        $this->fr = $data['fr'] ?? '';
    }

    /**
     * @param mixed[] $components an array of strings representing components data
     */
    public function setComponentsData(array $components): void
    {
    }
}
