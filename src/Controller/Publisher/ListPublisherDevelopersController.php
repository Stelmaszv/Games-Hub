<?php

declare(strict_types=1);

namespace App\Controller\Publisher;

use App\Entity\Developer;
use App\Entity\Publisher;
use Symfony\Component\Routing\Annotation\Route;
use App\Generic\Api\Controllers\GenericListController;
use App\Generic\Api\Controllers\GenericListRelationController;

#[Route("api/publisher/developers/{id}", name: "publisher_developers_list", methods: ["GET"])]
class ListPublisherDevelopersController extends GenericListRelationController
{
    protected ?string $entity = Publisher::class;
    protected ?string $entityLiteration = Developer::class;

    protected ?string $relationMethod = 'getDeveloper'; 
}
