<?php

declare(strict_types=1);

namespace App\Entity\JsonMaper\Publisher;

use App\Generic\Components\AbstractJsonMapper;

class DescriptionsMapper extends AbstractJsonMapper
{
    public function jsonSchema(): array
    {
        return [
            'en' => 'string',
            'pl' => 'string',
            'fr' => 'string',
        ];
    }

    public function defaultValue(): array
    {
        return [
            'en' => '',
            'pl' => '',
            'fr' => '',
        ];
    }
}
