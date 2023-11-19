<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\EstablishmentRepository;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Delete;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;


#[ORM\Entity(repositoryClass: EstablishmentRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(
            normalizationContext: ['groups' => ['read-establishment', 'read-company']],
        ),
        new GetCollection(
            uriTemplate: '/establishments/{id}/employees',
            normalizationContext: ['groups' => ['read-establishment-employees']],
        ),
        new Get(
            normalizationContext: ['groups' => ['read-establishment', 'read-company']]
        ),
        new Post(
            denormalizationContext: ['groups' => ['create-establishment']],
            securityPostDenormalize: 'is_granted("ROLE_PRESTA") and object.getCompany() == user.getCompany()',
            securityMessage: 'You can only create an establishment for your company',
            securityPostDenormalizeMessage: 'You can only create an establishment for your company',
        ),
        new Patch(
            denormalizationContext: ['groups' => ['update-establishment']],
            securityPostDenormalize: 'is_granted("ROLE_PRESTA") and object.getCompany() == user.getCompany()',
            securityMessage: 'You can only update an establishment for your company',
            securityPostDenormalizeMessage: 'You can only update an establishment for your company',
        ),
        new Delete(
            security: 'is_granted("ROLE_ADMIN")',
        ),
    ],
    
)]
class Establishment
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['read-establishment'])]
    private ?int $id = null;

    #[ORM\Column(length: 55)]
    #[Assert\Length(min: 2, max: 50)]
    #[Groups(['read-establishment', 'create-establishment', 'update-establishment', 'appointment-read'])]
    private ?string $name = null;

    #[Assert\Email()]
    #[Groups(['create-establishment', 'update-establishment', 'appointment-read'])]
    #[ORM\Column(length: 55)]
    private ?string $email = null;

    #[Assert\NotBlank()]
    #[Assert\Length(min: 2, max: 255)]
    #[ORM\Column(length: 255)]
    #[Groups(['read-establishment', 'create-establishment', 'update-establishment', 'appointment-read'])]
    private ?string $city = null;

    #[Assert\NotBlank()]
    #[Assert\Length(min: 2, max: 255)]
    #[ORM\Column(length: 255)]
    #[Groups(['read-establishment', 'create-establishment', 'update-establishment', 'appointment-read'])]
    private ?string $street = null;

    #[Assert\NotBlank()]
    #[Assert\Length(min: 2, max: 255)]
    #[ORM\Column(length: 255)]
    #[Groups(['read-establishment', 'create-establishment', 'update-establishment', 'appointment-read'])]
    private ?string $zipCode = null;

    #[Assert\NotBlank()]
    #[Assert\Length(min: 2, max: 255)]
    #[ORM\Column(length: 255)]
    #[Groups(['read-establishment', 'create-establishment', 'update-establishment', 'appointment-read'])]
    private ?string $country = null;

    #[Assert\NotBlank()]
    #[Assert\Range(min: -90, max: 90)]
    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 6)]
    #[Groups(['read-establishment', 'create-establishment', 'update-establishment', 'appointment-read'])]
    private ?string $lat = null;

    #[Assert\NotBlank()]
    #[Assert\Range(min: -180, max: 180)]
    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 6)]
    #[Groups(['read-establishment', 'create-establishment', 'update-establishment', 'appointment-read'])]
    private ?string $long = null;

    #[ORM\ManyToOne(inversedBy: 'establishments')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read-establishment', 'create-establishment', 'update-establishment'])]
    private ?Company $company = null;

    #[ORM\OneToMany(mappedBy: 'preferedEstablishment', targetEntity: Employee::class)]
    #[Groups(['read-establishment-employees'])]
    private Collection $employees;

    #[ORM\OneToMany(mappedBy: 'establishment', targetEntity: Appointment::class, orphanRemoval: true)]
    private Collection $appointments;

    #[ORM\OneToMany(mappedBy: 'establishment', targetEntity: OpeningHour::class, orphanRemoval: true)]
    #[Groups(['read-establishment'])]
    private Collection $openingHours;

    #[ORM\OneToMany(mappedBy: 'establishment', targetEntity: Service::class, orphanRemoval: true)]
    private Collection $services;

    public function __construct()
    {
        $this->employees = new ArrayCollection();
        $this->appointments = new ArrayCollection();
        $this->openingHours = new ArrayCollection();
        $this->services = new ArrayCollection();
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
            $employee->setPreferedEstablishment($this);
        }

        return $this;
    }

    public function removeEmployee(Employee $employee): static
    {
        if ($this->employees->removeElement($employee)) {
            // set the owning side to null (unless already changed)
            if ($employee->getPreferedEstablishment() === $this) {
                $employee->setPreferedEstablishment(null);
            }
        }

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
            $appointment->setEstablishment($this);
        }

        return $this;
    }

    public function removeAppointment(Appointment $appointment): static
    {
        if ($this->appointments->removeElement($appointment)) {
            // set the owning side to null (unless already changed)
            if ($appointment->getEstablishment() === $this) {
                $appointment->setEstablishment(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, OpeningHour>
     */
    public function getOpeningHours(): Collection
    {
        return $this->openingHours;
    }

    public function addOpeningHour(OpeningHour $openingHour): static
    {
        if (!$this->openingHours->contains($openingHour)) {
            $this->openingHours->add($openingHour);
            $openingHour->setEstablishment($this);
        }

        return $this;
    }

    public function removeOpeningHour(OpeningHour $openingHour): static
    {
        if ($this->openingHours->removeElement($openingHour)) {
            // set the owning side to null (unless already changed)
            if ($openingHour->getEstablishment() === $this) {
                $openingHour->setEstablishment(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Service>
     */
    public function getServices(): Collection
    {
        return $this->services;
    }

    public function addService(Service $service): static
    {
        if (!$this->services->contains($service)) {
            $this->services->add($service);
            $service->setEstablishment($this);
        }

        return $this;
    }

    public function removeService(Service $service): static
    {
        if ($this->services->removeElement($service)) {
            // set the owning side to null (unless already changed)
            if ($service->getEstablishment() === $this) {
                $service->setEstablishment(null);
            }
        }

        return $this;
    }
}
