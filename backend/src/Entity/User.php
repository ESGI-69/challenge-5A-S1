<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(
    operations: [
        new Get(normalizationContext: ['groups' => ['read-user']]),
//        new Get(uriTemplate: '/users/{id}/infos', normalizationContext: ['groups' => ['read-user', 'read-user-as-admin']], security: 'is_granted("ROLE_ADMIN")'),
        new Post(denormalizationContext: ['groups' => ['create-user']]),
        new Patch(denormalizationContext: ['groups' => ['update-user']]),
    ],
    normalizationContext: ['groups' => ['read-user', 'read-user-mutation']],
)]
#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
#[UniqueEntity(['email'])]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[Groups(['read-user-mutation'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Assert\Email()]
    #[Groups(['read-user-as-admin', 'create-user'])]
    #[ORM\Column(length: 180, unique: true)]
    private ?string $email = null;

    #[ORM\Column]
    private array $roles = [];

    #[Assert\NotBlank()]
    #[Groups(['read-user', 'create-user', 'update-user'])]
    #[ORM\Column(length: 255)]
    private ?string $firstname = null;

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private ?string $password = null;

    #[Groups(['create-user', 'update-user'])]
    private string $plainPassword = '';

    #[ORM\OneToMany(mappedBy: 'author', targetEntity: Service::class)]
    private Collection $authoredServices;

    #[ORM\OneToMany(mappedBy: 'validatedBy', targetEntity: Service::class)]
    private Collection $validatedServices;
    #[ORM\Column(length: 50)]
    #[Groups(['read-user', 'create-user', 'update-user'])]
    private ?string $lastname = null;

    #[ORM\ManyToOne(inversedBy: 'users')]
    #[Groups(['read-user', 'create-user', 'update-user'])]
    private ?Company $companyId = null;

    #[ORM\Column(length: 12)]
    #[Groups(['read-user', 'create-user', 'update-user'])]
    private ?string $phonenumber = null;

    public function __construct()
    {
        $this->authoredServices = new ArrayCollection();
        $this->validatedServices = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    public function isAdmin(): bool
    {
        return in_array('ROLE_ADMIN', $this->getRoles());
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
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

    public function getPlainPassword(): string
    {
        return $this->plainPassword;
    }

    public function setPlainPassword(string $plainPassword): void
    {
        $this->plainPassword = $plainPassword;
        $this->password = $plainPassword;
    }

    /**
     * @return Collection<int, Service>
     */
    public function getAuthoredServices(): Collection
    {
        return $this->authoredServices;
    }

    public function addAuthoredService(Service $authoredService): static
    {
        if (!$this->authoredServices->contains($authoredService)) {
            $this->authoredServices->add($authoredService);
            $authoredService->setAuthor($this);
        }

        return $this;
    }

    public function removeAuthoredService(Service $authoredService): static
    {
        if ($this->authoredServices->removeElement($authoredService)) {
            // set the owning side to null (unless already changed)
            if ($authoredService->getAuthor() === $this) {
                $authoredService->setAuthor(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Service>
     */
    public function getValidatedServices(): Collection
    {
        return $this->validatedServices;
    }

    public function addValidatedService(Service $validatedService): static
    {
        if (!$this->validatedServices->contains($validatedService)) {
            $this->validatedServices->add($validatedService);
            $validatedService->setValidatedBy($this);
        }

        return $this;
    }

    public function removeValidatedService(Service $validatedService): static
    {
        if ($this->validatedServices->removeElement($validatedService)) {
            // set the owning side to null (unless already changed)
            if ($validatedService->getValidatedBy() === $this) {
                $validatedService->setValidatedBy(null);
            }
        }

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): static
    {
        $this->lastname = $lastname;

        return $this;
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

    public function getPhonenumber(): ?string
    {
        return $this->phonenumber;
    }

    public function setPhonenumber(string $phonenumber): static
    {
        $this->phonenumber = $phonenumber;

        return $this;
    }
}
