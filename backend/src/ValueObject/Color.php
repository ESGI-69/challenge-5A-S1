<?php

declare(strict_types=1);

namespace App\ValueObject;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use App\Processor\ColorStateProcessor;
use App\Provider\ColorStateProvider;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    provider: ColorStateProvider::class,
    processor: ColorStateProcessor::class,
    normalizationContext: ['groups' => ['color:read']],
    operations: [
        new GetCollection(),
        new Get(),
        new Post(),
    ]
)]
class Color
{
    public function __construct(
        protected string $id = '',
        protected string $name = '',
        protected string $hexa = '',
        protected int $red = 0,
        protected int $green = 0,
        protected int $blue = 0,
    ) {}

    #[Groups(['color:read'])]
    #[ApiProperty(writable: false, identifier: false)]
    public function getId(): string
    {
        return $this->id;
    }

    public function setId(string $id): void
    {
        $this->id = $id;
    }

    #[Groups(['color:read'])]
    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    #[ApiProperty(identifier: true)]
    #[Groups(['color:read'])]
    public function getHexa(): string
    {
        return $this->hexa;
    }

    public function setHexa(string $hexa): void
    {
        $this->hexa = $hexa;
    }

    public function getRed(): int
    {
        return $this->red;
    }

    public function setRed(int $red): void
    {
        $this->red = $red;
    }

    public function getBlue(): int
    {
        return $this->blue;
    }

    public function setBlue(int $blue): void
    {
        $this->blue = $blue;
    }

    public function getGreen(): int
    {
        return $this->green;
    }

    public function setGreen(int $green): void
    {
        $this->green = $green;
    }

    #[Groups(['color:read'])]
    public function getCssFormat(): string
    {
        return "rgb({$this->red}, {$this->green}, {$this->getBlue()})";
    }
}
