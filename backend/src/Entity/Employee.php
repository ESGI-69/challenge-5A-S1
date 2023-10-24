<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Repository\EmployeeRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

// @todo : Adapt this entity to block other Company to get others Company data
#[ORM\Entity(repositoryClass: EmployeeRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(
            security: 'is_granted("ROLE_PRESTA")',
            normalizationContext: ['groups' => ['employee-getall']]
        ),
        new Get(
            security: 'is_granted("ROLE_PRESTA")',
            normalizationContext: ['groups' => ['employee-get']]),
        new Post(
            security: 'is_granted("ROLE_PRESTA")',
            normalizationContext: ['groups' => ['employee-post']],
            denormalizationContext: ['groups' => ['employee-post']],
        ),
        new Patch(
            security: 'is_granted("ROLE_PRESTA")',
            normalizationContext: ['groups' => ['employee-patch']],
            denormalizationContext: ['groups' => ['employee-patch']],
        ),
        new Delete()
    ]
)]
class Employee
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['employee-get', 'employee-getall'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'employees')]
    // Also adapt this so that only the company that created the employee can get it (and admins ofc)
    #[Groups(['employee-post', 'employee-get', 'employee-patch', 'employee-getall'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?Company $companyId = null;

    #[ORM\ManyToOne(inversedBy: 'employees')]
    #[Groups(['employee-post', 'employee-get', 'employee-patch', 'employee-getall'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?Establishment $preferedEstablishment = null;

    #[Groups(['employee-post', 'employee-get', 'employee-patch', 'employee-getall'])]
    #[ORM\Column(length: 255)]
    private ?string $firstname = null;

    #[Groups(['employee-post', 'employee-get', 'employee-patch', 'employee-getall'])]
    #[ORM\Column(length: 255)]
    private ?string $lastname = null;

    #[Groups(['employee-post', 'employee-get', 'employee-patch', 'employee-getall'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $avatar = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCompanyId(): ?Company
    {
        return $this->companyId;
    }

    public function setCompanyId(?Company $companyId): static
    {
        $this->companyId = $companyId;

        return $this;
    }

    public function getPreferedEstablishment(): ?Establishment
    {
        return $this->preferedEstablishment;
    }

    public function setPreferedEstablishment(?Establishment $preferedEstablishment): static
    {
        $this->preferedEstablishment = $preferedEstablishment;

        return $this;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): static
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function getFullname(): ?string
    {
        return $this->firstname . ' ' . $this->lastname;
    }

    public function setLastname(string $lastname): static
    {
        $this->lastname = $lastname;

        return $this;
    }


    public function getAvatar(): ?string
    {
        return $this->avatar;
    }

    public function setAvatar(?string $avatar): static
    {
        $this->avatar = $avatar;

        return $this;
    }
}
