<?php

namespace App\Entity\Shop;

use ApiPlatform\Doctrine\Orm\Filter\BooleanFilter;
use ApiPlatform\Doctrine\Orm\Filter\DateFilter;
use ApiPlatform\Doctrine\Orm\Filter\NumericFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Entity\Auth\User;
use App\Filters\CustomSearchFilter;
use App\GroupGenerator\Shop\ProductGroupGenerator;
use DateTimeImmutable;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(
    normalizationContext: ['groups' => ['product:read']],
    denormalizationContext: ['groups' => ['product:write']],
    validationContext: ['groups' => ProductGroupGenerator::class],
    operations: [
        new GetCollection(),
        new Post(),
         new Get(),
         new Patch(),
         new Delete(),
    ]
)]
#[ORM\Entity]
class Product
{
    #[ORM\Id, ORM\GeneratedValue, ORM\Column]
    private ?int $id = null;

    #[ApiFilter(CustomSearchFilter::class)]
    #[Groups(['product:read', 'product:write'])]
    #[Assert\Length(min: 5)]
    #[ORM\Column(length: 255)]
    private string $name = '';

    #[ApiFilter(NumericFilter::class)]
    #[Groups(['product:read:logged', 'product:write'])]
    #[Assert\GreaterThan(value: 0, groups: ['product:create:published'])]
    #[ORM\Column]
    private int $price = 0;

    #[ApiFilter(BooleanFilter::class)]
    #[Groups(['product:read', 'product:write'])]
    #[ORM\Column(type: 'boolean')]
    private bool $published = false;

    #[ApiFilter(DateFilter::class)]
    #[Groups(['product:read'])]
    #[ORM\Column]
    private DateTimeImmutable $createdAt;

    #[Groups(['product:read:authorized'])]
    #[ORM\Column(length: 255)]
    private string $documentationUrl = '';

    #[Groups(['product:read:admin'])]
    #[ORM\ManyToMany(targetEntity: User::class, inversedBy: 'products')]
    private Collection $buyers;

    public function __construct()
    {
        $this->buyers = new ArrayCollection();
        $this->createdAt = new DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function getPrice(): int
    {
        return $this->price;
    }

    public function setPrice(int $price): void
    {
        $this->price = $price;
    }

    public function getCreatedAt(): DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(DateTimeImmutable $createdAt): void
    {
        $this->createdAt = $createdAt;
    }

    public function getBuyers(): Collection
    {
        return $this->buyers;
    }

    public function addBuyer(User $buyer): void
    {
        if (!$this->buyers->contains($buyer)) {
            $this->buyers->add($buyer);
        }
    }

    public function removeBuyer(User $buyer): void
    {
        $this->buyers->removeElement($buyer);
    }

    public function getDocumentationUrl(): string
    {
        return $this->documentationUrl;
    }

    public function setDocumentationUrl(string $documentationUrl): void
    {
        $this->documentationUrl = $documentationUrl;
    }

    public function isPublished(): bool
    {
        return $this->published;
    }

    public function setPublished(bool $published): void
    {
        $this->published = $published;
    }
}
