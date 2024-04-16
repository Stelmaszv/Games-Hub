<?php

declare(strict_types=1);

namespace App\Entity\JsonMaper\Publisher;

use App\Generic\Components\AbstractJsonMapper;

class PublisherDescriptionsMapper  extends AbstractJsonMapper
{
    public function jsonSchema(): array
    {
        return [
            "eng" => "string",
            "pl" =>"string",
            "fr" => "string"
        ];
    }

    public function defaultValue(): array
    {
        return [
            "eng" => "",
            "pl" =>"",
            "fr" =>""
        ];
    }
}