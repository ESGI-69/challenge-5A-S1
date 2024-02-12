<?php

namespace App\Controller\Establishment;

use App\Entity\Establishment;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class MapEstablishmentPictureController
{
    public function __construct(
    ) {}

    public function __invoke(Establishment $establishement): Establishment
    {
        foreach ($establishement->getEstablishmentPictures() as $picture) {
            $picture->setPathPicture('/establishment_picture/'.$picture->getPathPicture());
        }
        return $establishement;
    }
}