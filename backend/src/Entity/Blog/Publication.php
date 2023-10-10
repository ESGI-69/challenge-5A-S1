<?php

namespace App\Entity\Blog;

use ApiPlatform\Doctrine\Common\Filter\SearchFilterInterface;
use ApiPlatform\Doctrine\Orm\Filter\DateFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Entity\Auth\User;
use App\Filters\CustomSearchFilter;
use DateTimeImmutable;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(
    normalizationContext: ['groups' => ['post:read']],
    operations: [
        new GetCollection(),
        new GetCollection(uriTemplate: '/publications/list', normalizationContext: ['groups' => ['post:read:list']]),

        new Post(denormalizationContext: ['groups' => ['post:update', 'post:create']]),
        new Get(normalizationContext: ['groups' => ['post:read', 'post:read:full']]),
        new Patch(denormalizationContext: ['groups' => ['post:update']]),
    ],
)]
#[ApiFilter(CustomSearchFilter::class, properties: [
    'title' => CustomSearchFilter::SEARCH_EXACT,
    'resume' => CustomSearchFilter::SEARCH_EXACT]
)]
#[ORM\Entity]
class Publication
{
    #[ORM\Id, ORM\GeneratedValue, ORM\Column]
    private ?int $id = null;

    #[ApiFilter(CustomSearchFilter::class)]
    #[Groups(['post:read', 'post:update', 'post:read:list'])]
    #[Assert\Length(min: 10)]
    #[ORM\Column(length: 255)]
    private string $title = '';

    #[ApiFilter(CustomSearchFilter::class)]
    #[Groups(['post:read', 'post:update'])]
    #[Assert\Length(min: 20)]
    #[ORM\Column(type: Types::TEXT)]
    private string $resume = '';

    #[Groups(['post:read:full', 'post:update'])]
    #[Assert\Length(min: 50)]
    #[ORM\Column(type: Types::TEXT)]
    private string $content = '';

    #[ApiFilter(DateFilter::class)]
    #[Groups(['post:read'])]
    #[ORM\Column]
    private ?DateTimeImmutable $createdAt;

    #[ORM\OneToMany(mappedBy: 'post', targetEntity: Comment::class)]
    private Collection $comments;

    #[ApiFilter(SearchFilter::class, strategy: SearchFilterInterface::STRATEGY_EXACT)]
    #[Groups(['post:read', 'post:create'])]
    #[ORM\ManyToOne(inversedBy: 'posts')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $author = null;

    #[Groups(['post:read'])]
    protected ?int $commentNb = null;

    public function __construct()
    {
        $this->comments = new ArrayCollection();
        $this->createdAt = new DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function setTitle(string $title): void
    {
        $this->title = $title;
    }

    public function getResume(): string
    {
        return $this->resume;
    }

    public function setResume(string $resume): void
    {
        $this->resume = $resume;
    }

    public function getContent(): ?string
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

    /**
     * @return Collection<int, Comment>
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }

    public function addComment(Comment $comment): void
    {
        if (!$this->comments->contains($comment)) {
            $this->comments->add($comment);
            $comment->setPost($this);
        }
    }

    public function removeComment(Comment $comment): void
    {
        if ($this->comments->removeElement($comment)) {
            // set the owning side to null (unless already changed)
            if ($comment->getPost() === $this) {
                $comment->setPost(null);
            }
        }
    }

    public function getAuthor(): ?User
    {
        return $this->author;
    }

    public function setAuthor(?User $author): void
    {
        $this->author = $author;
    }

    public function getCommentNb(): ?int
    {
        return $this->commentNb;
    }

    public function setCommentNb(int $commentNb): void
    {
        $this->commentNb = $commentNb;
    }
}
