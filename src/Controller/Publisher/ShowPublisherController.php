<?php

declare(strict_types=1);

namespace App\Controller\Publisher;
use App\Entity\Publisher;
use Symfony\Component\Routing\Annotation\Route;
use App\Generic\Api\Controllers\GenericDetailController;

#[Route("api/publisher/show/{id}", name: "publisher_show", methods: ["GET"])]
class ShowPublisherController extends GenericDetailController
{
    protected ?string $entity = Publisher::class;

}