<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Delete;
use App\Controller\Service\ValidateServiceController;
use App\Controller\Service\CreateServiceController;
use App\Controller\Service\GetValidatedServicesController;
use App\Controller\Service\GetServiceRecentWorkingHoursController;
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
        new GetCollection(
            normalizationContext: ['groups' => ['read-service-all']],
            controller: GetValidatedServicesController::class,
            paginationEnabled: false,
            description: 'Get all validated services',
        ),
        new GetCollection(
            normalizationContext: ['groups' => ['read-service']],
            uriTemplate: '/services-all',
            security: 'is_granted("ROLE_ADMIN")',
        ),
        new Get(
            normalizationContext: ['groups' => ['read-service']],
            securityPostDenormalize: 'object.getValidatedAt() !== null',
            securityMessage: 'You cannot access this service',
            securityPostDenormalizeMessage: 'You cannot access this service',
            controller: GetServiceRecentWorkingHoursController::class,
        ),
        new Post(
            name: 'creation',
            securityPostDenormalize: "is_granted('ROLE_PRESTA') and object.getEstablishment().getCompany() === user.getCompany()",
            controller: CreateServiceController::class
        ),
        new Post(
            name: 'validation',
            uriTemplate: '/services/{id}/validate',
            security: 'is_granted("ROLE_ADMIN")',
            controller: ValidateServiceController::class,
            normalizationContext: ['groups' => ['admin-read-service', 'read-service']],
            denormalizationContext: ['groups' => []],
        ),
        new Patch(
            securityPostDenormalize: "is_granted('ROLE_PRESTA') and object.getEstablishment().getCompany() === user.getCompany()",
        ),
        new Delete(
            securityPostDenormalize: "is_granted('ROLE_PRESTA') and object.getEstablishment().getCompany() === user.getCompany()",
        ),
    ],
    // denormalizationContext: ['groups' => ['create-service']],
    // normalizationContext: ['groups' => ['read-service']],
)]
class Service
{
    #[Groups(['read-service', 'read-service-all', 'read-establishment', 'appointment-getall', 'employee-getall'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['create-service', 'read-service', 'read-service-all', 'appointment-read', 'read-establishment', 'appointment-getall', 'employee-getall'])]
    #[Assert\NotBlank]
    #[Assert\NotNull]
    #[ORM\Column(length: 50, unique: true)]
    private ?string $name = null;
    
    #[Groups(['create-service', 'read-service', 'appointment-read', 'read-establishment'])]
    #[ORM\Column(type: Types::TEXT)]
    private ?string $description = null;
    
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

    #[Groups(['read-service'])]
    #[ORM\ManyToMany(targetEntity: WorkingHoursRange::class, mappedBy: 'services')]
    #[ORM\OrderBy(['startDate' => 'ASC'])]
    private Collection $workingHoursRanges;

    #[Groups(['read-service'])]
    #[ORM\OneToMany(mappedBy: 'service', targetEntity: Appointment::class)]
    private Collection $appointments;

    #[ORM\ManyToOne(inversedBy: 'services')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read-establishment','read-service'])]
    private ?Establishment $establishment = null;

    #[ORM\ManyToOne(inversedBy: 'services')]
    #[ORM\JoinColumn(nullable: false)]
    private ?ServiceType $type = null;

    #[Groups(['read-establishment', 'appointment-getall','read-service'])]
    #[ORM\Column]
    private ?int $duration = null;

    #[Groups(['read-establishment', 'appointment-getall','read-service'])]
    #[ORM\Column]
    private ?float $price = null;

    #[ORM\OneToMany(mappedBy: 'service', targetEntity: Feedback::class)]
    private Collection $feedback;

    public function __construct()
    {
        $this->workingHoursRanges = new ArrayCollection();
        $this->feedback = new ArrayCollection();
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

    //add appointment relation
    /**
     * @return Collection<int, Appointment>
     */
    public function getAppointments(): Collection
    {
        return $this->appointments;
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

    public function getEstablishment(): ?Establishment
    {
        return $this->establishment;
    }

    public function setEstablishment(?Establishment $establishment): static
    {
        $this->establishment = $establishment;

        return $this;
    }

    public function getType(): ?ServiceType
    {
        return $this->type;
    }

    public function setType(?ServiceType $type): static
    {
        $this->type = $type;

        return $this;
    }

    public function getDuration(): ?int
    {
        return $this->duration;
    }

    public function setDuration(int $duration): static
    {
        $this->duration = $duration;

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): static
    {
        $this->price = $price;

        return $this;
    }

    /**
     * @return Collection<int, Feedback>
     */
    public function getFeedback(): Collection
    {
        return $this->feedback;
    }

    public function addFeedback(Feedback $feedback): static
    {
        if (!$this->feedback->contains($feedback)) {
            $this->feedback->add($feedback);
            $feedback->setService($this);
        }

        return $this;
    }

    public function removeFeedback(Feedback $feedback): static
    {
        if ($this->feedback->removeElement($feedback)) {
            // set the owning side to null (unless already changed)
            if ($feedback->getService() === $this) {
                $feedback->setService(null);
            }
        }

        return $this;
    }
}
