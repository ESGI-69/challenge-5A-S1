<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Repository\AppointmentRepository;
use App\Controller\Appointment\CreateAppointmentController;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: AppointmentRepository::class)]
#[ApiResource(
    operations:[
        new GetCollection(
            security: 'is_granted("ROLE_ADMIN")',
            normalizationContext: ['groups' => ['appointment-getall']]
        ),
        new Get(
            security: 'is_granted("ROLE_USER") and (object.getClient() == user or object.getEstablishment().getCompany() == user.getCompany())',
            normalizationContext: ['groups' => ['appointment-read']]
        ),
        new Post(
            security: 'is_granted("ROLE_USER")',
            normalizationContext: ['groups' => ['appointment-create']],
            denormalizationContext: ['groups' => ['appointment-create']],
            controller: CreateAppointmentController::class
        ),
        new Patch(
            security: 'is_granted("ROLE_USER") and (object.getClient() == user or object.establishment.getCompany() == user.getCompany())',
            normalizationContext: ['groups' => ['appointment-update']],
            denormalizationContext: ['groups' => ['appointment-update']],
        ),
        new Delete(
            security: 'is_granted("ROLE_ADMIN")',
        )
    ],
)]
class Appointment
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['appointment-create', 'appointment-getall', 'appointment-read'])]
    #[ORM\ManyToOne(inversedBy: 'appointments')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Employee $employee = null;

    #[Groups(['appointment-create', 'appointment-getall', 'appointment-read'])]
    #[ORM\ManyToOne(inversedBy: 'appointments')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Establishment $establishment = null;

    #[Groups(['appointment-create', 'appointment-getall', 'appointment-read'])]
    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Service $service = null;

    #[Groups(['appointment-getall', 'appointment-read'])]
    #[ORM\ManyToOne(inversedBy: 'appointments')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $client = null;

    #[Groups(['appointment-create', 'appointment-getall', 'appointment-read'])]
    #[ORM\Column(type: Types::TIME_MUTABLE)]
    private ?\DateTimeInterface $startDate = null;

    #[Groups(['appointment-create', 'appointment-getall', 'appointment-read'])]
    #[ORM\Column(type: Types::TIME_MUTABLE)]
    private ?\DateTimeInterface $endDate = null;

    #[Groups(['appointment-create', 'appointment-getall', 'appointment-read', 'appointment-update'])]
    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $comment = null;

    #[Groups(['appointment-getall', 'appointment-read', 'appointment-update'])]
    #[ORM\Column(type: Types::TIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $cancelledAt = null;

    #[Groups(['appointment-getall', 'appointment-read'])]
    #[ORM\Column(nullable: true)]
    private ?float $price = null;

    #[ORM\OneToOne(mappedBy: 'appointment', cascade: ['persist', 'remove'])]
    private ?Feedback $feedback = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmployee(): ?Employee
    {
        return $this->employee;
    }

    public function setEmployee(?Employee $employee): static
    {
        $this->employee = $employee;

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

    public function getService(): ?Service
    {
        return $this->service;
    }

    public function setService(?Service $service): static
    {
        $this->service = $service;

        return $this;
    }

    public function getClient(): ?User
    {
        return $this->client;
    }

    public function setClient(?User $client): static
    {
        $this->client = $client;

        return $this;
    }

    public function getStartDate(): ?\DateTimeInterface
    {
        return $this->startDate;
    }

    public function setStartDate(\DateTimeInterface $startDate): static
    {
        $this->startDate = $startDate;

        return $this;
    }

    public function getEndDate(): ?\DateTimeInterface
    {
        return $this->endDate;
    }

    public function setEndDate(\DateTimeInterface $endDate): static
    {
        $this->endDate = $endDate;

        return $this;
    }

    public function getComment(): ?string
    {
        return $this->comment;
    }

    public function setComment(?string $comment): static
    {
        $this->comment = $comment;

        return $this;
    }

    public function getCancelledAt(): ?\DateTimeInterface
    {
        return $this->cancelledAt;
    }

    public function setCancelledAt(?\DateTimeInterface $cancelledAt): static
    {
        $this->cancelledAt = $cancelledAt;

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(?float $price): static
    {
        $this->price = $price;

        return $this;
    }

    public function getFeedback(): ?Feedback
    {
        return $this->feedback;
    }

    public function setFeedback(?Feedback $feedback): static
    {
        // unset the owning side of the relation if necessary
        if ($feedback === null && $this->feedback !== null) {
            $this->feedback->setAppointment(null);
        }

        // set the owning side of the relation if necessary
        if ($feedback !== null && $feedback->getAppointment() !== $this) {
            $feedback->setAppointment($this);
        }

        $this->feedback = $feedback;

        return $this;
    }
}
