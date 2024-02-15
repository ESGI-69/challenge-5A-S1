<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\EstablishmentRepository;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;  
use App\Filter\IsOpenFilter;
use ApiPlatform\Serializer\Filter\PropertyFilter;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Denormalizer\EstablishmentAddressDenormalizer; // Import the custom denormalizer class
use App\Controller\Establishment\MapEstablishmentPictureController;
use App\Controller\Establishment\MapEstablishmentsPictureController;

#[ORM\Entity(repositoryClass: EstablishmentRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(
            normalizationContext: ['groups' => ['read-establishment', 'read-company']],
            controller: MapEstablishmentsPictureController::class,
        ),
        new GetCollection(
            uriTemplate: '/establishments/{id}/employees',
            normalizationContext: ['groups' => ['read-establishment-employees']],
        ),
        new GetCollection(
            uriTemplate: '/establishments/cities',
            normalizationContext: ['groups' => ['read-establishment-city']],
            paginationEnabled: true,
            paginationItemsPerPage: 5, // Limit the results to 5
        ),
        new Get(
            normalizationContext: ['groups' => ['read-establishment', 'read-company']],
            controller: MapEstablishmentPictureController::class,
        ),
        new Post(
            denormalizationContext: [
                'groups' => ['create-establishment'],
                'denormalizer' => EstablishmentAddressDenormalizer::class, // Add the custom denormalizer class
            ],
            securityPostDenormalize: 'is_granted("ROLE_PRESTA") and object.getCompany() == user.getCompany()',
            securityMessage: 'You can only create an establishment for your company',
            securityPostDenormalizeMessage: 'You can only create an establishment for your company',
        ),
        new Patch(
            denormalizationContext: [
                'groups' => ['update-establishment'],
                'denormalizer' => EstablishmentAddressDenormalizer::class, // Add the custom denormalizer class
            ],
            securityPostDenormalize: 'is_granted("ROLE_PRESTA") and object.getCompany() == user.getCompany()',
            securityMessage: 'You can only update an establishment for your company',
            securityPostDenormalizeMessage: 'You can only update an establishment for your company',
        ),
        new Delete(
            security: 'is_granted("ROLE_ADMIN") or (is_granted("ROLE_PRESTA") and object.getCompany() == user.getCompany())',
        ),
    ],
    
)]

#[ApiFilter(SearchFilter::class, strategy: 'exact')]
#[ApiFilter(
    IsOpenFilter::class,
    properties: ['isOpen'],
)]
#[ApiFilter(
    SearchFilter::class,
    properties: [
        'city' => 'ipartial',
        'zipCode' => 'start',
        'company.name' => 'partial',
        'services.id' => 'exact',
        'company.id' => 'exact',
        'type.id' => 'exact',
    ],
)]

