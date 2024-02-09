<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Get;
use App\Repository\FeedbackTypeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\GetCollection;

#[ORM\Entity(repositoryClass: FeedbackTypeRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(
            normalizationContext: ['groups' => ['feedback-type-read']],
            security: 'is_granted("ROLE_PRESTA") or is_granted("ROLE_ADMIN")',
        ),
        new Get(
            normalizationContext: ['groups' => ['feedback-type-read']],
            security: 'is_granted("ROLE_PRESTA")',
        ),
        new Post(
            denormalizationContext: ['
                groups' => ['feedback-type-create'],
            ],
            securityPostDenormalize: 'is_granted("ROLE_ADMIN")',
            securityPostDenormalizeMessage: 'You can only create feedback types for your establishments',
        ),
        new Delete(
            security: 'is_granted("ROLE_ADMIN")',
            securityMessage: 'You can only delete feedback types for your establishments',
        )
    ]
)]

#[ApiFilter(
    SearchFilter::class,
    properties: [
        'establishments.id' => 'exact',
    ]
)]

class FeedbackType
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['read-establishment', 'feedback-type-read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['feedback-read', 'feedback-type-create', 'feedback-type-read', 'read-establishment'])]
    private ?string $name = null;

    #[ORM\ManyToMany(targetEntity: Establishment::class, inversedBy: 'feedbackTypes')]
    #[Groups(['feedback-type-create', 'feedback-type-read'])]
    private Collection $establishments;

    #[ORM\OneToMany(mappedBy: 'feedbackType', targetEntity: SubFeedback::class, cascade: ['persist', 'remove'], orphanRemoval: true)]
    private Collection $subFeedback;

    #[ORM\Column(nullable: true)]
    #[Groups(['read-establishment'])]
    private ?float $averageNotation = null;
    public function __construct()
    {
        $this->establishments = new ArrayCollection();
        $this->subFeedback = new ArrayCollection();
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

    /**
     * @return Collection<int, Establishment>
     */
    public function getEstablishments(): Collection
    {
        return $this->establishments;
    }

    public function addEstablishment(Establishment $establishment): static
    {
        if (!$this->establishments->contains($establishment)) {
            $this->establishments->add($establishment);
        }

        return $this;
    }

    public function removeEstablishment(Establishment $establishment): static
    {
        $this->establishments->removeElement($establishment);

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
            $subFeedback->setFeedbackType($this);
        }

        return $this;
    }

    public function removeSubFeedback(SubFeedback $subFeedback): static
    {
        if ($this->subFeedback->removeElement($subFeedback)) {
            // set the owning side to null (unless already changed)
            if ($subFeedback->getFeedbackType() === $this) {
                $subFeedback->setFeedbackType(null);
            }
        }

        return $this;
    }

    public function getAverageNotation(): ?float
    {
        return $this->averageNotation;
    }

    public function setAverageNotation(?float $averageNotation): static
    {
        $this->averageNotation = $averageNotation;

        return $this;
    }
}
