<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Repository\CompanyRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: CompanyRepository::class)]
#[ApiResource(
    operations: [
        new Get(normalizationContext: ['groups' => ['read-company']]),
        new Post(denormalizationContext: ['groups' => ['create-company']]),
        new Patch(denormalizationContext: ['groups' => ['update-company']]),
    ],
    normalizationContext: ['groups' => ['read-company', 'read-company-mutation']]
)]
class Company
{
    #[Groups(['read-company-mutation'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['read-company', 'create-company', 'update-company'])]
    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[Groups(['read-company', 'create-company', 'update-company'])]
    #[ORM\Column(length: 255)]
    private ?string $pathKbis = null;

    #[Assert\Email()]
    #[Groups(['read-company', 'create-company', 'update-company'])]
    #[ORM\Column(length: 255)]
    private ?string $email = null;

    #[Groups(['read-company-as-admin'])]
    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $validatedAt = null;

    #[Groups(['read-company-as-admin'])]
    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $rejectedReason = null;

    #[Groups(['read-company', 'create-company', 'update-company'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $logoPath = null;

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

    public function getPathKbis(): ?string
    {
        return $this->pathKbis;
    }

    public function setPathKbis(string $pathKbis): static
    {
        $this->pathKbis = $pathKbis;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

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

    public function getRejectedReason(): ?string
    {
        return $this->rejectedReason;
    }

    public function setRejectedReason(?string $rejectedReason): static
    {
        $this->rejectedReason = $rejectedReason;

        return $this;
    }

    public function getLogoPath(): ?string
    {
        return $this->logoPath;
    }

    public function setLogoPath(?string $logoPath): static
    {
        $this->logoPath = $logoPath;

        return $this;
    }
}
