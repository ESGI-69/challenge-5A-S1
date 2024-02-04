<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use ApiPLatform\Metadata\Patch;
use ApiPLatform\Metadata\Delete;
use App\Repository\WorkingHoursRangeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

// WAITING FOR THE EMPLOYE ENTITY 

#[ORM\Entity(repositoryClass: WorkingHoursRangeRepository::class)]
#[ApiResource(
    operations: [
        new Get(
            normalizationContext: ['groups' => ['read-service']],
        ),
        new Post(security: 'is_granted("ROLE_PRESTA")'),
        new Patch(security: 'is_granted("ROLE_PRESTA")'),
        new Delete(security: 'is_granted("ROLE_PRESTA")'),
    ],
)]
class WorkingHoursRange
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['read-service'])]
    private ?int $id = null;

    #[Groups(['read-service'])]
    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $startDate = null;

    #[Groups(['read-service'])]
    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $endDate = null;

    #[ORM\ManyToMany(targetEntity: Service::class, inversedBy: 'workingHoursRanges')]
    private Collection $services;

    #[ORM\ManyToOne(inversedBy: 'workingHoursRanges')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Employee $Employee = null;

    public function __construct()
    {
        $this->services = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    /**
     * @return Collection<int, Service>
     */
    public function getServices(): Collection
    {
        return $this->services;
    }

    public function addService(Service $service): static
    {
        if (!$this->services->contains($service)) {
            $this->services->add($service);
        }

        return $this;
    }

    public function removeService(Service $service): static
    {
        $this->services->removeElement($service);

        return $this;
    }

    public function getEmployee(): ?Employee
    {
        return $this->Employee;
    }

    public function setEmployee(?Employee $Employee): static
    {
        $this->Employee = $Employee;

        return $this;
    }
}
