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

#[ORM\Entity(repositoryClass: EmployeeRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(normalizationContext: ['groups' => ['employee:list']]),
        new Get(normalizationContext: ['groups' => ['employee:item']]),
        new Post(
            normalizationContext: ['groups' => ['employee:write']],
            denormalizationContext: ['groups' => ['employee:write']],
        ),
        new Patch(
            name: 'patch_employee_presta',
            normalizationContext: ['groups' => ['employee:write']],
            denormalizationContext: ['groups' => ['employee:write']],
        ),
        new Delete()
    ]
)]
class Employee
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'employees')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Company $companyId = null;

    #[ORM\ManyToOne(inversedBy: 'employees')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Establishment $preferedEstablishment = null;

    #[ORM\Column(length: 255)]
    private ?string $firstname = null;

    #[ORM\Column(length: 255)]
    private ?string $lastname = null;

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
