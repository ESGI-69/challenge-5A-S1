<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\FeedbackRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: FeedbackRepository::class)]
#[ApiResource]
class Feedback
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 1000)]
    private ?string $comment = null;

    #[ORM\OneToOne(inversedBy: 'feedback', cascade: ['persist', 'remove'])]
    private ?Appointment $appointment = null;

    #[ORM\ManyToOne(inversedBy: 'feedback')]
    private ?Service $service = null;

    #[ORM\ManyToOne(inversedBy: 'feedback')]
    private ?Employee $employee = null;

    #[ORM\ManyToOne(inversedBy: 'feedback')]
    private ?User $author = null;

    #[ORM\OneToMany(mappedBy: 'feedback', targetEntity: SubFeedback::class)]
    private Collection $subFeedback;

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
}
