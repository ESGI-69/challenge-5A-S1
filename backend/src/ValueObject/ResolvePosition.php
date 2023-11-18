<?php

namespace App\ValueObject;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Controller\ResolvePosController;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

#[ApiResource(
    operations: [
        new Get(
            name: 'ResolvePosition',
            uriTemplate: '/resolve-position',
            controller: ResolvePosController::class,
            normalizationContext: ['groups' => ['read-user']],
            read: false,
        ),
    ],
)]
class ResolvePosition
{
    #[ApiProperty(identifier: true)]
    private string $address = '';

    public function getAddress(): string
    {
        return $this->address;
    }

    public function setAddress(string $address): void
    {
        $this->address = $address;
    }
}
