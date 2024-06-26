<?php

namespace App\Generic\Web\Controllers;

use App\Generic\Web\Trait\GenericGetTrait;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class GenericDetailController extends AbstractController
{
    use GenericGetTrait;

    protected int $id;
    protected EntityManagerInterface $entityManager;

    /** @var EntityRepository<object> */
    protected EntityRepository $repository;
    protected object $item;

    public function __invoke(EntityManagerInterface $entityManager, int $id): Response
    {
        $this->initialize($entityManager, $id);

        return $this->showAction();
    }

    protected function initialize(EntityManagerInterface $entityManager, int $id): void
    {
        $this->checkData();
        $this->entityManager = $entityManager;
        $this->id = $id;
        $this->repository = $this->entityManager->getRepository($this->entity);
    }

    private function getQuery(): object
    {
        $this->beforeQuery();

        $queryBuilder = $this->repository->find($this->id);

        if (!$queryBuilder) {
            throw $this->createNotFoundException('Not Found');
        }

        $this->afterQuery();

        return $queryBuilder;
    }

    /**
     * @return array<mixed>
     */
    private function getAttributes(): array
    {
        $this->item = $this->getQuery();
        $attributes['object'] = $this->item;

        return array_merge($attributes, $this->onSetAttribute());
    }

    private function showAction(): Response
    {
        return $this->render($this->twig, $this->getAttributes());
    }
}
