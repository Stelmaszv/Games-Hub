<?php

declare(strict_types=1);

namespace App\DataFixtures\Data;

use App\Entity\Publisher;
use App\Entity\User;
use App\Generic\Components\AbstractDataFixture;
use App\Service\WebScraper\Publisher\DescriptionsScraper;
use App\Service\WebScraper\Publisher\GeneralInformationScraper;
use App\Service\WebScraper\WebScraperDescriptionFactory;
use App\Validation\DTO\Publisher\DescriptionsDTO;
use App\Validation\DTO\Publisher\EditorDTO;
use App\Validation\DTO\Publisher\GeneralInformationDTO;

class PublisherData extends AbstractDataFixture
{
    protected ?string $entity = Publisher::class;
    protected array $data = [
        [
            'outputMessage' => 'EA',
            'createdBy' => 'publisherCreator@dot.com',
            'generalInformation' => 'https://en.wikipedia.org/wiki/Electronic_Arts',
            'descriptions' => [
                [
                    'lng' => 'pl',
                    'url' => 'https://pl.wikipedia.org/wiki/Electronic_Arts',
                ],
                [
                    'lng' => 'eng',
                    'url' => 'https://en.wikipedia.org/wiki/Electronic_Arts',
                ],
                [
                    'lng' => 'fr',
                    'url' => 'https://fr.wikipedia.org/wiki/Electronic_Arts',
                ],
            ],
            'creationDate' => null,
            'editors' => ['publisherEditor@wp.pl','publisherCreator@dot.com'],
            'verified' => true,
        ],
    ];

    public function onCreatedBySet(mixed $value, object $entity)
    {
        $user = $this->managerRegistry->getRepository(User::class)->findOneBy(['email' => $value]);

        return $user;
    }

    public function onCreationDateSet(mixed $value, object $entity)
    {
        return new \DateTime();
    }

    public function onGeneralInformationSet(mixed $value, object $entity)
    {
        $publisherScraber = new GeneralInformationScraper($value);

        return new GeneralInformationDTO($publisherScraber->getData());
    }

    public function onDescriptionsSet(mixed $value, object $entity)
    {
        $webScraperFactory = new WebScraperDescriptionFactory(new DescriptionsScraper());
        $webScraperFactory->setDescription($value);

        return new DescriptionsDTO($webScraperFactory->getDescription());
    }

    public function onEditorsSet(mixed $value, object $entity)
    {
        foreach ($value as $key => $editor) {
            $editors[$key] = new EditorDTO();
            $user = $this->managerRegistry->getRepository(User::class)->findOneBy(['email' => $editor]);
            $editors[$key]->id = $user->getId();
        }

        return $editors;
    }
}
