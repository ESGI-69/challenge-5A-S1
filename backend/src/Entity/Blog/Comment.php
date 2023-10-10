<?php

namespace App\Entity\Blog;

use ApiPlatform\Doctrine\Common\Filter\SearchFilterInterface;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Entity\Auth\User;
use DateTimeImmutable;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(
    uriTemplate: '/publications/{id}/comments',
    operations: [
        new GetCollection(),
        new Post()
    ],
    uriVariables: [
        'id' => new Link(toProperty: 'post', fromClass: Publication::class)
    ],
    shortName: 'Publication'
)]
#[ApiResource(
    normalizationContext: ['groups' => ['comment:read']],
    denormalizationContext: ['groups' => ['comment:write']],
    operations: [
        new Patch(),
        new Delete()
    ]
)]
#[ApiFilter(SearchFilter::class, strategy: SearchFilterInterface::STRATEGY_START, properties: ['author'])]
#[ApiFilter(SearchFilter::class, strategy: SearchFilterInterface::STRATEGY_START, properties: ['author.name'])]
#[ORM\Entity()]
class Comment
{
    #[ORM\Id, ORM\GeneratedValue, ORM\Column]
    private ?int $id = null;

    #[ApiFilter(SearchFilter::class, strategy: SearchFilterInterface::STRATEGY_PARTIAL)]
    #[Groups(['comment:read', 'comment:write'])]
    #[Assert\Length(min: 5)]
    #[ORM\Column(length: 255)]
    private string $content = '';

    #[Groups(['comment:read'])]
    #[ORM\Column]
    private DateTimeImmutable $createdAt;

    #[Groups(['comment:write'])]
    #[ORM\ManyToOne(inversedBy: 'comments')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Publication $post = null;

    #[Groups(['comment:read', 'comment:write'])]
    #[ORM\ManyToOne(inversedBy: 'comments')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $author = null;

    public function __construct()
    {
        $this->createdAt = new DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getContent(): string
    {
        return $this->content;
    }

    public function setContent(string $content): void
    {
        $this->content = $content;
    }

    public function getCreatedAt(): ?DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(DateTimeImmutable $createdAt): void
    {
        $this->createdAt = $createdAt;
    }

    public function getPost(): ?Publication
    {
        return $this->post;
    }

    public function setPost(?Publication $post): void
    {
        $this->post = $post;
    }

    public function getAuthor(): ?User
    {
        return $this->author;
    }

    public function setAuthor(?User $author): void
    {
        $this->author = $author;
    }
}
