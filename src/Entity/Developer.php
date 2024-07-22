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
use App\Entity\JsonMaper\Developer\EditorsMapper;
use App\Infrastructure\DescriptionsLanguageMaper;
use App\Validation\DTO\Developer\DescriptionsDTO;
use App\Generic\Api\Identifier\Trait\IdentifierById;
use App\Validation\DTO\Developer\GeneralInformationDTO;
use App\Entity\JsonMaper\Developer\GeneralInformationMapper;

#[ORM\Entity(repositoryClass: DeveloperRepository::class)]
class Developer implements ApiInterface
{
    use EntityApiGeneric;
    use IdentifierById;
    use JsonMapValidator;

    /**
     * @var array<mixed>
     */
    #[ORM\Column]
    private array $generalInformation = [];

    /**
     * @var array<string>
     */
    #[ORM\Column]
    private array $descriptions = [];

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $creationDate = null;

    /**
     * @var array<array<string>>
     */
    #[ORM\Column]
    private array $editors = [];

    #[ORM\Column]
    private ?bool $verified = null;

    #[ORM\ManyToMany(targetEntity: Publisher::class, inversedBy: 'developers')]
    private Collection $publisher;

    #[ORM\ManyToOne(inversedBy: 'developers')]
    private ?User $createdBy = null;

    public function __construct()
    {
        $this->publisher = new ArrayCollection();
    }

    /**
     * @return array<string>
     */
    public function getGeneralInformation(): array
    {
        return $this->generalInformation;
    }

    public function setGeneralInformation(GeneralInformationDTO $generalInformation): static
    {
        $this->generalInformation = $this->jsonValidate(get_object_vars($generalInformation), GeneralInformationMapper::class);

        return $this;
    }

    /**
     * @return array<string>
     */
    public function getDescriptions(): array
    {
        return $this->descriptions;
    }

    public function setDescriptions(DescriptionsDTO $descriptions): static
    {
        $this->descriptions = $this->jsonValidate(get_object_vars($descriptions), DescriptionsLanguageMaper::class);

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

    /**
     * @return array<array<string>>
     */
    public function getEditors(): array
    {
        return $this->editors;
    }

    /**
     * @param array<string> $editors
     */
    public function setEditors(array $editors): static
    {
        $this->editors = $this->jsonValidate($editors, EditorsMapper::class);

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
     * @return array<string>
     */
    public function getPublisher(): array
    {
        return $this->setApiGroupMany(new Publisher(), $this->publisher);
    }

    public function addPublisher(Publisher $publisher): static
    {
        if (!$this->publisher->contains($publisher)) {
            $this->publisher->add($publisher);
        }

        return $this;
    }

    public function removePublisher(Publisher $publisher): static
    {
        $this->publisher->removeElement($publisher);

        return $this;
    }

    /**
     * @return array<string>
     */
    public function getCreatedBy(): array
    {
        return $this->setApiGroup(new User(), 'createdBy');
    }

    public function setCreatedBy(?User $createdBy): static
    {
        $this->createdBy = $createdBy;

        return $this;
    }
}
