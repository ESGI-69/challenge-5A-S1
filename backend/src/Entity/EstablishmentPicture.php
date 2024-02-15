<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\EstablishmentPictureRepository;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Delete;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
// use App\Controller\EstablishmentPicture\DeletePictureOnDeleteController;

#[ORM\Entity(repositoryClass: EstablishmentPictureRepository::class)]
#[ApiResource(
    operations: [
        new Post(
            normalizationContext: ['groups' => ['establishement-picture-create']],
            denormalizationContext: ['groups' => ['establishement-picture-create']], inputFormats: ['multipart' => ['multipart/form-data']],
            securityPostDenormalize: 'is_granted("ROLE_PRESTA") and object.getEstablishment().getCompany().getId() == user.getCompany().getId()',
        ),
        new Delete(
            normalizationContext: ['groups' => ['delete-establishment-picture']],
            denormalizationContext: ['groups' => ['delete-establishment-picture']],
            securityPostDenormalize: 'is_granted("ROLE_PRESTA") and object.getEstablishment().getCompany().getId() == user.getCompany().getId()',
        ),
    ]
)]
#[Vich\Uploadable]
class EstablishmentPicture
{
    #[Groups(['read-establishment'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['establishement-picture-create'])]
    // #[Assert\File(mimeTypes: [''])]
    #[Vich\UploadableField(mapping: 'company_picture', fileNameProperty:'pathPicture')]
    public ?File $filePicture = null;

    #[Groups(['read-establishment', 'get-all-etsbalishment-picture', 'appointment-me'])]
    #[ORM\Column(length: 255)]
    private ?string $pathPicture = null;

    #[Groups(['establishement-picture-create', 'get-all-etsbalishment-picture'])]
    #[ORM\ManyToOne(inversedBy: 'establishmentPictures')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Establishment $establishment = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPathPicture(): ?string
    {
        return $this->pathPicture;
    }

    public function setPathPicture(?string $pathPicture): static
    {
        $this->pathPicture = $pathPicture;

        return $this;
    }

    public function getEstablishment(): ?Establishment
    {
        return $this->establishment;
    }

    public function setEstablishment(?Establishment $establishment): static
    {
        $this->establishment = $establishment;

        return $this;
    }
}
