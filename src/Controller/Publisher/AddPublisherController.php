<?php

declare(strict_types=1);

namespace App\Controller\Publisher;
use App\Entity\Publisher;
use App\Validation\DTO\PublisherDTO;
use App\Generic\Api\Controllers\GenericCreateController;
use Symfony\Component\Routing\Annotation\Route;

/**
    * @Route("api/publisher/add", name="publisher_add", methods={"POST"})
*/
class AddPublisherController extends GenericCreateController
{
    protected ?string $entity = Publisher::class;
    protected ?string $dto = PublisherDTO::class;
}
