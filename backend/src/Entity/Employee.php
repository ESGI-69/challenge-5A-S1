<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Repository\EmployeeRepository;
use App\Controller\Employee\GetWorkingHoursRangesOfEmployeeController;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

// @todo : Adapt this entity to block other Company to get others Company data
#[ORM\Entity(repositoryClass: EmployeeRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(
            security: 'is_granted("ROLE_ADMIN")',
            normalizationContext: ['groups' => ['employee-getall']]
        ),
        new Get(
            uriTemplate: '/employees/{id}/working_hours_ranges',
            controller: GetWorkingHoursRangesOfEmployeeController::class,
        ),
        new Get(
            security: 'is_granted("ROLE_ADMIN")',
            normalizationContext: ['groups' => ['employee-get']]),
        new Post(
            security: 'is_granted("ROLE_ADMIN")',
            normalizationContext: ['groups' => ['employee-post']],
            denormalizationContext: ['groups' => ['employee-post']],
        ),
        new Get(
            name: 'read-company-employees',
            uriTemplate: '/companies/employees/{id}',
            normalizationContext: ['groups' => ['employee-getall']],
            denormalizationContext: ['groups' => ['employee-getall']],
            securityPostDenormalize: 'is_granted("ROLE_PRESTA") and object.getCompanyId() == user.getCompany()',
            securityPostDenormalizeMessage: 'You can only get employees of your company'
        ),
        new Post(
            name: 'create-employee-of-company',
            uriTemplate: '/companies/employees',
            normalizationContext: ['groups' => ['employee-post']],
            denormalizationContext: ['groups' => ['employee-post']],
            securityPostDenormalize: 'is_granted("ROLE_PRESTA") and object.getCompanyId() == user.getCompany()',
            securityPostDenormalizeMessage: 'You can only create employees for your company',
            read: false,
        ),
        new Patch(
            security: 'is_granted("ROLE_ADMIN")',
            normalizationContext: ['groups' => ['employee-patch']],
            denormalizationContext: ['groups' => ['employee-patch']],
        ),
        new Patch(
            name: 'patch-employee-of-company',
            uriTemplate: '/companies/employees/{id}',
            normalizationContext: ['groups' => ['employee-patch']],
            denormalizationContext: ['groups' => ['employee-patch']],
            securityPostDenormalize: 'is_granted("ROLE_PRESTA") and object.getCompanyId() == user.getCompany()',
            securityPostDenormalizeMessage: 'You can only patch employees of your company',
        ),
        new Delete(
            security: 'is_granted("ROLE_ADMIN")',
            normalizationContext: ['groups' => ['employee-get']]
        ),
        new Delete(
            name: 'delete-employee-of-company',
            uriTemplate: '/companies/employees/{id}',
            normalizationContext: ['groups' => ['employee-get']],
            denormalizationContext: ['groups' => ['employee-get']],
            securityPostDenormalize: 'is_granted("ROLE_PRESTA") and object.getCompanyId() == user.getCompany()',
            securityPostDenormalizeMessage: 'You can only delete employees of your company',
        ),
    ]
)]
class Employee
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['employee-get', 'employee-getall', 'read-company-employees', 'read-establishment-employees'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'employees')]
    // Also adapt this so that only the company that created the employee can get it (and admins ofc)
    #[Groups(['employee-post', 'employee-get', 'employee-patch', 'employee-getall'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?Company $companyId = null;

    #[ORM\ManyToOne(inversedBy: 'employees')]
    #[Groups(['employee-post', 'employee-get', 'employee-patch', 'employee-getall','read-company-employees'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?Establishment $preferedEstablishment = null;

    #[Groups(['employee-post', 'employee-get', 'employee-patch', 'employee-getall', 'appointment-read','read-company-employees', 'read-establishment-employees'])]
    #[ORM\Column(length: 255)]
    private ?string $firstname = null;

    #[Groups(['employee-post', 'employee-get', 'employee-patch', 'employee-getall','read-company-employees','read-establishment-employees'])]
    #[ORM\Column(length: 255)]
    private ?string $lastname = null;

    #[Groups(['employee-post', 'employee-get', 'employee-patch', 'employee-getall','read-company-employees'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $avatar = null;

    #[ORM\OneToMany(mappedBy: 'employee', targetEntity: Appointment::class, orphanRemoval: true)]
    private Collection $appointments;

    #[ORM\OneToMany(mappedBy: 'Employee', targetEntity: WorkingHoursRange::class, orphanRemoval: true)]
    private Collection $workingHoursRanges;

    #[ORM\OneToMany(mappedBy: 'employee', targetEntity: Feedback::class)]
    private Collection $feedback;

    public function __construct()
    {
        $this->appointments = new ArrayCollection();
        $this->workingHoursRanges = new ArrayCollection();
        $this->feedback = new ArrayCollection();
    }

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
            $appointment->setEmployee($this);
        }

        return $this;
    }

    public function removeAppointment(Appointment $appointment): static
    {
        if ($this->appointments->removeElement($appointment)) {
            // set the owning side to null (unless already changed)
            if ($appointment->getEmployee() === $this) {
                $appointment->setEmployee(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, WorkingHoursRange>
     */
    public function getWorkingHoursRanges(): Collection
    {
        return $this->workingHoursRanges;
    }

    public function addWorkingHoursRange(WorkingHoursRange $workingHoursRange): static
    {
        if (!$this->workingHoursRanges->contains($workingHoursRange)) {
            $this->workingHoursRanges->add($workingHoursRange);
            $workingHoursRange->setEmployee($this);
        }

        return $this;
    }

    public function removeWorkingHoursRange(WorkingHoursRange $workingHoursRange): static
    {
        if ($this->workingHoursRanges->removeElement($workingHoursRange)) {
            // set the owning side to null (unless already changed)
            if ($workingHoursRange->getEmployee() === $this) {
                $workingHoursRange->setEmployee(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Feedback>
     */
    public function getFeedback(): Collection
    {
        return $this->feedback;
    }

    public function addFeedback(Feedback $feedback): static
    {
        if (!$this->feedback->contains($feedback)) {
            $this->feedback->add($feedback);
            $feedback->setEmployee($this);
        }

        return $this;
    }

    public function removeFeedback(Feedback $feedback): static
    {
        if ($this->feedback->removeElement($feedback)) {
            // set the owning side to null (unless already changed)
            if ($feedback->getEmployee() === $this) {
                $feedback->setEmployee(null);
            }
        }

        return $this;
    }
}
