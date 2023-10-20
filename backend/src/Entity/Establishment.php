<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\EstablishmentRepository;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Delete;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;


#[ORM\Entity(repositoryClass: EstablishmentRepository::class)]
#[ApiResource(
    operations: [
        new Get(normalizationContext: ['groups' => ['read-establishment', 'read-company']]),
        new Post(denormalizationContext: ['groups' => ['create-establishment']]),
        new Patch(denormalizationContext: ['groups' => ['update-establishment']]),
        new Delete(),
    ],
    
)]
class Establishment
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 55)]
    #[Assert\Length(min: 2, max: 50)]
    #[Groups(['read-establishment', 'create-establishment', 'update-establishment'])]
    private ?string $name = null;

    #[Assert\Email()]
    #[Groups(['create-establishment', 'update-establishment'])]
    #[ORM\Column(length: 55)]
    private ?string $email = null;

    #[Assert\NotBlank()]
    #[Assert\Length(min: 2, max: 255)]
    #[ORM\Column(length: 255)]
    #[Groups(['read-establishment', 'create-establishment', 'update-establishment'])]
    private ?string $city = null;

    #[Assert\NotBlank()]
    #[Assert\Length(min: 2, max: 255)]
    #[ORM\Column(length: 255)]
    #[Groups(['read-establishment', 'create-establishment', 'update-establishment'])]
    private ?string $street = null;

    #[Assert\NotBlank()]
    #[Assert\Length(min: 2, max: 255)]
    #[ORM\Column(length: 255)]
    #[Groups(['read-establishment', 'create-establishment', 'update-establishment'])]
    private ?string $zipCode = null;

    #[Assert\NotBlank()]
    #[Assert\Length(min: 2, max: 255)]
    #[ORM\Column(length: 255)]
    #[Groups(['read-establishment', 'create-establishment', 'update-establishment'])]
    private ?string $country = null;

    #[Assert\NotBlank()]
    #[Assert\Range(min: -90, max: 90)]
    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 6)]
    #[Groups(['read-establishment', 'create-establishment', 'update-establishment'])]
    private ?string $lat = null;

    #[Assert\NotBlank()]
    #[Assert\Range(min: -180, max: 180)]
    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 6)]
    #[Groups(['read-establishment', 'create-establishment', 'update-establishment'])]
    private ?string $long = null;

    #[ORM\ManyToOne(inversedBy: 'establishments')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read-establishment', 'create-establishment', 'update-establishment'])]
    private ?Company $company = null;

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

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): static
    {
        $this->city = $city;

        return $this;
    }

    public function getStreet(): ?string
    {
        return $this->street;
    }

    public function setStreet(string $street): static
    {
        $this->street = $street;

        return $this;
    }

    public function getZipCode(): ?string
    {
        return $this->zipCode;
    }

    public function setZipCode(string $zipCode): static
    {
        $this->zipCode = $zipCode;

        return $this;
    }

    public function getCountry(): ?string
    {
        return $this->country;
    }

    public function setCountry(string $country): static
    {
        $this->country = $country;

        return $this;
    }

    public function getLat(): ?string
    {
        return $this->lat;
    }

    public function setLat(string $lat): static
    {
        $this->lat = $lat;

        return $this;
    }

    public function getLong(): ?string
    {
        return $this->long;
    }

    public function setLong(string $long): static
    {
        $this->long = $long;

        return $this;
    }

    public function getCompany(): ?Company
    {
        return $this->company;
    }

    public function setCompany(?Company $company): static
    {
        $this->company = $company;

        return $this;
    }
}
