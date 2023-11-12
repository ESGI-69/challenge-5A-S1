<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\OpeningHourRepository;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Delete;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Controller\OpeningHour\CreateOpeningHourController;

#[ORM\Entity(repositoryClass: OpeningHourRepository::class)]
#[ApiResource(
    operations: [
        new Post(
            denormalizationContext: ['groups' => ['create-opening-hour']],
            securityPostDenormalize: 'is_granted("ROLE_PRESTA")',
            controller: CreateOpeningHourController::class,
        ),
        new Patch(
            denormalizationContext: ['groups' => ['update-opening-hour']],
            securityPostDenormalize: 'is_granted("ROLE_PRESTA")',
            controller: CreateOpeningHourController::class,
        ),
    ]
)]
class OpeningHour
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'openingHours')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['create-opening-hour'])]
    private ?Establishment $establishment = null;

    #[ORM\Column(type: Types::TIME_MUTABLE, nullable: true)]
    #[Groups(['create-opening-hour', 'update-opening-hour', 'read-establishment'])]
    private ?\DateTimeInterface $startTime = null;

    #[ORM\Column(type: Types::TIME_MUTABLE, nullable: true)]
    #[Groups(['create-opening-hour', 'update-opening-hour', 'read-establishment'])]
    private ?\DateTimeInterface $endTime = null;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getStartTime(): ?\DateTimeInterface
    {
        return $this->startTime;
    }

    public function setStartTime(?\DateTimeInterface $startTime): static
    {
        $this->startTime = $startTime;

        return $this;
    }

    public function getEndTime(): ?\DateTimeInterface
    {
        return $this->endTime;
    }

    public function setEndTime(?\DateTimeInterface $endTime): static
    {
        $this->endTime = $endTime;

        return $this;
    }
}
