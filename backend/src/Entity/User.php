<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Repository\UserRepository;
use App\Controller\User\GetUserMeController;
use App\Controller\User\PatchUserMeController;
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
        // new Get(
        //     uriTemplate: '/users/{id}/infos',
        //     normalizationContext: ['groups' => ['read-user', 'read-user-as-admin']],
        //     security: 'is_granted("ROLE_ADMIN")'
        // ),
        new Get(
            security: 'is_granted("ROLE_USER")',
            uriTemplate: '/users/me',
            normalizationContext: ['groups' => ['read-me', 'company-read']],
            controller: GetUserMeController::class
        ),
        new Patch(
            security: 'is_granted("ROLE_USER")',
            uriTemplate: '/users/me',
            denormalizationContext: ['groups' => ['update-user', 'company-read']],
            controller: PatchUserMeController::class
        ),
        // Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2OTk0MzYzMzIsImV4cCI6MTY5OTQzOTkzMiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoidXNlckBleGFtcGxlLmNvbSJ9.BjurA22Z-gQBR4uS3ls0jIiOsynBNbnY7BWB-cYNPqBIYikm9Ih7L3N3DFB1G5lK4a3cRYScbuxh9lyNp2t9zJmbFit3bYz6SxA7f5uQrtHrnoyPuOMk3WpnBmj7F3j8qls5Qq9u5V21vJ66LofHmfM6h870xpTaPjc9iiTPaGHPao4VrC2CyAL_VY48WC03K03RX0k0F0PtyFa4w51-V_4vqlGXvAyu0yOr85mTfX4KxBX1J8GinZlsm7DaFKb_DlDNBAuWJQm7F_W8b2Ar_sPJUF65f4qKhEdIX27UYpnixY_X77Ki4n0KjDoICRXEiqNPy9bd-UmWFL1U2AqEcA
        new Get(
            security: 'is_granted("ROLE_ADMIN")',
            normalizationContext: ['groups' => ['read-user', 'read-company-as-admin']]
        ),
        new GetCollection(
            security: 'is_granted("ROLE_ADMIN")',
            normalizationContext: ['groups' => ['read-user', 'read-company-as-admin']]
        ),

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
    #[Groups(['read-user', 'read-user-as-admin', 'create-user', 'read-me'])]
    #[ORM\Column(length: 180, unique: true)]
    private ?string $email = null;

    #[ORM\Column]
    #[Groups(['read-user'])]
    private array $roles = [];

    #[Assert\NotBlank()]
    #[Groups(['read-user', 'create-user', 'update-user', 'read-me'])]
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
    #[Groups(['create-user', 'update-user', 'read-me'])]
    private ?string $lastname = null;

    #[Groups(['read-user', 'create-user', 'update-user', 'read-me'])]
    #[ORM\ManyToOne(inversedBy: 'users')]
    private ?Company $company = null;

    #[ORM\Column(length: 12)]
    #[Groups(['read-user', 'create-user', 'update-user', 'read-me'])]
    private ?string $phonenumber = null;

    #[ORM\OneToMany(mappedBy: 'client', targetEntity: Appointment::class, orphanRemoval: true)]
    private Collection $appointments;

    public function __construct()
    {
        $this->authoredServices = new ArrayCollection();
        $this->validatedServices = new ArrayCollection();
        $this->appointments = new ArrayCollection();
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

    public function getPhonenumber(): ?string
    {
        return $this->phonenumber;
    }

    public function setPhonenumber(string $phonenumber): static
    {
        $this->phonenumber = $phonenumber;

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

    /**
     * @return Collection<int, Appointment>
     */
    public function getAppointments(): Collection
    {
        return $this->appointments;
    }

    public function addAppointment(Appointment $appointment): static
    {
        if (!$this->appointments->contains($appointment)) {
            $this->appointments->add($appointment);
            $appointment->setClient($this);
        }

        return $this;
    }

    public function removeAppointment(Appointment $appointment): static
    {
        if ($this->appointments->removeElement($appointment)) {
            // set the owning side to null (unless already changed)
            if ($appointment->getClient() === $this) {
                $appointment->setClient(null);
            }
        }

        return $this;
    }
}
