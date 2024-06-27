<?php

declare(strict_types=1);

namespace App\Validation\DTO\Publisher;

use App\Generic\Api\Interfaces\DTO;
use App\Validation\Validator\Publisher as CustomAssert;
use Symfony\Component\Validator\Constraints as Assert;

class DescriptionsUrlsDTO implements DTO
{
    /**
     * @Assert\Url(message="invalidUrl")
     *
     * @CustomAssert\ScraperPublisherUrl
     */
    public ?string $url = null;

    /**
     * @Assert\NotBlank
     */
    public ?string $lng = null;

    /**
     * @param mixed[] $components
     */
    public function setComponentsData(array $components): void
    {
    }
}
