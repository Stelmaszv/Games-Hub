<?php

namespace App\Entity;

use App\Entity\JsonMaper\Publisher\EditorsMapper;
use App\Entity\JsonMaper\Publisher\GeneralInformationMapper;
use App\Generic\Api\Identifier\Trait\IdentifierById;
use App\Generic\Api\Interfaces\ApiInterface;
use App\Generic\Api\Trait\EntityApiGeneric;
use App\Generic\Api\Trait\JsonMapValidator;
use App\Infrastructure\DescriptionsLanguageMaper;
use App\Repository\PublisherRepository;
use App\Validation\DTO\Publisher\DescriptionsDTO;
use App\Validation\DTO\Publisher\GeneralInformationDTO;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PublisherRepository::class)]
class Publisher implements ApiInterface
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

    #[ORM\ManyToOne(inversedBy: 'publishers')]
    private ?User $createdBy = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $creationDate = null;

    /**
     * @var array<array<string>>
     */
    #[ORM\Column]
    private array $editors = [];

    #[ORM\Column]
    private ?bool $verified = null;

    #[ORM\ManyToMany(targetEntity: Developer::class, mappedBy: 'publisher')]
    private Collection $developer;

    public function __construct()
    {
        $this->developer = new ArrayCollection();
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

    /**
     * @return array<string>
     */
    public function getCreatedBy(): ?array
    {
        return $this->setApiGroup(new User(), 'createdBy');
    }

    public function setCreatedBy(User $createdBy): static
    {
        $this->createdBy = $createdBy;

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

    public function isEditor(int $user): bool
    {
        foreach ($this->getEditors() as $editor) {
            if ($editor['id'] === $user) {
                return true;
            }
        }

        return false;
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
     * @return Collection<int, Developer>
     */
    public function getDeveloper(): Collection
    {
        return $this->developer;
    }

    public function addDeveloper(Developer $developer): static
    {
        if (!$this->developer->contains($developer)) {
            $this->developer->add($developer);
            $developer->addPublisher($this);
        }

        return $this;
    }

    public function removeDeveloper(Developer $developer): static
    {
        if ($this->developer->removeElement($developer)) {
            $developer->removePublisher($this);
        }

        return $this;
    }
}
