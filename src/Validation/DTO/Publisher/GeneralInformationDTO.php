<?php

declare(strict_types=1);

namespace App\Validation\DTO\Publisher;

use App\Generic\Api\Interfaces\DTO;
use App\Validation\Validator\Cuman as CustomAssert;
use Symfony\Component\Validator\Constraints as Assert;

class GeneralInformationDTO implements DTO
{
    /**
     * @Assert\NotBlank(message="emptyField")
     */
    public ?string $name = null;

    public string $founded = '';

    public string $headquarter = '';

    public string $origin = '';

    /**
     * @CustomAssert\Url
     */
    public ?string $website = '';

    /**
     * @param array{
     *     name?: string,
     *     founded?: string,
     *     headquarter?: string,
     *     origin?: string,
     *     website?: string
     * } $data
     */
    public function __construct(array $data = [])
    {
        $this->name = $data['name'] ?? $this->name;
        $this->founded = $data['founded'] ?? $this->founded;
        $this->headquarter = $data['headquarter'] ?? $this->headquarter;
        $this->origin = $data['origin'] ?? $this->origin;
        $this->website = $data['website'] ?? $this->website;
    }

    /**
     * @param mixed[] $components
     */
    public function setComponentsData(array $components): void
    {
    }
}
