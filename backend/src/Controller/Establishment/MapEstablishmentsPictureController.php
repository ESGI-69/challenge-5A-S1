<?php

namespace App\Controller\Establishment;

use App\Entity\Establishment;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class MapEstablishmentsPictureController
{
    public function __construct(
    ) {}

    public function __invoke($data)
    {
        foreach ($data as $establishement) {
            foreach ($establishement->getEstablishmentPictures() as $picture) {
                $picture->setPathPicture('/establishment_picture/'.$picture->getPathPicture());
            }
        }
        return $data;
    }
}