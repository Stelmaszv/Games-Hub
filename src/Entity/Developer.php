<?php

namespace App\Entity;

use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\DeveloperRepository;
use App\Generic\Api\Trait\EntityApiGeneric;
use App\Generic\Api\Trait\JsonMapValidator;
use Doctrine\Common\Collections\Collection;
use App\Generic\Api\Interfaces\ApiInterface;
use Doctrine\Common\Collections\ArrayCollection;
use App\Validation\DTO\Publisher\DescriptionsDTO;
use App\Generic\Api\Identifier\Trait\IdentifierById;
use App\Generic\Api\Identifier\Interfaces\IdentifierId;
use App\Validation\DTO\Publisher\GeneralInformationDTO;
use App\Entity\JsonMaper\Publisher\PublisherEditorsMapper;
use App\Entity\JsonMaper\Publisher\PublisherDescriptionsMapper;
use App\Entity\JsonMaper\Publisher\PublisherGeneralInformationMapper;

#[ORM\Entity(repositoryClass: DeveloperRepository::class)]
class Developer  implements ApiInterface,IdentifierId
{
    use EntityApiGeneric;
    use IdentifierById;
    use JsonMapValidator;

    #[ORM\Column]
    private array $generalInformation = [];

    #[ORM\Column]
    private array $descriptions = [];

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $creationDate = null;

    #[ORM\Column]
    private array $editors = [];

    #[ORM\Column]
    private ?bool $verified = null;

    #[ORM\ManyToMany(targetEntity: Publisher::class, inversedBy: 'developers')]
    private Collection $publishers;

    public function __construct()
    {
        $this->publishers = new ArrayCollection();
    }

    public function getGeneralInformation(): array
    {
        return $this->generalInformation;
    }

    public function setGeneralInformation(GeneralInformationDTO $generalInformation): static
    {
        $this->generalInformation = $this->jsonValidate(get_object_vars($generalInformation),PublisherGeneralInformationMapper::class);

        return $this;
    }

    public function getDescriptions(): array
    {
        return $this->descriptions;
    }

    public function setDescriptions(DescriptionsDTO $descriptions): static
    {
        $this->descriptions = $this->jsonValidate(get_object_vars($descriptions),PublisherDescriptionsMapper::class);

        return $this;
    }

    public function getCreationDate(): ?\DateTimeInterface
    {
        return $this->creationDate;
    }

    public function setCreationDate(\DateTimeInterface $creationDate): static
    {
        $this->creationDate = $creationDate;

        return $this;
    }

    public function getEditors(): array
    {
        return $this->editors;
    }

    public function setEditors(array $editors): static
    {
        $this->editors = $this->jsonValidate($editors,PublisherEditorsMapper::class);

        return $this;
    }

    public function getVerified(): ?bool
    {
        return $this->verified;
    }

    public function setVerified(bool $verified): static
    {
        $this->verified = $verified;

        return $this;
    }

    /**
     * @return Collection<int, Publisher>
     */
    public function getPublishers(): array
    {
        return $this->setApiGroupMany(new Publisher,$this->publishers);
    }

    public function addPublisher(Publisher $publisher): static
    {
        if (!$this->publishers->contains($publisher)) {
            $this->publishers->add($publisher);
        }

        return $this;
    }

    public function removePublisher(Publisher $publisher): static
    {
        $this->publishers->removeElement($publisher);

        return $this;
    }
}