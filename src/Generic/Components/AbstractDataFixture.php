<?php

declare(strict_types=1);

namespace App\Generic\Components;

use App\Generic\Api\Interfaces\ApiInterface;
use Doctrine\ORM\EntityManager;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Console\Output\ConsoleOutput;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

abstract class AbstractDataFixture
{
    protected UserPasswordHasherInterface $passwordEncoder;
    protected ObjectManager $objectManager;
    protected ManagerRegistry $managerRegistry;
    protected EntityManager $entityManager;
    protected ?string $entity = null;

    /**
     * @var mixed[]
     */
    protected array $data = [];

    public function __construct(
        UserPasswordHasherInterface $passwordEncoder,
        ObjectManager $objectManager,
        ManagerRegistry $managerRegistry,
        EntityManager $entityManager
    ) {
        $this->passwordEncoder = $passwordEncoder;
        $this->objectManager = $objectManager;
        $this->managerRegistry = $managerRegistry;
        $this->entityManager = $entityManager;

        if (null === $this->entity) {
            throw new \Exception('Entity is not defined in Fixture '.get_class($this).'!');
        }
    }

    public function setData(): void
    {
        if (empty($this->data)) {
            throw new \Exception('No data provided to setData() method.');
        }

        $entityObj = null;

        foreach ($this->data as $elements) {
            $entityObj = new $this->entity();

            if (!is_object($entityObj)) {
                throw new \Exception('EntityObj is object '.get_class($this).'!');
            }

            foreach ($elements as $field => $value) {
                if ('outputMessage' === $field) {
                    $output = new ConsoleOutput();
                    $output->writeln('Adding ... '.get_class($entityObj).' - '.$value);
                    continue;
                }

                $setMethod = 'set'.ucfirst($field);

                if (method_exists($this, 'on'.ucfirst($field).'Set')) {
                    $onMethodSet = 'on'.ucfirst($field).'Set';
                    $value = $this->$onMethodSet($value, $entityObj);
                }

                $entityObj->$setMethod($value);
            }

            $this->objectManager->persist($entityObj);
        }

        if (null == $entityObj) {
            throw new \Exception('EntityObj is object '.get_class($this).'!');
        }

        $this->initRelations($entityObj);
        $this->objectManager->flush();
    }

    protected function initRelations(ApiInterface $entityObj): void
    {
    }

    protected function addRelation(string $filed, ApiInterface $entityObj, ?ApiInterface $object): void
    {
        if (null === $object) {
            throw new \Exception('Releted object not found !');
        }

        $fieldMethod = 'add'.$filed;
        $entityObj->$fieldMethod($object);
    }
}
