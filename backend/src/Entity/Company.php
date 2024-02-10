<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\GetCollection;
use App\Repository\CompanyRepository;
use App\Controller\Company\CreateCompanyController;
use App\Controller\Company\ValidateCompanyController;
use App\Controller\Company\GetKbisFileController;
Use App\Controller\Company\GetLogoFileController;
use App\Controller\Company\RejectCompanyController;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\HttpFoundation\File\File;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use ApiPlatform\Doctrine\Orm\Filter\ExistsFilter;
use App\Controller\Statistics\CompanyStatisticsController;

#[ORM\HasLifecycleCallbacks]
#[ORM\Entity(repositoryClass: CompanyRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(
            uriTemplate: '/admin/companies',
            security: 'is_granted("ROLE_ADMIN")',
            normalizationContext: ['groups' => ['company-getall', 'read-company-as-admin']]
        ),
        new GetCollection(
            normalizationContext: ['groups' => ['company-getall', 'read-establishment']]
        ),
        new Get(
            uriTemplate: '/admin/companies/{id}',
            security: 'is_granted("ROLE_ADMIN")',
            normalizationContext: ['groups' => ['company-read', 'read-company-as-admin', 'read-establishment']]
        ),
        new Get(
            securityPostDenormalize: 'is_granted("ROLE_USER") and object == user.getCompany()',
            normalizationContext: ['groups' => ['company-read', 'read-establishment']]
        ),
        new Get(
            name: 'get-company-employees',
            uriTemplate: '/companies/{id}/employees',
            normalizationContext: ['groups' => ['company-getall','read-company-employees']],
        ),
        new Get(
            uriTemplate: '/companies/{id}/kbis',
            securityPostDenormalize: 'is_granted("ROLE_ADMIN") or object == user.getCompany()',
            normalizationContext: ['groups' => ['company-read']],
            controller: GetKbisFileController::class
        ),
        new Get(
            uriTemplate: '/companies/{id}/logo',
            normalizationContext: ['groups' => ['company-read']],
            controller: GetLogoFileController::class
        ),
        new Get(
          uriTemplate: '/companies/{id}/statistics',
          normalizationContext: ['groups' => ['company-statistics-getall']],
          controller: CompanyStatisticsController::class
      ),
        new Post(
            securityPostDenormalize: 'is_granted("ROLE_USER")',
            denormalizationContext: ['groups' => ['company-create']], inputFormats: ['multipart' => ['multipart/form-data']],
            controller: CreateCompanyController::class
        ),
        new Patch(
            securityPostDenormalize: 'is_granted("ROLE_USER") and object == user.getCompany()',
            denormalizationContext: ['groups' => ['company-update']],
        ),
        new Patch(
            uriTemplate: '/admin/companies/{id}/validate',
            securityPostDenormalize: 'is_granted("ROLE_ADMIN")',
            denormalizationContext: ['groups' => ['company-validate']],
            controller: ValidateCompanyController::class
        ),
        new Patch(
            uriTemplate: '/admin/companies/{id}/reject',
            securityPostDenormalize: 'is_granted("ROLE_ADMIN")',
            denormalizationContext: ['groups' => ['company-reject']],
            controller: RejectCompanyController::class
        ),
        new Delete(
            security: 'is_granted("ROLE_ADMIN") or object == user.getCompany()'
        ),
    ],
    normalizationContext: ['groups' => ['read-company']]
)]

#[ApiFilter(
    SearchFilter::class,
    properties: [
        'name' => 'ipartial',
    ],
)]
#[ApiFilter(ExistsFilter::class, properties: ['validatedAt', 'rejectedReason'])]

#[Vich\Uploadable]
#[UniqueEntity(['email'])]
class Company
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['company-read', 'company-create', 'company-update', 'company-getall', 'read-establishment', 'appointment-me'])]
    private ?int $id = null;

    #[Groups(['company-read', 'company-create', 'company-update', 'company-getall', 'read-establishment', 'appointment-me'])]
    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[Assert\File(mimeTypes: ['application/pdf'])]
    #[Vich\UploadableField(mapping: 'company_kbis', fileNameProperty:'pathKbis')]
    #[Groups(['company-create', 'read-company-as-admin'])]
    public ?File $fileKbis = null;

    #[Groups(['company-read', 'read-company-as-admin'])]
    #[ORM\Column(length: 255, nullable: false)]
    private ?string $pathKbis = null;

    #[Assert\Email()]
    #[Groups(['company-read', 'company-create', 'company-update', 'company-getall', 'read-company-as-admin'])]
    #[ORM\Column(length: 255, unique: true)]
    private ?string $email = null;

    #[Groups(['read-company-as-admin'])]
    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $validatedAt = null;

    #[Groups(['read-company-as-admin', 'company-reject'])]
    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $rejectedReason = null;

    #[Assert\File(mimeTypes: ['image/svg+xml', 'image/jpeg', 'image/png'])]
    #[Vich\UploadableField(mapping: 'company_logo', fileNameProperty:'logoPath')]
    #[Groups(['company-create', 'company-getall', 'appointment-me'])]
    public ?File $fileLogo = null;

    #[Groups(['company-read', 'company-getall'])]
    #[ORM\Column(length: 255, nullable: false)]
    private ?string $logoPath = null;

    #[Groups(['company-getall', 'company-statistics-getall'])]
    #[ORM\OneToMany(mappedBy: 'company', targetEntity: Establishment::class, orphanRemoval: true)]
    private Collection $establishments;

    #[Groups(['company-read','read-company-employees', 'company-statistics-getall'])]
    #[ORM\OneToMany(mappedBy: 'companyId', targetEntity: Employee::class, orphanRemoval: true)]
    private Collection $employees;

    #[ORM\OneToMany(mappedBy: 'company', targetEntity: User::class, orphanRemoval: true)]
    private Collection $users;

    #[Groups(['read-company-as-admin'])]
    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    #[Groups(['read-company-as-admin'])]
    #[ORM\Column]
    private ?\DateTimeImmutable $updatedAt = null;

    public function __construct()
    {
        $this->establishments = new ArrayCollection();
        $this->users = new ArrayCollection();
        $this->employees = new ArrayCollection();
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
            $user->setCompany($this);
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
            if ($user->getCompany() === $this) {
                $user->setCompany(null);
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

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTimeImmutable $updatedAt): static
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }
}