class Establishment
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['read-establishment','read-service','employee-getall', 'appointment-read', 'appointment-me'])]
    private ?int $id = null;

    #[Assert\Email()]
    #[Groups(['create-establishment', 'update-establishment', 'appointment-read', 'read-establishment'])]
    #[ORM\Column(length: 55)]
    private ?string $email = null;

    #[Assert\NotBlank()]
    #[Assert\Length(min: 2, max: 255)]
    #[ORM\Column(length: 255)]
    #[Groups(['read-establishment', 'create-establishment', 'update-establishment', 'appointment-read', 'employee-getall', 'appointment-me','read-establishment-city'])]
    private ?string $city = null;

    #[Assert\NotBlank()]
    #[Assert\Length(min: 2, max: 255)]
    #[ORM\Column(length: 255)]
    #[Groups(['read-establishment', 'create-establishment', 'update-establishment', 'appointment-read', 'employee-getall', 'appointment-me'])]
    private ?string $street = null;

    #[Assert\NotBlank()]
    #[Assert\Length(min: 2, max: 255)]
    #[ORM\Column(length: 255)]
    #[Groups(['read-establishment', 'create-establishment', 'update-establishment', 'appointment-read', 'appointment-me'])]
    private ?string $zipCode = null;

    #[Assert\NotBlank()]
    #[Assert\Length(min: 2, max: 255)]
    #[ORM\Column(length: 255)]
    #[Groups(['read-establishment', 'create-establishment', 'update-establishment', 'appointment-read'])]
    private ?string $country = null;

    #[Assert\NotBlank()]
    #[Assert\Range(min: -90, max: 90)]
    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 6)]
    #[Groups(['read-establishment', 'update-establishment', 'appointment-read'])]
    private ?string $lat = null;

    #[Assert\NotBlank()]
    #[Assert\Range(min: -180, max: 180)]
    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 6)]
    #[Groups(['read-establishment', 'update-establishment', 'appointment-read'])]
    private ?string $long = null;

    #[ApiFilter(SearchFilter::class, properties: [
        'company.id' => 'exact',
    ])]
    #[ORM\ManyToOne(inversedBy: 'establishments')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read-establishment', 'create-establishment', 'appointment-me'])]
    private ?Company $company = null;

    #[ORM\OneToMany(mappedBy: 'preferedEstablishment', targetEntity: Employee::class, cascade: ['remove'], orphanRemoval: true)]
    #[Groups(['read-establishment-employees', 'company-statistics-getall'])]
    private Collection $employees;

    #[ORM\OneToMany(mappedBy: 'establishment', targetEntity: Appointment::class, cascade: ['remove'], orphanRemoval: true)]
    #[Groups(['company-statistics-getall'])]
    private Collection $appointments;

    #[ORM\OneToMany(mappedBy: 'establishment', targetEntity: OpeningHour::class, cascade: ['remove'], orphanRemoval: true)]
    #[Groups(['read-establishment'])]
    private Collection $openingHours;

    #[Groups(['employee-getall'])]
    #[ORM\OneToMany(mappedBy: 'establishment', targetEntity: Service::class, cascade: ['remove'], orphanRemoval: true)]
    private Collection $services;

    #[Groups(['read-establishment'])]
    #[ORM\OneToMany(mappedBy: 'establishment', targetEntity: ServiceType::class, cascade: ['remove'], orphanRemoval: true)]
    private Collection $serviceTypes;

    #[Assert\NotBlank()]
    #[Groups(['create-establishment', 'update-establishment', 'read-establishment'])]
    #[ORM\ManyToOne(inversedBy: 'establishments')]
    #[ORM\JoinColumn(nullable: false)]
    private ?EstablishmentType $type = null;
    
    #[ORM\ManyToMany(targetEntity: FeedbackType::class, mappedBy: 'establishments', cascade: ['persist'])]
    #[Groups(['read-establishment', 'update-establishment'])]
    private Collection $feedbackTypes;

    #[ORM\OneToMany(mappedBy: 'establishment', targetEntity: Feedback::class, cascade: ['remove'], orphanRemoval: true)]
    #[Groups(['read-establishment'])]
    private Collection $feedback;

    #[ORM\Column(nullable: true)]
    #[Groups(['read-establishment'])]
    private ?float $averageNotation = null;

    #[Groups(['read-establishment', 'appointment-me'])]
    #[ORM\OneToMany(mappedBy: 'establishment', targetEntity: EstablishmentPicture::class, orphanRemoval: true, cascade: ['remove'])]
    private Collection $establishmentPictures;

    public function __construct()
    {
        $this->employees = new ArrayCollection();
        $this->appointments = new ArrayCollection();
        $this->openingHours = new ArrayCollection();
        $this->services = new ArrayCollection();
        $this->serviceTypes = new ArrayCollection();
        $this->feedbackTypes = new ArrayCollection();
        $this->feedback = new ArrayCollection();
        $this->establishmentPictures = new ArrayCollection();
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

    /**
     * @return Collection<int, ServiceType>
     */
    public function getServiceTypes(): Collection
    {
        return $this->serviceTypes;
    }

    public function addServiceType(ServiceType $serviceType): static
    {
        if (!$this->serviceTypes->contains($serviceType)) {
            $this->serviceTypes->add($serviceType);
            $serviceType->setEstablishment($this);
        }

        return $this;
    }

    public function removeServiceType(ServiceType $serviceType): static
    {
        if ($this->serviceTypes->removeElement($serviceType)) {
            // set the owning side to null (unless already changed)
            if ($serviceType->getEstablishment() === $this) {
                $serviceType->setEstablishment(null);
            }
        }

        return $this;
    }

    public function getType(): ?EstablishmentType
    {
        return $this->type;
    }

    public function setType(?EstablishmentType $type): static
    {
        $this->type = $type;

        return $this;
    }

    /**
     * @return Collection<int, FeedbackType>
     */
    public function getFeedbackTypes(): Collection
    {
        return $this->feedbackTypes;
    }

    public function addFeedbackType(FeedbackType $feedbackType): static
    {
        if (!$this->feedbackTypes->contains($feedbackType)) {
            $this->feedbackTypes->add($feedbackType);
            $feedbackType->addEstablishment($this);
        }

        return $this;
    }

    public function removeFeedbackType(FeedbackType $feedbackType): static
    {
        if ($this->feedbackTypes->removeElement($feedbackType)) {
            $feedbackType->removeEstablishment($this);
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
            $feedback->setEstablishment($this);
        }

        return $this;
    }

    public function removeFeedback(Feedback $feedback): static
    {
        if ($this->feedback->removeElement($feedback)) {
            // set the owning side to null (unless already changed)
            if ($feedback->getEstablishment() === $this) {
                $feedback->setEstablishment(null);
            }
        }

        return $this;
    }

    public function getAverageNotation(): ?float
    {
        return $this->averageNotation;
    }

    public function setAverageNotation(?float $averageNotation): static
    {
        $this->averageNotation = $averageNotation;

        return $this;
    }

    /**
     * @return Collection<int, EstablishmentPicture>
     */
    public function getEstablishmentPictures(): Collection
    {
        return $this->establishmentPictures;
    }

    public function addEstablishmentPicture(EstablishmentPicture $establishmentPicture): static
    {
        if (!$this->establishmentPictures->contains($establishmentPicture)) {
            $this->establishmentPictures->add($establishmentPicture);
            $establishmentPicture->setEstablishment($this);
        }

        return $this;
    }

    public function removeEstablishmentPicture(EstablishmentPicture $establishmentPicture): static
    {
        if ($this->establishmentPictures->removeElement($establishmentPicture)) {
            // set the owning side to null (unless already changed)
            if ($establishmentPicture->getEstablishment() === $this) {
                $establishmentPicture->setEstablishment(null);
            }
        }

        return $this;
    }
}
