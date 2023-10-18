<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Repository\CompanyRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\HttpFoundation\File\File;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

#[ORM\Entity(repositoryClass: CompanyRepository::class)]
#[ApiResource(
    operations: [
        new Get(normalizationContext: ['groups' => ['read-company']]),
        new Post(denormalizationContext: ['groups' => ['create-company']], inputFormats: ['multipart' => ['multipart/form-data']]),
        new Patch(denormalizationContext: ['groups' => ['update-company']], inputFormats: ['multipart' => ['multipart/form-data']]),
    ],
    normalizationContext: ['groups' => ['read-company', 'read-company-mutation']]
)]
#[Vich\Uploadable]
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

    #[Vich\UploadableField(mapping: 'company_kbis', fileNameProperty:'pathKbis')]
    #[Groups(['create-company', 'update-company'])]
    public ?File $fileKbis = null;

    #[Groups(['read-company'])]
    #[ORM\Column(length: 255, nullable: true)]
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

    #[Vich\UploadableField(mapping: 'company_logo', fileNameProperty:'logoPath')]
    #[Groups(['create-company', 'update-company'])]
    public ?File $fileLogo = null;

    #[Groups(['read-company'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $logoPath = null;

    #[ORM\OneToMany(mappedBy: 'company', targetEntity: Establishment::class, orphanRemoval: true)]
    private Collection $establishments;

    #[ORM\OneToMany(mappedBy: 'companyId', targetEntity: Employee::class, orphanRemoval: true)]
    private Collection $employees;

    public function __construct()
    {
        $this->establishments = new ArrayCollection();
        $this->employees = new ArrayCollection();
    }
    #[ORM\OneToMany(mappedBy: 'companyId', targetEntity: User::class)]
    private Collection $users;

    public function __construct()
    {
        $this->users = new ArrayCollection();
    }

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

    /**
     * @return Collection<int, Establishment>
     */
    public function getEstablishments(): Collection
    {
        return $this->establishments;
    }

    public function addEstablishment(Establishment $establishment): static
    {
        if (!$this->establishments->contains($establishment)) {
            $this->establishments->add($establishment);
            $establishment->setCompany($this);
        }
    
        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user): static
    {
        if (!$this->users->contains($user)) {
            $this->users->add($user);
            $user->setCompanyId($this);
        }

        return $this;
    }

    public function removeEstablishment(Establishment $establishment): static
    {
        if ($this->establishments->removeElement($establishment)) {
            // set the owning side to null (unless already changed)
            if ($establishment->getCompany() === $this) {
                $establishment->setCompany(null);
            }
        }
        
        return $this;
    }

    public function removeUser(User $user): static
    {
        if ($this->users->removeElement($user)) {
            // set the owning side to null (unless already changed)
            if ($user->getCompanyId() === $this) {
                $user->setCompanyId(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Employee>
     */
    public function getEmployees(): Collection
    {
        return $this->employees;
    }

    public function addEmployee(Employee $employee): static
    {
        if (!$this->employees->contains($employee)) {
            $this->employees->add($employee);
            $employee->setCompanyId($this);
        }

        return $this;
    }

    public function removeEmployee(Employee $employee): static
    {
        if ($this->employees->removeElement($employee)) {
            // set the owning side to null (unless already changed)
            if ($employee->getCompanyId() === $this) {
                $employee->setCompanyId(null);
            }
        }

        return $this;
    }
}
