<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\SubFeedbackRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;

#[ORM\Entity(repositoryClass: SubFeedbackRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(
            security: 'is_granted("ROLE_ADMIN")'
        ),
        new Get(
            security: 'is_granted("ROLE_ADMIN")'
        )
    ]
)]
class SubFeedback
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'note')]
    #[Groups(['create-feedback',])]
    private ?Feedback $feedback = null;

    #[ORM\Column]
    #[Groups(['create-feedback', 'feedback-read'])]
    private ?int $note = null;

    #[ORM\ManyToOne(inversedBy: 'subFeedback')]
    #[Groups(['create-feedback', 'feedback-read'])]
    private ?FeedbackType $feedbackType = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFeedback(): ?Feedback
    {
        return $this->feedback;
    }

    public function setFeedback(?Feedback $feedback): static
    {
        $this->feedback = $feedback;

        return $this;
    }

    public function getNote(): ?int
    {
        return $this->note;
    }

    public function setNote(int $note): static
    {
        $this->note = $note;

        return $this;
    }

    public function getFeedbackType(): ?FeedbackType
    {
        return $this->feedbackType;
    }

    public function setFeedbackType(?FeedbackType $feedbackType): static
    {
        $this->feedbackType = $feedbackType;

        return $this;
    }
}
