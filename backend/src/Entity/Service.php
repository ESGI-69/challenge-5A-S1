<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Delete;
use App\Controller\Service\ValidateServiceController;
use App\Repository\ServiceRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

#[ORM\Entity(repositoryClass: ServiceRepository::class)]
#[UniqueEntity(['name'])]
#[ApiResource(
    operations: [
        new GetCollection(normalizationContext: ['groups' => ['read-service-all']]),
        new Get(),
        new Post(name: 'creation', security: 'is_granted("ROLE_PRESTA")'),
        new Post(
            name: 'validation',
            uriTemplate: '/services/{id}/validate',
            security: 'is_granted("ROLE_ADMIN")',
            controller: ValidateServiceController::class,
            normalizationContext: ['groups' => ['admin-read-service', 'read-service']],
            denormalizationContext: ['groups' => []],
        ),
        new Patch(name: 'edition-presta', security: 'is_granted("ROLE_PRESTA")'),
        new Patch(name: 'edition-admin', security: 'is_granted("ROLE_ADMIN")'),
        new Delete(security: 'is_granted("ROLE_ADMIN")'),
    ],
    denormalizationContext: ['groups' => ['create-service']],
    normalizationContext: ['groups' => ['read-service']],
)]
class Service
{
    #[Groups(['read-service', 'read-service-all'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['create-service', 'read-service', 'read-service-all'])]
    #[Assert\NotBlank]
    #[Assert\NotNull]
    #[ORM\Column(length: 50, unique: true)]
    private ?string $name = null;
    
    #[Groups(['create-service', 'read-service'])]
    #[ORM\Column(type: Types::TEXT)]
    private ?string $description = null;
    
    #[Groups(['create-service', 'read-service'])]
    #[ORM\Column(length: 30, nullable: true)]
    private ?string $icon = null;
    
    #[Groups(['admin-read-service'])]
    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $validatedAt = null;

    #[Groups('admin-read-service')]
    #[ORM\ManyToOne(inversedBy: 'authoredServices')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $author = null;

    #[Groups(['admin-read-service'])]
    #[ORM\ManyToOne(inversedBy: 'validatedServices')]
    private ?User $validatedBy = null;

    #[ORM\ManyToMany(targetEntity: WorkingHoursRange::class, mappedBy: 'services')]
    private Collection $workingHoursRanges;

    public function __construct()
    {
        $this->workingHoursRanges = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getIcon(): ?string
    {
        return $this->icon;
    }

    public function setIcon(?string $icon): static
    {
        $this->icon = $icon;

        return $this;
    }

    public function getValidatedAt(): ?\DateTimeImmutable
    {
        return $this->validatedAt;
    }

    public function setValidatedAt(?\DateTimeImmutable $validatedAt): static
    {
        $this->validatedAt = $validatedAt;

        return $this;
    }

    public function getAuthor(): ?User
    {
        return $this->author;
    }

    public function setAuthor(?User $author): static
    {
        $this->author = $author;

        return $this;
    }

    public function getValidatedBy(): ?User
    {
        return $this->validatedBy;
    }

    public function setValidatedBy(?User $validatedBy): static
    {
        $this->validatedBy = $validatedBy;

        return $this;
    }

    /**
     * @return Collection<int, WorkingHoursRange>
     */
    public function getWorkingHoursRanges(): Collection
    {
        return $this->workingHoursRanges;
    }

    public function addWorkingHoursRange(WorkingHoursRange $workingHoursRange): static
    {
        if (!$this->workingHoursRanges->contains($workingHoursRange)) {
            $this->workingHoursRanges->add($workingHoursRange);
            $workingHoursRange->addService($this);
        }

        return $this;
    }

    public function removeWorkingHoursRange(WorkingHoursRange $workingHoursRange): static
    {
        if ($this->workingHoursRanges->removeElement($workingHoursRange)) {
            $workingHoursRange->removeService($this);
        }

        return $this;
    }
}
