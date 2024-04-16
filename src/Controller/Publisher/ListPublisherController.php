<?php

declare(strict_types=1);

namespace App\Controller\Publisher;
use App\Entity\Publisher;
use Symfony\Component\Routing\Annotation\Route;
use App\Generic\Api\Controllers\GenericListController;

#[Route("api/publisher/list", name: "publishers_list", methods: ["GET"])]
class ListPublisherController extends GenericListController
{
    protected ?string $entity = Publisher::class;
}
