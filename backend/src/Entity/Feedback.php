<?php

namespace App\Entity;

use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Get;
use App\Repository\FeedbackRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Entity\Appointment;
use App\Entity\Service;
use App\Entity\Employee;
use App\Entity\User;
use App\Entity\SubFeedback;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\Delete;
use App\Denormalizer\FeedbackCreationDenormalizer;

#[ORM\Entity(repositoryClass: FeedbackRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(
            normalizationContext: ['groups' => ['feedback-read',]],
        ),
        new Get(
            normalizationContext: ['groups' => ['feedback-read-admin']],
            security: 'is_granted("ROLE_ADMIN")',
        ),
        new Post(
            denormalizationContext: [
                'groups' => ['create-feedback'],
                'denormalizer' => FeedbackCreationDenormalizer::class,
            ],
            securityPostDenormalize: 'is_granted("ROLE_USER") and object.getAppointment().getClient() == user',
            securityPostDenormalizeMessage: 'You can only create feedbacks for your appointments',
        ),
        new Delete(
            security: 'is_granted("ROLE_ADMIN")'
        ),
    ]
)]

#[ApiFilter(
    SearchFilter::class,
    properties: [
        'appointment.establishment.id' => 'exact',
    ]
)]

class Feedback
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['feedback-read', 'feedback-read-admin', 'read-establishment', 'appointment-me'])]
    private ?int $id = null;

    #[ORM\Column(length: 1000)]
    #[Groups(['create-feedback', 'feedback-read', 'read-establishment'])]
    private ?string $comment = null;

    #[ORM\OneToOne(inversedBy: 'feedback', cascade: ['persist', 'remove'])]
    #[Groups(['create-feedback',])]
    private ?Appointment $appointment = null;

    #[ORM\ManyToOne(inversedBy: 'feedback')]
    #[Groups(['create-feedback'])]
    private ?Service $service = null;

    #[ORM\ManyToOne(inversedBy: 'feedback')]
    #[Groups(['create-feedback'])]
    private ?Employee $employee = null;

    #[ORM\ManyToOne(inversedBy: 'feedback')]
    #[Groups(['feedback-read', 'read-establishment'])]
    private ?User $author = null;

    #[ORM\OneToMany(mappedBy: 'feedback', targetEntity: SubFeedback::class, cascade: ['persist'])]
    #[Groups(['create-feedback', 'feedback-read'])]
    private Collection $subFeedback;

    #[ORM\ManyToOne(inversedBy: 'feedback')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Establishment $establishment = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column]
    #[Groups(['read-establishment', 'feedback-read'])]
    private ?\DateTimeImmutable $updatedAt = null;

    #[ORM\Column (type: "float", nullable: true)]
    #[Groups(['read-establishment', 'feedback-read', 'create-feedback'])]
    private ?float $averageRating = null;

    public function __construct()
    {
        $this->subFeedback = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getComment(): ?string
    {
        return $this->comment;
    }

    public function setComment(string $comment): static
    {
        $this->comment = $comment;

        return $this;
    }

    public function getAppointment(): ?Appointment
    {
        return $this->appointment;
    }

    public function setAppointment(?Appointment $appointment): static
    {
        $this->appointment = $appointment;

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

    public function getEmployee(): ?Employee
    {
        return $this->employee;
    }

    public function setEmployee(?Employee $employee): static
    {
        $this->employee = $employee;

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

    /**
     * @return Collection<int, SubFeedback>
     */
    public function getSubFeedback(): Collection
    {
        return $this->subFeedback;
    }

    public function addSubFeedback(SubFeedback $subFeedback): static
    {
        if (!$this->subFeedback->contains($subFeedback)) {
            $this->subFeedback->add($subFeedback);
            $subFeedback->setFeedback($this);
        }

        return $this;
    }

    public function removeSubFeedback(SubFeedback $subFeedback): static
    {
        if ($this->subFeedback->removeElement($subFeedback)) {
            // set the owning side to null (unless already changed)
            if ($subFeedback->getFeedback() === $this) {
                $subFeedback->setFeedback(null);
            }
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

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTimeImmutable $updatedAt): static
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getAverageRating(): ?float
    {
        return $this->averageRating;
    }

    public function setAverageRating(float $averageRating): static
    {
        $this->averageRating = $averageRating;

        return $this;
    }
}
