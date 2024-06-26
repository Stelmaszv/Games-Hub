<?php

declare(strict_types=1);

namespace App\Controller\Publisher\List;

use App\Entity\Publisher;
use App\Generic\Api\Controllers\GenericListController;
use App\Security\Atribute;
use Symfony\Component\Routing\Annotation\Route;

#[Route('api/publisher/list', name: 'publishers_list', methods: ['GET'])]
class ListPublisherController extends GenericListController
{
    protected ?string $entity = Publisher::class;

    /**
     * @var array<string>
     */
    protected array $columns = ['id', 'generalInformation'];

    protected ?string $voterAttribute = Atribute::CAN_LIST_PUBLISHERS;
}
